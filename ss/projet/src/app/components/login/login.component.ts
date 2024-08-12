import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    console.log('Initializing LoginComponent...');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  login(): void {
    console.log('Submitting login form:', this.loginForm.value);
    if (this.loginForm.valid) {
      const formData = {
        Email: this.loginForm.value.email,
        Password: this.loginForm.value.pwd,
      };
      this.backendService.postDatas(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['pdf/']); // Navigate to a different route on success
        },
        error: (error) => {
          console.error('Registration error:', error);
        },
      });
    }
    /* if (this.loginForm.valid) {
      this.backendService.login(this.loginForm.value).subscribe((result) => {
        if (result.success) {
          console.log(result);
          alert(result.message);
        } else {
          alert(result.message);
        }
      });
    } */
  }

  createAnAccount(): void {
    this.router.navigate(['signin/']);
  }
}
