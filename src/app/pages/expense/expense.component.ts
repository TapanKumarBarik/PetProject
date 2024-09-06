import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { Chart, registerables } from 'chart.js/auto';
@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatNativeDateModule,
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})
export class ExpenseComponent implements OnInit {
  expenses: any[] = [];

  newExpense = {
    title: '',
    amount: 0,
    category: '',
    date: '',
    payment_method: '',
    created_date: '',
    updated_date: '',
  };

  constructor() {
    Chart.register(...registerables); // Register Chart.js
  }

  ngOnInit(): void {
    // Dummy static data
    this.expenses = [
      {
        title: 'Lunch',
        amount: 20,
        category: 'Food',
        date: '2024-09-01',
        payment_method: 'Cash',
        created_date: '2024-09-01',
        updated_date: '2024-09-01',
      },
      {
        title: 'Movie',
        amount: 12,
        category: 'Entertainment',
        date: '2024-09-02',
        payment_method: 'Credit Card',
        created_date: '2024-09-02',
        updated_date: '2024-09-02',
      },
      {
        title: 'Taxi',
        amount: 15,
        category: 'Transport',
        date: '2024-09-03',
        payment_method: 'Cash',
        created_date: '2024-09-03',
        updated_date: '2024-09-03',
      },
    ];

    this.renderCharts();
  }

  addExpense(): void {
    const currentDate = new Date();
    this.newExpense.created_date = currentDate.toISOString();
    this.newExpense.updated_date = currentDate.toISOString();
    this.expenses.push({ ...this.newExpense });
    this.newExpense = {
      title: '',
      amount: 0,
      category: '',
      date: '',
      payment_method: '',
      created_date: '',
      updated_date: '',
    };
    this.renderCharts(); // Update the charts after adding new expense
  }

  renderCharts(): void {
    this.renderCategoryChart();
    this.renderDailyTrendChart();
  }

  renderCategoryChart(): void {
    const categories = this.expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(categories),
          datasets: [
            {
              data: Object.values(categories),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }
  }

  renderDailyTrendChart(): void {
    const dailyExpenses = this.expenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + expense.amount;
      return acc;
    }, {});

    const ctx = document.getElementById('dailyTrendChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(dailyExpenses),
          datasets: [
            {
              label: 'Daily Expenses',
              data: Object.values(dailyExpenses),
              fill: false,
              borderColor: '#42A5F5',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Amount',
              },
            },
          },
        },
      });
    }
  }
}
