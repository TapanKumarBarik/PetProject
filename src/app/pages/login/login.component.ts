import { Component } from '@angular/core';
import { AuthService } from '../../../api/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.showLoginSuccessAlert();
        this.authService.showSnackbar('Login successful');
        // Handle token or response data here (e.g., store token)
        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/']);
      },
      (error) => {
        this.authService.showLoginFailureAlert();
        this.authService.showSnackbar('Login failed');
      }
    );
  }
}
