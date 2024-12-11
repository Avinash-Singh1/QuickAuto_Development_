import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calender2',
  templateUrl: './calender2.component.html',
  styleUrls: ['./calender2.component.css']
})
export class Calender2Component {
  currentMonth: Date = new Date();
  daysInMonth: Date[] = [];
  schedules: any[] = [];
  unavailableDates: string[] = [];
  unavailableTimeSlots: { start: string; end: string }[] = [];

  selectedDate: string | null = null;
  selectedTime: string = '';
  showBookingForm: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUnavailableDates();
    this.generateDaysInMonth();
  }

  get currentMonthName(): string {
    return this.currentMonth.toLocaleString('en-US', { month: 'long' });
  }

  get currentYear(): number {
    return this.currentMonth.getFullYear();
  }

  generateDaysInMonth(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const days = new Date(year, month + 1, 0).getDate();

    this.daysInMonth = [];
    for (let i = 1; i <= days; i++) {
      this.daysInMonth.push(new Date(year, month, i));
    }
  }

  loadUnavailableDates(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth() + 1;

    this.http
      .get<string[]>(`/api/unavailable-dates?month=${year}-${String(month).padStart(2, '0')}`)
      .subscribe((data) => {
        this.unavailableDates = data;
      });
  }

  isUnavailable(date: Date): boolean {
    const dateStr = date.toISOString().split('T')[0];
    return this.unavailableDates.includes(dateStr);
  }

  onDateClick(date: Date): void {
    const dateStr = date.toISOString().split('T')[0];
    if (this.isUnavailable(date)) {
      alert('Appointment not available.');
      return;
    }

    this.http
      .get<any[]>(`/api/driver-schedules?date=${dateStr}&d_id=1`)
      .subscribe(
        (data) => {
          this.schedules = data;
          this.unavailableTimeSlots = data.map((schedule) => ({
            start: schedule.start_time,
            end: schedule.end_time,
          }));

          this.selectedDate = dateStr;
          this.showBookingForm = true;
        },
        (error) => {
          console.error('Error fetching schedules:', error);
          this.schedules = [];
        }
      );
  }

  onBookingSubmit(): void {
    if (!this.selectedDate || !this.selectedTime) {
      alert('Please select a valid time.');
      return;
    }

    const isUnavailable = this.unavailableTimeSlots.some(
      (slot) => this.selectedTime >= slot.start && this.selectedTime < slot.end
    );

    if (isUnavailable) {
      alert('The selected time slot is not available. Please choose a different time.');
      return;
    }

    this.http
      .post('/api/book', {
        d_id: 1,
        date: this.selectedDate,
        time: this.selectedTime,
      })
      .subscribe(
        (response: any) => {
          if (response.success) {
            alert('Booking successful!');
            window.location.href = '/success.html';
          } else {
            alert('Failed to book!');
          }
        },
        (error) => {
          console.error('Error submitting booking:', error);
          alert('An error occurred. Please try again.');
        }
      );
  }

  navigateMonth(offset: number): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + offset);
    this.generateDaysInMonth();
    this.loadUnavailableDates();
  }
}
