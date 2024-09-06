import { Component } from '@angular/core';
import { AuthService } from '../../../api/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
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
