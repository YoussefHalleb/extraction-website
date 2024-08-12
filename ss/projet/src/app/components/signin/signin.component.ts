import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  user: any = {
    username: '',
    Email: '',
    pwd: '',
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private backendService: BackendService) {}

  login(form: NgForm) {
    if (form.valid) {
      const loginData = {
        username: this.user.username,
        email: this.user.Email,
        password: this.user.pwd,
      };

      this.backendService.postDatas(loginData).subscribe({
        next: (response: string) => {
          console.log('Login successful', response);
          this.successMessage = 'Login successful!';
          this.errorMessage = ''; // Clear any previous error messages
        },
        error: (error) => {
          console.error('Login failed', error);
          if (error.status === 401) {
            this.errorMessage = 'Invalid credentials. Please try again.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
          this.successMessage = ''; // Clear any success messages
        },
        complete: () => {
          console.log('Login request completed');
        },
      });
    } else {
      console.error('Form is invalid');
      this.errorMessage =
        'Form is invalid. Please fill out all required fields.';
      this.successMessage = ''; // Clear any success messages
    }
  }
}
