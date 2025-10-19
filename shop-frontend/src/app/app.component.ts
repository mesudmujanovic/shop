import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderComponent, PaymentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shop-frontend';
}
