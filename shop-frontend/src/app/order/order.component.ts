import { Component } from '@angular/core';
import { OrderRequest, PaymentService } from '../service/payment.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  orderForm: FormGroup;
  order: any = null;
  isLoading = false;
  message = '';

  constructor(private paymentService: PaymentService) {
    this.orderForm = new FormGroup({
      userId: new FormControl(1, [Validators.required]),
      productId: new FormControl(1, [Validators.required]),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)])
    });
  }

  createOrder(): void {
    if (this.orderForm.invalid) {
      this.message = 'Greška: Sva polja su obavezna i količina mora biti ≥ 1!';
      return;
    }

    this.isLoading = true;
    this.message = '';

    const formValue = this.orderForm.value;

    const orderRequest: OrderRequest = {
      items: [
        {
          productId: formValue.productId,
          quantity: formValue.quantity
        }
      ]
    };

    this.paymentService.createOrder(formValue.userId, orderRequest).subscribe({
      next: (order) => {
        this.order = order;
        this.message = `Porudžbina kreirana! ID: ${order.id}, Iznos: $${order.totalAmount}`;
        this.isLoading = false;
      },
      error: (error) => {
        this.message = `Greška pri kreiranju porudžbine: ${error.error?.message || error.message}`;
        this.isLoading = false;
      }
    });
  }
}