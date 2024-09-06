import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
  ], // Add RouterModule here
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Changed 'styleUrl' to 'styleUrls'
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
