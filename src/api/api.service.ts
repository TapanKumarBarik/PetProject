import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: any;
  getNotes(): Observable<any[]> {
    // Ensure you return an Observable of the expected type
    return this.http.get<any[]>(`${this.baseUrl}/notes`);
  }
  deleteTask(taskId: number) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://127.0.0.1:8000/users/register';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.get(`${this.apiUrl}/tasks`, { headers });
  }

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, task);
  }

  // Add similar methods for other endpoints like users, notes, etc.
}
