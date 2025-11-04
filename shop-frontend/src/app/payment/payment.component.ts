// payment.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GuestOrderRequest, OrderService } from '../service/order.service';
import { PaymentService } from '../service/payment.service';
import { StriceService } from '../service/strice.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  guestOrder: GuestOrderRequest = {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: ''
  };
  
  order: any = null;
  paymentIntent: any = null;
  isLoading = false;
  message = '';
  paymentStatus = '';
  isStripeInitialized = false;
  cart: any = null;

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentService,
    private stripeService: StriceService,
    private cartService: CartService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initializeStripe();
    this.loadCart();
  }

  async initializeStripe(): Promise<void> {
    try {
      await this.stripeService.initializeStripe();
      this.isStripeInitialized = true;
    } catch (error) {
      this.message = 'Greška pri inicijalizaciji Stripe-a';
    }
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart;
      },
      error: (error) => {
        this.message = 'Greška pri učitavanju korpe';
      }
    });
  }

  createOrder(): void {
    // if (!this.isFormValid()) {
    //   this.message = 'Molimo popunite sva polja!';
    //   return;
    // }

    this.isLoading = true;
    const sessionId = this.cartService.getSessionId();

    if (!sessionId) {
      this.message = 'Greška: Session ID nije pronađen';
      this.isLoading = false;
      return;
    }

    this.orderService.placeOrderFromCart(sessionId, this.guestOrder).subscribe({
      next: (order) => {
        this.order = order;
        this.message = `Porudžbina kreirana! ID: ${order.id}`;
        this.isLoading = false;
        this.createPaymentIntent(order.id);
      },
      error: (error) => {
        this.message = `Greška pri kreiranju porudžbine: ${error.error?.message || error.message}`;
        this.isLoading = false;
      }
    });
  }

  createPaymentIntent(orderId: number): void {
    this.isLoading = true;
    this.paymentService.createPaymentIntent(orderId).subscribe({
      next: (response) => {
        this.paymentIntent = response;
        this.message = `Payment intent kreiran!`;
        this.isLoading = false;
        
        setTimeout(() => {
          this.mountCardElement();
        }, 100);
      },
      error: (error) => {
        this.message = `Greška pri kreiranju payment intenta: ${error.error?.message || error.message}`;
        this.isLoading = false;
      }
    });
  }

  mountCardElement(): void {
    if (this.isStripeInitialized) {
      this.stripeService.mountCardElement('card-element');
    }
  }

  async processPayment(): Promise<void> {
    if (!this.paymentIntent) {
      this.message = 'Prvo kreirajte porudžbinu';
      return;
    }

    this.isLoading = true;
    this.message = '';

    try {
      const result = await this.stripeService.confirmCardPayment(this.paymentIntent.clientSecret);
      
      if (result.status === 'succeeded') {
        this.message = 'Plaćanje uspešno! Potvrđujem na serveru...';
        
        this.paymentService.confirmPayment(this.paymentIntent.paymentIntentId).subscribe({
          next: (response) => {
            this.message = `Plaćanje kompletno uspešno! Hvala na kupovini.`;
            this.paymentStatus = response.status;
            this.isLoading = false;
            
            // Redirekt na success page ili clear cart
            setTimeout(() => {
              this.cartService.clearCart().subscribe();
              this.router.navigate(['/success']);
            }, 2000);
          },
          error: (error) => {
            this.message = `Plaćanje uspešno, ali greška pri potvrdi na serveru`;
            this.isLoading = false;
          }
        });
      } else {
        this.message = `Plaćanje nije uspelo. Status: ${result.status}`;
        this.isLoading = false;
      }
    } catch (error: any) {
      this.message = `Greška pri plaćanju: ${error.message}`;
      this.isLoading = false;
    }
  }

  private isFormValid(): boolean {
    return !!this.guestOrder.email && 
           !!this.guestOrder.firstName && 
           !!this.guestOrder.lastName && 
           !!this.guestOrder.address && 
           !!this.guestOrder.phone;
  }
}