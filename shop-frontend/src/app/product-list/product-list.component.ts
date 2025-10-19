import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  message = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.message = 'Greška pri učitavanju proizvoda';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product.id, 1).subscribe({
      next: (cart) => {
        this.message = `Dodat ${product.name} u korpu!`;
        this.cartService.refreshCartCount();
        setTimeout(() => this.message = '', 3000);
      },
      error: (error) => {
        this.message = `Greška pri dodavanju u korpu: ${error.error?.message || error.message}`;
      }
    });
  }
}