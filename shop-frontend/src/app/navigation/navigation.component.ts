// navigation.component.ts
import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../service/cart.service';
import { Product, ProductService } from '../service/product.service';
import { CategoryService } from '../service/category.service';
import { CategorySidebarComponent } from '../category-sidebar/category-sidebar.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, CategorySidebarComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  cartItemCount = 0;
  shopCategories: any[] = [];
  showDropdown = false;
  dropdownTimer: any;
  hoverDelay = 200; // Delay u milisekundama

  @ViewChild('shopDropdown') shopDropdown!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadShopCategories();
  }

  loadShopCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.shopCategories = categories
          .filter(category => !category.parent)
          .map(category => ({
            id: category.id,
            name: category.name,
            icon: this.getCategoryIcon(category.name),
            productCount: category.products?.length || 0
          }));
      },
      error: (error) => {
        console.error('Greška pri učitavanju kategorija za Shop:', error);
      }
    });
  }

  // Bolji hover sa delay-om
  onShopEnter(): void {
    if (window.innerWidth >= 992) {
      clearTimeout(this.dropdownTimer);
      this.showDropdown = true;
    }
  }

  onShopLeave(): void {
    if (window.innerWidth >= 992) {
      this.dropdownTimer = setTimeout(() => {
        this.showDropdown = false;
      }, this.hoverDelay);
    }
  }

  onDropdownEnter(): void {
    if (window.innerWidth >= 992) {
      clearTimeout(this.dropdownTimer);
      this.showDropdown = true;
    }
  }

  onDropdownLeave(): void {
    if (window.innerWidth >= 992) {
      this.dropdownTimer = setTimeout(() => {
        this.showDropdown = false;
      }, this.hoverDelay);
    }
  }

  // Klik na kategoriju
  navigateToCategory(categoryId: number, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    this.router.navigate(['/products'], {
      queryParams: { category: categoryId }
    });
    
    this.showDropdown = false;
  }

  navigateToAllProducts(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    this.router.navigate(['/products']);
    this.showDropdown = false;
  }

  // Globalni listener za klik van dropdown-a
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (window.innerWidth >= 992) {
      const clickedInside = 
        this.shopDropdown?.nativeElement.contains(event.target) ||
        this.dropdownMenu?.nativeElement.contains(event.target);
      
      if (!clickedInside) {
        this.showDropdown = false;
      }
    }
  }


  // Ikone za kategorije
  getCategoryIcon(categoryName: string): string {
    const lowerName = categoryName.toLowerCase();
    const iconMap: { [key: string]: string } = {
      'serum': 'fas fa-flask',
      'face': 'fas fa-jar',
      'cream': 'fas fa-jar',
      'toner': 'fas fa-tint',
      'cleans': 'fas fa-tint',
      'night': 'fas fa-moon',
      'treatment': 'fas fa-spa',
      'scrub': 'fas fa-spa',
      'peel': 'fas fa-spa',
      'eye': 'fas fa-eye',
      'care': 'fas fa-eye'
    };

    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }

    return 'fas fa-box';
  }

  
}