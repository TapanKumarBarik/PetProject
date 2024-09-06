import { Component } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  notes: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.apiService.getNotes().subscribe((data: any[]) => {
      this.notes = data;
    });
  }

  createNote(): void {
    // Note creation logic here
  }

  editNote(note: any): void {
    // Note editing logic here
  }

  deleteNote(noteId: number): void {
    // this.apiService.deleteNote(noteId).subscribe(() => {
    //   this.getNotes(); // Refresh note list after deletion
    // });
  }
}
