import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { StriceService } from '../strice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'] // <-- ispravljeno
})
export class PaymentComponent implements OnInit, OnDestroy {
  orderId: number | null = null;
  paymentIntent: any = null;
  isLoading = false;
  message = '';
  paymentStatus = '';
  isStripeInitialized = false;

  constructor(
    private paymentService: PaymentService,
    private stripeService: StriceService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initializeStripe();
  }

  ngOnDestroy(): void {
    // Cleanup
  }

  async initializeStripe(): Promise<void> {
    try {
      await this.stripeService.initializeStripe();
      this.isStripeInitialized = true;
      console.log('Stripe initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
      this.message = 'Greška pri inicijalizaciji Stripe-a';
    }
  }

  async createPaymentIntent(): Promise<void> {
    if (!this.orderId) {
      this.message = 'Unesite Order ID';
      return;
    }

    if (!this.isStripeInitialized) {
      this.message = 'Stripe nije inicijalizovan. Pokušavam ponovo...';
      await this.initializeStripe();
      if (!this.isStripeInitialized) {
        this.message = 'Ne mogu da inicijalizujem Stripe';
        return;
      }
    }

    this.isLoading = true;
    this.message = '';

    this.paymentService.createPaymentIntent(this.orderId).subscribe({
      next: (response) => {
        this.paymentIntent = response;
        this.message = `Payment intent kreiran! ID: ${response.paymentIntentId}`;
        this.isLoading = false;
        
        // Mount card element nakon što se dobije payment intent
        setTimeout(() => {
          this.mountCardElement();
        }, 100);
      },
      error: (error) => {
        this.message = `Greška pri kreiranju payment intenta: ${error.error?.message || error.message || error}`;
        this.isLoading = false;
      }
    });
  }

  mountCardElement(): void {
    if (this.isStripeInitialized) {
      this.stripeService.mountCardElement('card-element');
      console.log('Card element mounted');
    } else {
      console.error('Stripe not initialized');
    }
  }

  async processPayment(): Promise<void> {
    if (!this.paymentIntent) {
      this.message = 'Prvo kreirajte payment intent';
      return;
    }

    this.isLoading = true;
    this.message = '';

    try {
      const result = await this.stripeService.confirmCardPayment(this.paymentIntent.clientSecret);
      
      if (result.status === 'succeeded') {
        this.message = 'Plaćanje uspešno! Potvrđujem na serveru...';
        
        // Potvrdi na backendu
        this.paymentService.confirmPayment(this.paymentIntent.paymentIntentId).subscribe({
          next: (response) => {
            this.message = `Plaćanje kompletno uspešno! Status: ${response.status}`;
            this.paymentStatus = response.status;
            this.isLoading = false;
          },
          error: (error) => {
            this.message = `Plaćanje uspešno, ali greška pri potvrdi na serveru: ${error.error?.message || error.message || error}`;
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

  checkPaymentStatus(): void {
    if (!this.paymentIntent) {
      this.message = 'Nema payment intenta';
      return;
    }

    this.paymentService.getPaymentStatus(this.paymentIntent.paymentIntentId).subscribe({
      next: (response) => {
        this.paymentStatus = response.status;
        this.message = `Trenutni status: ${response.status}`;
      },
      error: (error) => {
        this.message = `Greška pri proveri statusa: ${error.error?.message || error.message || error}`;
      }
    });
  }
}