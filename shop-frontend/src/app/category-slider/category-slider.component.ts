import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


export interface Category {
  image: string;
  alt: string;
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent {
   @Input() categories: Category[] = [];

}

