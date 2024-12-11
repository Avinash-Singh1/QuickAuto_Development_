import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driverdash',
  templateUrl: './driverdash.component.html',
  styleUrls: ['./driverdash.component.css']
})
export class DriverdashComponent {
  
  constructor(private router: Router){}
  viewAllBookings() {
    this.router.navigate(['/viewallbookings']);
  }
  MarkAvailability() {
    this.router.navigate(['/markavail']);
  }
  // viewAllBookings() {
  //   this.router.navigate(['/manageUsers']);
  // }
  generateReports() {
    this.router.navigate(['/generateReports']);
  }
  manageTickets() {
    this.router.navigate(['/manageTickets']);
  }
  openSettings() {
    this.router.navigate(['/openSettings']);
  }
  managePayments() {
    this.router.navigate(['/managePayments']);
  }
  feedbackSupport() {
    this.router.navigate(['/feedbackSupport']);
  }
  viewAnalytics() {
    this.router.navigate(['/viewAnalytics']);
  }
}
