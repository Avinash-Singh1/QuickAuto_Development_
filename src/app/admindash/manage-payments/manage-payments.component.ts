import { Component, OnInit } from '@angular/core';
import { PaymentService ,PaymentMethod  } from 'src/app/auth/payment.service';
@Component({
  selector: 'app-manage-payments',
  templateUrl: './manage-payments.component.html',
  styleUrls: ['./manage-payments.component.css']
})
export class ManagePaymentsComponent implements OnInit{

  paymentMethods: PaymentMethod[] = [];
  newPaymentMethod: PaymentMethod = { id: 0, cardNumber: '', cardHolder: '', expirationDate: '', cvv: '' };

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.fetchPaymentMethods();
  }

  fetchPaymentMethods(): void {
    this.paymentService.getPaymentMethods().subscribe((methods) => {
      this.paymentMethods = methods;
    });
  }

  addPaymentMethod(): void {
    this.paymentService.addPaymentMethod(this.newPaymentMethod);
    this.newPaymentMethod = { id: 0, cardNumber: '', cardHolder: '', expirationDate: '', cvv: '' }; // Reset form
  }

  removePaymentMethod(id: number): void {
    this.paymentService.removePaymentMethod(id);
  }
}

