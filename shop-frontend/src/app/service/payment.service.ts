import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
export interface PaymentResponse {
  clientSecret: string;
  status: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

export interface OrderRequest {
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdDate: string;
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
export class PaymentService {

 private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createOrder(userId: number, orderRequest: OrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}/orders?userId=${userId}`, orderRequest);
  }

  createPaymentIntent(orderId: number): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.apiUrl}/payments/create-intent?orderId=${orderId}`, {});
  }

  confirmPayment(paymentIntentId: string): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.apiUrl}/payments/confirm?paymentIntentId=${paymentIntentId}`, {});
  }

  getPaymentStatus(paymentIntentId: string): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(`${this.apiUrl}/payments/status?paymentIntentId=${paymentIntentId}`);
  }
}
