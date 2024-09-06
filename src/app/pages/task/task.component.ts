import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { Task } from './task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
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
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    is_completed: false,
    owner_id: 1,
    created_at: '',
    updated_at: '',
  };
  isEditing: boolean = false;
  editingTaskId: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTasks(); // Fetch tasks on component load
  }

  // Fetch all tasks
  loadTasks() {
    this.apiService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  // Create a new task or update an existing one
  saveTask() {
    if (
      this.newTask.title.trim() === '' ||
      this.newTask.description.trim() === ''
    ) {
      alert('Title and description are required!');
      return;
    }

    const taskToSend = {
      title: this.newTask.title,
      description: this.newTask.description,
      is_completed: this.newTask.is_completed,
    };

    if (this.isEditing && this.editingTaskId !== null) {
      // Update the task
      this.apiService
        .updateTask(this.editingTaskId, taskToSend)
        .subscribe(() => {
          this.loadTasks(); // Reload tasks after updating
          this.resetForm(); // Reset the form after update
        });
    } else {
      // Create a new task
      this.apiService.createTask(taskToSend).subscribe((task: Task) => {
        this.tasks.push(task);
        this.resetForm(); // Reset the form after task creation
      });
    }
  }

  // Delete a task
  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.apiService.deleteTask(taskId).subscribe(() => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      });
    }
  }

  // Set the form for editing a task
  editTask(task: Task) {
    this.isEditing = true;
    this.editingTaskId = task.id;
    this.newTask = { ...task }; // Populate form with existing task data
  }

  // Reset form and state after saving or canceling
  resetForm() {
    this.newTask = {
      id: 0,
      title: '',
      description: '',
      is_completed: false,
      owner_id: 1,
      created_at: '',
      updated_at: '',
    };
    this.isEditing = false;
    this.editingTaskId = null;
  }
}
