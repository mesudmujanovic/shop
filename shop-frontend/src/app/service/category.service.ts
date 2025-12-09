import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.service';
import { environment } from '../../environment';
export interface Category {
  id: number;
  name: string;
  description: string;
  parent?: Category;
  products?: Product[]; // Možda nećete hteti da uključite proizvode u kategoriju na frontendu, zavisno od potreba
}
export interface NavigationCategory {
  id: number;
  name: string;
  description: string;
  productCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

    getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }

    getCategoriesForNavigation(): Observable<NavigationCategory[]> {
    return this.http.get<NavigationCategory[]>(`${this.apiUrl}/categories/for-navigation`);
  }
}
