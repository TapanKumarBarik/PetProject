import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Clipboard } from '@angular/cdk/clipboard';
import { ApiService } from '../../../api/api.service';
@Component({
  selector: 'app-secrets',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.css'],
})
export class SecretsComponent {
  secrets: any[] = []; // To store secrets
  passwordVisibleMap: { [key: number]: boolean } = {}; // To track visibility of passwords Variables for new secret form
  secrect_key: string = '';
  key_details: string = '';
  password: string = '';
  password_visible: boolean = false;

  constructor(private apiService: ApiService, private clipboard: Clipboard) {
    this.loadSecrets();
  }

  // Load all secrets on component initialization
  loadSecrets() {
    this.apiService.getSecrets().subscribe(
      (data) => {
        this.secrets = data;
      },
      (error) => {
        console.error('Error fetching secrets', error);
      }
    );
  }

  // Create a new secret
  createSecret() {
    const newSecret = {
      secrect_key: this.secrect_key,
      key_details: this.key_details,
      password: this.password,
      password_visible: this.password_visible,
    };

    this.apiService.createSecret(newSecret).subscribe(
      (response) => {
        this.loadSecrets(); // Reload secrets after adding a new one
        this.resetForm(); // Reset form after creation
      },
      (error) => {
        console.error('Error creating secret', error);
      }
    );
  }

  // Reset the form after creating a secret
  resetForm() {
    this.secrect_key = '';
    this.key_details = '';
    this.password = '';
    this.password_visible = false;
  }

  // Toggle password visibility for a secret
  togglePasswordVisibility(secretId: number) {
    this.passwordVisibleMap[secretId] = !this.passwordVisibleMap[secretId];
  }

  // Copy the secret to clipboard
  copyToClipboard(value: string) {
    this.clipboard.copy(value);
  }

  // Update a secret (you can extend this method)
  updateSecret(secretId: number) {
    // Call the update API and handle response
  }

  // Delete a secret
  deleteSecret(secretId: number) {
    this.apiService.deleteSecret(secretId).subscribe(
      (response) => {
        this.loadSecrets(); // Reload secrets after deletion
      },
      (error) => {
        console.error('Error deleting secret', error);
      }
    );
  }
}
