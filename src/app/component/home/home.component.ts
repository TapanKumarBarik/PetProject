import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatCardModule],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadTasksChart();
    this.loadNotesChart();
  }

  loadTasksChart() {
    const ctx = document.getElementById('tasksChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed Tasks', 'Pending Tasks'],
        datasets: [
          {
            label: 'Tasks Overview',
            data: [12, 8],
            backgroundColor: ['#4caf50', '#f44336'],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  loadNotesChart() {
    const ctx = document.getElementById('notesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Note 1', 'Note 2', 'Note 3', 'Note 4'],
        datasets: [
          {
            label: 'Notes',
            data: [3, 7, 5, 2],
            backgroundColor: '#2196f3',
            borderWidth: 1,
          },
        ],
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
