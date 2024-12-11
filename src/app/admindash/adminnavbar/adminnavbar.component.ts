import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit{
 
  constructor(private router: Router){}
  user_name:any;
  user_email:any;
  user_mobile:any;
  ngOnInit(): void {
    this.user_name=localStorage.getItem("user_name")?localStorage.getItem("user_name"):"John";
    this.user_email=localStorage.getItem("user_email")?localStorage.getItem("user_email"):"jon@gmail.com";
    this.user_mobile=localStorage.getItem("user_mobile")?localStorage.getItem("user_mobile"):"54645654";
  }

  Logout() {
    localStorage.removeItem('role'); // Clear the role from local storage
    localStorage.removeItem('token'); // Clear the role from local storage
    this.router.navigate(['/login']); // Redirect to login page (optional)
  }

}
