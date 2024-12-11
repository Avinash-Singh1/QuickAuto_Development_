import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})

export class CalendarComponent implements OnInit {
  @Input() availableDates: string[] = [];
  @Input() unavailableDates: string[] = [];
  @Output() dateSelected = new EventEmitter<string>();

  currentMonth: any;
  currentYear: any;
  daysInMonth: Date[] = [];

  ngOnInit(): void {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.daysInMonth = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

    for (let date = firstDayOfMonth; date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
      this.daysInMonth.push(new Date(date)); // Ensure a new Date object is created for each day
    }
  }

  isAvailable(date: Date): boolean {
    const dateString = this.formatDate(date);
    return this.availableDates.includes(dateString);
  }

  isUnavailable(date: Date): boolean {
    const dateString = this.formatDate(date);
    return this.unavailableDates.includes(dateString);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format to 'YYYY-MM-DD'
  }
  
  selectDate(date: Date): void {
    const dateString = this.formatDate(date);
    console.log("Selecting date: ", date, "Formatted date string: ", dateString); // Log selected date
  
    if (this.isAvailable(date)) {
      console.log('Emitting available date:', dateString);
      this.dateSelected.emit(dateString); // Emit the selected date if available
    } else if (this.isUnavailable(date)) {
      alert(`Date ${dateString} is unavailable.`);
    } else {
      alert(`Date ${dateString} has no specific availability status.`);
    }
  }
  
  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }
}
