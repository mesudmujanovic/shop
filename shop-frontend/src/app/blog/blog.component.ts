import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

export interface Product {
  id: number;
  title: string;
  image: string;
  mainDescription: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  category: string;
  dateAdded?: Date;
}
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
   products: Product[] = [];
  selectedProduct: Product | undefined = undefined;
  showSingleView = false;
  columnCount = 3;
  today: Date = new Date();

  constructor(
    private productService: BlogService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    
    if (isPlatformBrowser(this.platformId)) {
      this.updateColumnCount();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateColumnCount();
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.showSingleView) {
      this.closeSingleView();
    }
  }

  updateColumnCount(): void {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      if (width >= 1200) {
        this.columnCount = 3;
      } else if (width >= 768) {
        this.columnCount = 2;
      } else {
        this.columnCount = 1;
      }
    }
  }

  viewProduct(productId: number): void {
    this.selectedProduct = this.productService.getProductById(productId);
    this.showSingleView = true;
    
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeSingleView(): void {
    this.showSingleView = false;
    this.selectedProduct = undefined;
    
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  get gridTemplateColumns(): string {
    return `repeat(${this.columnCount}, 1fr)`;
  }

  getProductStyle(index: number): any {
    return {
      'animation-delay': `${index * 0.1}s`
    };
  }

  onOverlayClick(event: MouseEvent, productId: number): void {
    event.stopPropagation();
    this.viewProduct(productId);
  }
}
