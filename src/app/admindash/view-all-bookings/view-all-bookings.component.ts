import { Component } from '@angular/core';

@Component({
  selector: 'app-view-all-bookings',
  templateUrl: './view-all-bookings.component.html',
  styleUrls: ['./view-all-bookings.component.css']
})
export class ViewAllBookingsComponent {
  bookings = [
    { id: 'B001', user: 'john_doe', date: new Date(), status: 'Confirmed' },
    { id: 'B002', user: 'jane_smith', date: new Date(), status: 'Pending' },
    { id: 'B003', user: 'bob_jones', date: new Date(), status: 'Cancelled' },
  ];

  viewBooking(booking: any) {
    // Logic to view the booking details
    alert(`Viewing booking: ${booking.id}`);
  }

  editBooking(booking: any) {
    // Logic to edit the booking
    alert(`Editing booking: ${booking.id}`);
  }

  deleteBooking(booking: any) {
    // Logic to delete the booking
    if (confirm(`Are you sure you want to delete booking: ${booking.id}?`)) {
      this.bookings = this.bookings.filter(b => b !== booking);
    }
  }
}
