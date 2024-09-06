import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //
  //
  private registerUrl = 'http://127.0.0.1:8000/users/register'; // API URL
  private loginUrl = 'http://127.0.0.1:8000/users/login';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  register(email: string, username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    const body = {
      email,
      username,
      password,
    };

    return this.http.post<any>(this.registerUrl, body, { headers });
  }

  // Display success alert using SweetAlert
  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful!',
      text: 'You have successfully registered.',
      showConfirmButton: true,
      timer: 3000,
    });
  }
  showFailuresAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Registration Not Successful!',
      text: 'Registration failed. Please try again.',
      showConfirmButton: true,
      timer: 3000,
    });
  }

  login(email: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', email)
      .set('password', password)
      .set('scope', '')
      .set('client_id', 'string')
      .set('client_secret', 'string');

    return this.http.post<any>(this.loginUrl, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  }

  showLoginSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Login Successful!',
      text: 'You have successfully logged in.',
      showConfirmButton: true,
      timer: 3000,
    });
  }

  showLoginFailureAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed!',
      text: 'Login failed. Please check your credentials.',
      showConfirmButton: true,
      timer: 3000,
    });
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
