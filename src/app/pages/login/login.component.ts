import { Component } from '@angular/core';
import { AuthService } from '../../../api/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.showLoginSuccessAlert();
        this.authService.showSnackbar('Login successful');
        // Handle token or response data here (e.g., store token)
        localStorage.setItem('access_token', response.access_token);
      },
      (error) => {
        this.authService.showLoginFailureAlert();
        this.authService.showSnackbar('Login failed');
      }
    );
  }
}
