import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environment';

export interface ProductImage {
  id?: number;
  imageType: string;
  imageBase64: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  specifications: string;
  category?: any;
  images: ProductImage[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  getBestsellers(): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.apiUrl}/products/bestsellers`).pipe(
    tap(response => {
      console.log(`${this.apiUrl}/products/bestsellers`)
      console.log('Bestsellers response from server:', response);
    })
  );
}
}