import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../app/pages/note/note.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000'; // Replace with your actual backend URL
  private apiNotesUrl = 'http://127.0.0.1:8000/notes';
  constructor(private http: HttpClient) {}

  // Get all tasks
  getTasks(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.get(`${this.apiUrl}/tasks`, { headers });
  }

  // Get a specific task
  getTask(taskId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.get(`${this.apiUrl}/tasks/${taskId}`, { headers });
  }

  // Create a new task
  createTask(task: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.post(`${this.apiUrl}/tasks`, task, { headers });
  }

  // Update an existing task
  updateTask(taskId: number, task: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.put(`${this.apiUrl}/tasks/${taskId}`, task, { headers });
  }

  // Delete a task
  deleteTask(taskId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.delete(`${this.apiUrl}/tasks/${taskId}`, { headers });
  }
  //

  // Get all notes
  getNotes(): Observable<Note[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.get<Note[]>(this.apiNotesUrl, { headers });
  }

  createNote(note: Partial<Note>): Observable<Note> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.post<Note>(this.apiNotesUrl, note, { headers });
  }

  updateNote(noteId: number, note: Partial<Note>): Observable<Note> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.put<Note>(`${this.apiNotesUrl}/${noteId}`, note, {
      headers,
    });
  }

  // Delete a note
  deleteNote(noteId: number): Observable<Note> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.delete<Note>(`${this.apiNotesUrl}/${noteId}`, { headers });
  }

  ///////////
  private baseUrl_secrect = 'http://127.0.0.1:8000/secrets';

  // Helper function to get headers with Authorization token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Create a new secret
  createSecret(secret: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl_secrect}/`, secret, { headers });
  }

  // Get all secrets
  getSecrets(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl_secrect}/`, { headers });
  }

  // Get a single secret by ID
  getSecretById(secretId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl_secrect}/${secretId}`, { headers });
  }

  // Update a secret by ID
  updateSecret(secretId: number, secret: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.baseUrl_secrect}/${secretId}`, secret, {
      headers,
    });
  }

  // Delete a secret by ID
  deleteSecret(secretId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl_secrect}/${secretId}`, { headers });
  }
}
