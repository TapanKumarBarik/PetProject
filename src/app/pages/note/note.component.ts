import { Component } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Note } from './note.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatCardModule,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  notes: Note[] = [];
  newNote: Note = {
    id: 0,
    title: '',
    content: '',
  };
  isEditing: boolean = false;
  editingNoteId: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  // Fetch all notes
  loadNotes() {
    this.apiService.getNotes().subscribe((data: Note[]) => {
      this.notes = data;
    });
  }

  // Create a new note or update an existing one
  saveNote() {
    if (
      this.newNote.title.trim() === '' ||
      this.newNote.content.trim() === ''
    ) {
      alert('Title and content are required!');
      return;
    }

    const noteToSend = {
      title: this.newNote.title,
      content: this.newNote.content,
    };

    if (this.isEditing && this.editingNoteId !== null) {
      // Update the note
      this.apiService
        .updateNote(this.editingNoteId, noteToSend)
        .subscribe(() => {
          this.loadNotes(); // Reload notes after update
          this.resetForm(); // Reset the form after update
        });
    } else {
      // Create a new note
      this.apiService.createNote(noteToSend).subscribe((note: Note) => {
        this.notes.push(note);
        this.resetForm(); // Reset the form after note creation
      });
    }
  }

  // Delete a note
  deleteNote(noteId: number) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.apiService.deleteNote(noteId).subscribe(() => {
        this.notes = this.notes.filter((note) => note.id !== noteId);
      });
    }
  }

  // Set the form for editing a note
  editNote(note: Note) {
    this.isEditing = true;
    this.editingNoteId = note.id!;
    this.newNote = { ...note }; // Populate form with existing note data
  }

  // Reset form and state after saving or canceling
  resetForm() {
    this.newNote = {
      id: 0,
      title: '',
      content: '',
    };
    this.isEditing = false;
    this.editingNoteId = null;
  }
}
