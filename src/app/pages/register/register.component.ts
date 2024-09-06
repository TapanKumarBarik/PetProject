import { Component } from '@angular/core';
import { AuthService } from '../../../api/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}
  register(): void {
    this.authService
      .register(this.email, this.username, this.password)
      .subscribe({
        next: (response) => {
          // Show success alert and snackbar
          this.authService.showSuccessAlert();
        },
        error: (error) => {
          // Handle error
          console.error('Registration error:', error);
          this.authService.showFailuresAlert();
        },
      });
  }
}
