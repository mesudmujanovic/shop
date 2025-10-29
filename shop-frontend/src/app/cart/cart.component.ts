// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItemResponse, CartResponse, CartService } from '../service/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: CartResponse | null = null;
  isLoading = false;
  message = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.isLoading = false;
      },
      error: (error) => {
        this.message = 'Greška pri učitavanju korpe';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  updateQuantity(item: CartItemResponse, newQuantity: number): void {
    if (newQuantity < 0) return;
    
    if (newQuantity === 0) {
      this.removeFromCart(item.productId);
    } else {
      this.cartService.updateQuantity(item.productId, newQuantity).subscribe({
        next: (cart) => {
          this.cart = cart;
          this.cartService.refreshCartCount();
        },
        error: (error) => {
          this.message = 'Greška pri ažuriranju količine';
        }
      });
    }
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.cartService.refreshCartCount();
        this.message = 'Proizvod uklonjen iz korpe';
        setTimeout(() => this.message = '', 3000);
      },
      error: (error) => {
        this.message = 'Greška pri uklanjanju proizvoda';
      }
    });
  }

  clearCart(): void {
    if (confirm('Da li ste sigurni da želite da ispraznite korpu?')) {
      this.cartService.clearCart().subscribe({
        next: (cart) => {
          this.cart = cart;
          this.cartService.refreshCartCount();
          this.message = 'Korpa je ispražnjena';
          setTimeout(() => this.message = '', 3000);
        },
        error: (error) => {
          this.message = 'Greška pri čišćenju korpe';
        }
      });
    }
  }

  getTotalItems(): number {
    return this.cart?.totalItems || 0;
  }

  getTotalPrice(): number {
    return this.cart?.totalPrice || 0;
  }

getFinalPrice(): number {
  return this.getTotalPrice();
}
}