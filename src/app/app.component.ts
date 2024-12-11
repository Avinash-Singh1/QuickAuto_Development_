import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Quick-Auto';
  showNav = false; // Control for showing the bottom menu
  isAdmin = false; // To track if the user is an admin

  constructor(private router: Router) {
    // Subscribe to router events and filter for NavigationEnd events
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Check if the user is logged in by checking for the token
      const token = localStorage.getItem('token');
      if (token) {
        // User is logged in, set isAdmin based on role in local storage
        const userRole = localStorage.getItem('role');
        this.isAdmin = userRole === 'admin'; // Determine if the user is an admin
        this.showNav = true; // Show the navbar if logged in
      } else {
        // User is not logged in, hide the navbar
        this.showNav = false;
        this.isAdmin = false; // Reset admin check
      }

      // Additionally, hide navbar for login and register routes even if logged in
      if (event.url.startsWith('/login') || event.url.startsWith('/register')) {
        this.showNav = false;
      }
    });
  }

  ngOnInit() {
    // Optionally clear the local storage to remove any previous session
    // localStorage.removeItem('role');
    // localStorage.removeItem('token');
  }

  Logout() {
    localStorage.removeItem('role'); // Clear the role from local storage
    localStorage.removeItem('token'); // Clear the token from local storage
    this.showNav = false; // Hide the navbar on logout
    this.isAdmin = false; // Reset the admin check
    this.router.navigate(['/login']); // Redirect to login page
  }
}
