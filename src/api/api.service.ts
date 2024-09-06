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
}
