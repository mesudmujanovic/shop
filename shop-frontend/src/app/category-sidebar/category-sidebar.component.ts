import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category, CategoryService } from '../service/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-sidebar.component.html',
  styleUrl: './category-sidebar.component.scss'
})
export class CategorySidebarComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  selectedCategoryId: number | null = null;
  expandedCategories: Set<number> = new Set();
  searchTerm: string = '';
  totalProducts: number = 0;

  @Output() categorySelected = new EventEmitter<number | null>();
  @Output() closeSidebar = new EventEmitter<void>(); 

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.filteredCategories = categories;
        this.calculateTotalProducts();
      },
      error: (error) => {
        console.error('Greška pri učitavanju kategorija', error);
      }
    });
  }

  calculateTotalProducts(): void {
    this.totalProducts = this.categories.reduce((total, category) => {
      return total + (category.products?.length || 0);
    }, 0);
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterCategories();
  }

  filterCategories(): void {
    if (!this.searchTerm) {
      this.filteredCategories = this.categories;
      return;
    }

    this.filteredCategories = this.categories.filter(category => 
      category.name.toLowerCase().includes(this.searchTerm) ||
      category.description?.toLowerCase().includes(this.searchTerm) ||
      this.getSubcategories(category.id).some(sub => 
        sub.name.toLowerCase().includes(this.searchTerm)
      )
    );
  }

  getFilteredParentCategories(): Category[] {
    return this.filteredCategories.filter(category => !category.parent);
  }

  getFilteredSubcategories(parentId: number): Category[] {
    return this.filteredCategories.filter(category => 
      category.parent?.id === parentId
    );
  }

  toggleCategory(categoryId: number): void {
    if (this.expandedCategories.has(categoryId)) {
      this.expandedCategories.delete(categoryId);
    } else {
      this.expandedCategories.add(categoryId);
    }
    this.selectCategory(categoryId);
  }

  isExpanded(categoryId: number): boolean {
    return this.expandedCategories.has(categoryId);
  }

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.categorySelected.emit(categoryId);
        if (window.innerWidth < 992) {
      this.closeSidebar.emit();
    }
  }

  getCategoryProductCount(categoryId: number): number {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.products?.length || 0;
  }

  getCategoryIcon(categoryName: string): string {
    const icons: { [key: string]: string } = {
      'elektronika': 'fas fa-laptop',
      'odjeća': 'fas fa-tshirt',
      'obuća': 'fas fa-shoe-prints',
      'sport': 'fas fa-running',
      'kućni': 'fas fa-home',
      'ljepota': 'fas fa-spa',
      'igračke': 'fas fa-gamepad',
      'automobil': 'fas fa-car',
      'knjige': 'fas fa-book',
      'hrana': 'fas fa-utensils'
    };

    const lowerName = categoryName.toLowerCase();
    for (const [key, icon] of Object.entries(icons)) {
      if (lowerName.includes(key)) {
        return icon;
      }
    }

    return 'fas fa-folder';
  }

  getParentCategories(): Category[] {
    return this.categories.filter(category => !category.parent);
  }

  getSubcategories(parentId: number): Category[] {
    return this.categories.filter(category => category.parent?.id === parentId);
  }
}