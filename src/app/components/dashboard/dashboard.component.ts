import { Component,OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 

declare var Razorpay: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient,private router: Router) { }
  user_name:any;
  user_email:any;
  user_mobile:any;
  ngOnInit(): void {
    this.user_name=localStorage.getItem("user_name")?localStorage.getItem("user_name"):"John";
    this.user_email=localStorage.getItem("user_email")?localStorage.getItem("user_email"):"jon@gmail.com";
    this.user_mobile=localStorage.getItem("user_mobile")?localStorage.getItem("user_mobile"):"54645654";
  }


  PlanJourney(){
      this.router.navigate(['/planjourney']);
  }
    
  CommingSoon(){
    Swal.fire({
      icon: 'success',
      title: 'Work in Progress',
      text: "Coming Soon",
      confirmButtonText: 'OK'
    });
  }
}
