import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { CategorySidebarComponent } from '../../category-sidebar/category-sidebar.component';
import { CategoryService } from '../../service/category.service';
import { HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, debounceTime, of, switchMap } from 'rxjs';

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
private filterSubject = new BehaviorSubject<number | null>(null);
  private filter$ = this.filterSubject.asObservable().pipe(
    debounceTime(100) // Debounce za 100ms
  );
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
     this.filter$.pipe(
      switchMap(categoryId => {
        if (categoryId === null) {
          return of(this.products);
        } else {
          return of(this.products.filter(p => p.category?.id === categoryId));
        }
      })
    ).subscribe(filtered => {
      this.filteredProducts = filtered;
      this.preloadFilteredImages();
    });
  }
  
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
  
getImageOnHover(product: Product, isHovering: boolean = false): string {
  if (!product.images || product.images.length === 0) {
    return 'assets/placeholder-image.jpg';
  }
  
  // Ako postoji druga slika i korisnik hover-uje, prikaži drugu sliku
  if (isHovering && product.images.length > 1) {
    const secondImage = product.images[1]; // Druga slika
    if (secondImage.imageBase64 && secondImage.imageType) {
      return `data:${secondImage.imageType};base64,${secondImage.imageBase64}`;
    }
  }
  
  // Inače prikaži prvu sliku
  const firstImage = product.images[0];
  if (firstImage.imageBase64 && firstImage.imageType) {
    return `data:${firstImage.imageType};base64,${firstImage.imageBase64}`;
  }
  
  return 'assets/placeholder-image.jpg';
}

  hoverStates: Map<number, boolean> = new Map();
  
  // Funkcije za upravljanje hover stanjem
  setHoverState(productId: number, isHovering: boolean): void {
    this.hoverStates.set(productId, isHovering);
  }
  
  isHovering(productId: number): boolean {
    return this.hoverStates.get(productId) || false;
  }

  
  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.isLoading = false;
        console.log('Učitani proizvodi:', this.products);
      },
      error: (error) => {
        this.message = 'Greška pri učitavanju proizvoda';
        this.isLoading = false;
        console.error('Greška pri učitavanju:', error);
      }
    });
  }

    getMainImage(product: Product): string {
    if (product.images && product.images.length > 0) {
      const mainImage = product.images[0];
      if (mainImage.imageBase64 && mainImage.imageType) {
        return `data:${mainImage.imageType};base64,${mainImage.imageBase64}`;
      }
    }
    return 'assets/placeholder-image.jpg';
  }

onCategorySelected(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.filterSubject.next(categoryId);
    
    if (window.innerWidth < 993) {
      this.closeSidebar();
    }
  }
  
  private preloadFilteredImages(): void {
    // Preload samo vidljive slike (prvih 6 za početak)
    const productsToPreload = this.filteredProducts.slice(0, 6);
    
    productsToPreload.forEach(product => {
      if (!this.imageLoadedMap.get(product.id)) {
        this.preloadImage(product);
      }
    });
  }
  
  imageLoadedMap = new Map<number, boolean>();

    private preloadFilteredProducts(): void {
    this.filteredProducts.forEach(product => {
      if (product.images && product.images.length > 0 && !this.imageLoadedMap.get(product.id)) {
        this.preloadImage(product);
      }
    });
  }
  
  private preloadImage(product: Product): void {
    const img = new Image();
    img.onload = () => {
      this.imageLoadedMap.set(product.id, true);
    };
    img.onerror = () => {
      console.warn(`Image failed to load for product ${product.id}`);
      this.imageLoadedMap.set(product.id, false);
    };
    img.src = this.getMainImage(product);
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
        this.cartService.refreshCartCount();``
        
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