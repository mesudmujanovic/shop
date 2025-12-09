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
export class CategorySidebarComponent {

}