import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service'; 

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    if (userRole !== 'user') {
      this.router.navigate(['/no-access']); // Redirect to an unauthorized access page
      return false;
    }
    return true;
  }
}
