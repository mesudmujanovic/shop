// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

export interface GuestOrderRequest {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdDate: string;
  guestEmail: string;
  guestFirstName: string;
  guestLastName: string;
  guestAddress: string;
  guestPhone: string;
  payment: {
    id: number;
    amount: number;
    status: string;
    method: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  placeOrderFromCart(sessionId: string, orderRequest: GuestOrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}/orders?sessionId=${sessionId}`, orderRequest);
  }

  getOrder(orderId: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/orders/${orderId}`);
  }
}