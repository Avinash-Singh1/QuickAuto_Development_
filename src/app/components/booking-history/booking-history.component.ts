import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  bookingHistory = [
    {
      id: '001',
      source: 'Location A',
      destination: 'Location B',
      date: new Date('2024-01-10'),
      time: '10:00 AM',
      status: 'Completed'
    },
    {
      id: '002',
      source: 'Location C',
      destination: 'Location D',
      date: new Date('2024-01-11'),
      time: '2:00 PM',
      status: 'Completed'
    },
    {
      id: '003',
      source: 'Location E',
      destination: 'Location F',
      date: new Date('2024-01-12'),
      time: '4:00 PM',
      status: 'Cancelled'
    }
    // Add more bookings as needed
  ];

  constructor() { }

  ngOnInit(): void {
    // Fetch bookings from a server in a real-world scenario
  }

  getStatusClass(status: string): string {
    switch (status) {
        case 'Completed':
            return 'badge-success';
        case 'Pending':
            return 'badge-warning';
        case 'Failed':
            return 'badge-danger';
        default:
            return '';
    }
}
}
