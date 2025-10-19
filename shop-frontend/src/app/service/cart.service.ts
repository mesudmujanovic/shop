// cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environment';

export interface CartItemRequest {
  productId: number;
  quantity: number;
}

export interface CartResponse {
  id: number;
  sessionId: string;
  items: CartItemResponse[];
  totalPrice: number;
  totalItems: number;
}

export interface CartItemResponse {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.apiUrl;
  private sessionId: string | null = null;
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    this.loadSessionId();
  }

  private loadSessionId(): void {
    this.sessionId = localStorage.getItem('cartSessionId');
    if (!this.sessionId) {
      this.createNewSession();
    } else {
      this.updateCartItemCount();
    }
  }

  private createNewSession(): void {
    this.http.post<{sessionId: string}>(`${this.apiUrl}/cart/session`, {})
      .subscribe({
        next: (response) => {
          this.sessionId = response.sessionId;
          localStorage.setItem('cartSessionId', this.sessionId);
        }
      });
  }

  private updateCartItemCount(): void {
    if (this.sessionId) {
      this.getCartItemCount().subscribe(count => {
        this.cartItemCount.next(count);
      });
    }
  }

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.apiUrl}/cart?sessionId=${this.sessionId}`);
  }

  addToCart(productId: number, quantity: number = 1): Observable<CartResponse> {
    const request: CartItemRequest = { productId, quantity };
    return this.http.post<CartResponse>(
      `${this.apiUrl}/cart/items?sessionId=${this.sessionId}`, 
      request
    );
  }

  updateQuantity(productId: number, quantity: number): Observable<CartResponse> {
    return this.http.put<CartResponse>(
      `${this.apiUrl}/cart/items?sessionId=${this.sessionId}&productId=${productId}&quantity=${quantity}`, 
      {}
    );
  }

  removeFromCart(productId: number): Observable<CartResponse> {
    return this.http.delete<CartResponse>(
      `${this.apiUrl}/cart/items?sessionId=${this.sessionId}&productId=${productId}`
    );
  }

  clearCart(): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.apiUrl}/cart/clear?sessionId=${this.sessionId}`);
  }

  getCartItemCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/cart/count?sessionId=${this.sessionId}`);
  }

  getCartItemCountObservable(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  refreshCartCount(): void {
    this.updateCartItemCount();
  }

  getSessionId(): string | null {
    return this.sessionId;
  }
}