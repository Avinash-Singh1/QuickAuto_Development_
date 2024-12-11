import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-date-avialable',
  templateUrl: './date-avialable.component.html',
  styleUrls: ['./date-avialable.component.css']
})
export class DateAvialableComponent {

  constructor(private http: HttpClient) { }
  selectedDate: Date | null = null;

  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2025, 11, 31);

  onBook() {
    if (this.selectedDate) {
      console.log(`You have booked the date: ${this.selectedDate}`);
    } else {
      alert('Please select a date before booking.');
    }
  }
}
