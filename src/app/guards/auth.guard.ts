// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn(); // Implement this method in your AuthService

    if (!isLoggedIn) {
      this.router.navigate(['login']); // Redirect to login if not authenticated
      return false;
    }
    return true;
  }
}
