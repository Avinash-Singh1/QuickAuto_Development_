import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css'],
})
export class AdmindashComponent implements OnInit  {

  constructor(private router: Router){}
  user_name:any;
  user_email:any;
  user_mobile:any;
  ngOnInit(): void {
    this.user_name=localStorage.getItem("user_name")?localStorage.getItem("user_name"):"John";
    this.user_email=localStorage.getItem("user_email")?localStorage.getItem("user_email"):"jon@gmail.com";
    this.user_mobile=localStorage.getItem("user_mobile")?localStorage.getItem("user_mobile"):"54645654";
  }

  viewAllBookings() {
    this.router.navigate(['/viewallbookings']);
  }
  manageUsers() {
    this.router.navigate(['/manageUsers']);
  }
  ManageBookings() {
    this.router.navigate(['/managebookings']);
  }
  NotAvailable() {
    this.router.navigate(['/notavailable']);
  }
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
