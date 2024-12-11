import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courier-delivery',
  templateUrl: './courier-delivery.component.html',
  styleUrls: ['./courier-delivery.component.css']
})
export class CourierDeliveryComponent {
  constructor(private http: HttpClient) { }

  courier = {
    senderName: '',
    senderContact: '',
    recipientName: '',
    recipientContact: '',
    packageDetails: '',
    pickupAddress: '',
    deliveryAddress: '',
    deliveryDate: ''
  };

  submitCourierBooking(formValues: any) {
    console.log('Courier Booking Submitted!', formValues);
    this.http.post('/api/courier/booking', formValues).subscribe(
      (response) => {
        console.log('Booking successful!', response);
        // Handle success (e.g., show a confirmation message or redirect)
      },
      (error) => {
        console.error('Booking failed!', error);
        // Handle error (e.g., show an error message)
      }
    );
  }
}
