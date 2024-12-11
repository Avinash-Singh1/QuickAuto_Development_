import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http: HttpClient,private router: Router,private authService:AuthServiceService) { }

  user = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: ''
  };

  registerForm(formValues: any) {
    console.log('Form Values:', formValues); // Handle form submission, e.g., send to backend

    this.http.post('/api/users/create', formValues).subscribe(
      (response: any) => {
        // Check if the response indicates a successful login
        if (response) {
          // If successful, store the token and navigate to the dashboard
          this.router.navigate(['/login']);
        } else {
          // If no token is returned, handle invalid login
          this.handleLoginError('Invalid password or user not found.');
        }
      },
      (error) => {
        console.error('Login failed!', error);
        // Handle error, display an error message
        this.handleLoginError('Invalid password or user not found.');
      }
    );
  }

    // Function to handle login error and display a message
    private handleLoginError(message: string) {
      // Display the error message
      alert(message); // You can replace this with a more 
    }
}
