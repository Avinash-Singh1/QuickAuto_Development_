// payment.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PaymentMethod {
  id: number;
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private paymentMethodsSubject = new BehaviorSubject<PaymentMethod[]>([
    { id: 1, cardNumber: '**** **** **** 1234', cardHolder: 'John Doe', expirationDate: '12/23', cvv: '123' },
    { id: 2, cardNumber: '**** **** **** 5678', cardHolder: 'Jane Smith', expirationDate: '11/24', cvv: '456' },
  ]);

  constructor() {}

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.paymentMethodsSubject.asObservable();
  }

  addPaymentMethod(paymentMethod: PaymentMethod): void {
    const currentMethods = this.paymentMethodsSubject.getValue();
    this.paymentMethodsSubject.next([...currentMethods, { ...paymentMethod, id: Date.now() }]);
  }

  removePaymentMethod(id: number): void {
    const currentMethods = this.paymentMethodsSubject.getValue();
    this.paymentMethodsSubject.next(currentMethods.filter(method => method.id !== id));
  }
}
