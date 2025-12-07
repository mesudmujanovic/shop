import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { CategorySidebarComponent } from '../../category-sidebar/category-sidebar.component';
import { CategoryService } from '../../service/category.service';
import { HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  private routerId = inject(Router);
  isLoading = false;
  message = '';
  selectedCategoryId: number | null = null;
  isSidebarOpen: any;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    document.body.style.overflow = this.isSidebarOpen ? 'hidden' : '';
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    document.body.style.overflow = '';
  }

  getImageUrl(product: Product) {
  return product.id ? `http://localhost:8080/api/products/${product.id}/image` : 'assets/placeholder-image.jpg';
 }

    @HostListener('window:scroll', [])
  onWindowScroll() {
    const button = document.getElementById('backToTop');
    if (window.scrollY > 200) {
      button?.classList.add('show');
    } else {
      button?.classList.remove('show');
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.isSidebarOpen = false;

      this.route.queryParams.subscribe(params => {
    const categoryId = params['category'];
    
    if (categoryId) {
      const id = parseInt(categoryId, 10);
      this.onCategorySelected(id);
      
      // Ako je mobile, otvori sidebar
      if (window.innerWidth < 993) {
        this.isSidebarOpen = true;
      }
    }
  });
  }

  singleId(id: any){
    this.routerId.navigate(['/products', id])
  }
  
  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.isLoading = false;
        console.log(this.products);
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
      this.filteredProducts = this.products;
    } else {
      this.loadProductsByCategory(categoryId);
    }
      if (window.innerWidth < 993) {
      this.closeSidebar();
    }
  }

  private loadProductsByCategory(categoryId: number): void {
    this.isLoading = true;
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (category) => {
        this.filteredProducts = category.products || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.message = 'Greška pri učitavanju proizvoda za kategoriju';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  filterProducts(): void {
    if (this.selectedCategoryId === null) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        product => product.category?.id === this.selectedCategoryId
      );
    }
  }

  addToCart(product: Product): void {
    // Add loading state to button
    const button = event?.target as HTMLButtonElement;
    if (button) {
      button.classList.add('loading');
    }

    this.cartService.addToCart(product.id, 1).subscribe({
      next: (cart) => {
        this.message = `🎉 Dodat ${product.name} u korpu!`;
        this.cartService.refreshCartCount();
        
        // Remove loading state
        if (button) {
          button.classList.remove('loading');
        }
        
        setTimeout(() => this.message = '', 3000);
      },
      error: (error) => {
        this.message = `❌ Greška pri dodavanju u korpu: ${error.error?.message || error.message}`;
        
        // Remove loading state
        if (button) {
          button.classList.remove('loading');
        }
      }
    });
  }
}