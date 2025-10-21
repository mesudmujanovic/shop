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
  selectedCategoryId: number | null = null;
  @Output() categorySelected = new EventEmitter<number | null>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Greška pri učitavanju kategorija', error);
      }
    });
  }

  selectCategory(categoryId: number | null): void {
    this.selectedCategoryId = categoryId;
    this.categorySelected.emit(categoryId);
  }

  getParentCategories(): Category[] {
    return this.categories.filter(category => !category.parent);
  }

  getSubcategories(parentId: number): Category[] {
    return this.categories.filter(category => category.parent?.id === parentId);
  }
}