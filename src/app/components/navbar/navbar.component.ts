import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authservice: AuthServiceService,private router: Router){}
  user_name:any;
  user_email:any;
  user_mobile:any;
  ngOnInit(): void {
    this.user_name=localStorage.getItem("user_name")?localStorage.getItem("user_name"):"John";
    this.user_email=localStorage.getItem("user_email")?localStorage.getItem("user_email"):"jon@gmail.com";
    this.user_mobile=localStorage.getItem("user_mobile")?localStorage.getItem("user_mobile"):"54645654";
  }
  Logout(){
    this.authservice.logout()
    this.router.navigate(['/login']);

  }
}
