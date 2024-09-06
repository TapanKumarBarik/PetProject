import { Component } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  tasks: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.apiService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  createTask(): void {
    // Task creation logic here
  }

  editTask(task: any): void {
    // Task editing logic here
  }

  deleteTask(taskId: number): void {
    // this.apiService.deleteTask(taskId).subscribe(() => {
    //   this.getTasks(); // Refresh task list after deletion
    // });
  }
}
