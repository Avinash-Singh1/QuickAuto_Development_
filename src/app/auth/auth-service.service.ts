// src/app/auth/auth-service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    localStorage.setItem('token', token);  // You can also use sessionStorage if required
  }

  getToken(): string | null {
    return localStorage.getItem('token');  // Method to get the token
  }

  isLoggedIn(): boolean {
    return !!this.getToken();  // Check if the user is logged in based on the token
  }

  logout() {
    localStorage.removeItem('token');  // Method to log out by removing the token
    localStorage.removeItem('role');  // Method to log out by removing the token
  }

  getUserRole(): string {
    // Example: You'd fetch this info from the token or server in a real app
    return localStorage.getItem('role') || '';
  }
}
