import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { CategorySidebarComponent } from '../category-sidebar/category-sidebar.component';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CategorySidebarComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  isLoading = false;
  message = '';
  selectedCategoryId: number | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService, // DODAJTE OVO
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
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.message = 'Greška pri učitavanju proizvoda';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  onCategorySelected(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    
    if (categoryId === null) {
      // Prikaži sve proizvode
      this.filteredProducts = this.products;
    } else {
      // Koristi CategoryService da dobiješ proizvode za odabranu kategoriju
      this.loadProductsByCategory(categoryId);
    }
  }

  private loadProductsByCategory(categoryId: number): void {
    this.isLoading = true;
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (category) => {
        this.filteredProducts = category.products || [];
        this.isLoading = false;
        console.log('Proizvodi za kategoriju:', this.filteredProducts);
      },
      error: (error) => {
        this.message = 'Greška pri učitavanju proizvoda za kategoriju';
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