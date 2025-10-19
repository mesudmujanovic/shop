import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class StriceService {
  private stripe: Stripe | null = null;
  private cardElement: StripeCardElement | null = null;
  private isInitialized = false;

  async initializeStripe(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      this.stripe = await loadStripe(environment.stripePublishableKey);
      
      if (this.stripe) {
        const elements = this.stripe.elements();
        this.cardElement = elements.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            },
          },
          hidePostalCode: true
        });
        this.isInitialized = true;
        console.log('Stripe service initialized');
      } else {
        throw new Error('Could not load Stripe');
      }
    } catch (error) {
      console.error('Error initializing Stripe:', error);
      throw error;
    }
  }

  mountCardElement(elementId: string): void {
    if (this.cardElement) {
      const element = document.getElementById(elementId);
      if (element && element.children.length === 0) {
        this.cardElement.mount(`#${elementId}`);
        console.log('Card element mounted to:', elementId);
      } else {
        console.warn('Card element already mounted or container not found');
      }
    } else {
      console.error('Card element not initialized');
    }
  }

  async confirmCardPayment(clientSecret: string): Promise<any> {
    if (!this.stripe || !this.cardElement) {
      throw new Error('Stripe nije inicijalizovan');
    }

    const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: this.cardElement,
        billing_details: {
          name: 'Test Kupac',
          email: 'test@example.com',
        },
      },
    });

    if (error) {
      throw error;
    }

    return paymentIntent;
  }

  // Dodajte metodu za unmount ako je potrebno
  unmountCardElement(): void {
    if (this.cardElement) {
      this.cardElement.unmount();
    }
  }
}