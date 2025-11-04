import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product, ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  message: string = '';
  product$?: Observable<Product>;

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.productService.getProduct(id))
    );

    this.product$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(product => console.log('Loaded product:', product));
  }

  addToCart(product: Product, event?: Event): void {
    const button = (event?.currentTarget as HTMLButtonElement) ?? null;
    button?.classList.add('loading');

    this.cartService.addToCart(product.id, 1).subscribe({
      next: () => {
        this.message = `🎉 ${product.name} je dodat u korpu!`;
        this.cartService.refreshCartCount();
        button?.classList.remove('loading');

        // automatski sakrij poruku
        setTimeout(() => (this.message = ''), 3000);
      },
      error: (error) => {
        this.message = `❌ Greška pri dodavanju u korpu: ${error.error?.message || error.message}`;
        button?.classList.remove('loading');
        setTimeout(() => (this.message = ''), 4000);
      }
    });
  }
}
