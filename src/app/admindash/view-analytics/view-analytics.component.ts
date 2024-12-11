import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-view-analytics',
  templateUrl: './view-analytics.component.html',
  styleUrls: ['./view-analytics.component.css']
})
export class ViewAnalyticsComponent {
  totalUsers = 1500;
  totalRevenue = 4500;
  totalBookings = 3000;

  constructor() {}

  ngOnInit(): void {
    this.loadUserActivityChart();
    this.loadRevenueChart();
  }

  // Load User Activity Chart
  loadUserActivityChart() {
    const canvas = document.getElementById('userActivityChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');  // Get the 2D context safely

    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'User Activity',
            data: [50, 100, 150, 200, 300, 400],
            borderColor: '#4caf50',
            fill: false,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Months' } },
            y: { title: { display: true, text: 'Users' } }
          }
        }
      });
    } else {
      console.error("Failed to get 2D context for user activity chart");
    }
  }

  // Load Revenue Chart
  loadRevenueChart() {
    const canvas = document.getElementById('revenueChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');  // Get the 2D context safely

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue (₹)',
            data: [10000, 15000, 25000, 40000, 50000, 60000],
            backgroundColor: '#56c728',
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Months' } },
            y: { title: { display: true, text: 'Revenue (₹)' } }
          }
        }
      });
    } else {
      console.error("Failed to get 2D context for revenue chart");
    }
  }
}
