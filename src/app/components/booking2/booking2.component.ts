import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

declare var Razorpay: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking2',
  templateUrl: './booking2.component.html',
  styleUrls: ['./booking2.component.css']
})
export class Booking2Component {

  booking = {
    source: '',
    destination: '',
    fare: '',
    distance: ''
  };

  formattedTime: string = ''; // To display the converted time in 12-hour format
  isTimeAvailable: boolean = true; // To track time availability
  highlightedDate: Date | null = null;
   // start 
   currentMonth: Date = new Date();
   daysInMonth: Date[] = [];
   schedules: any[] = [];
   unavailableDates: string[] = [];
   unavailableTimeSlots: { start: string; end: string }[] = [];
 
   selectedDate: string | null = null;
   selectedTime: string = '';
   showBookingForm: boolean = false;

   uniqueId: string = ''; // Add a unique ID property

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadUnavailableDates();
    this.generateDaysInMonth();

    // Generate a unique ID when the component initializes
    this.uniqueId = this.generateUniqueId();

    this.route.queryParams.subscribe(params => {
      this.booking.source = params['source'] || '';
      this.booking.destination = params['destination'] || '';
      this.booking.fare = params['fare'] || '';
      this.booking.distance = params['distance'] || '';
    });
  }

  // Function to generate a unique ID (can use other strategies too)
  generateUniqueId(): string {
    return 'id-' + Date.now(); // Unique ID based on current timestamp
  }

  SubmitFormData(data: any): void {
    // Final availability check before submission
    console.log(this.selectedTime);
    console.log(this.selectedDate);
    if (!this.selectedDate || !this.selectedTime) {
      Swal.fire({
        icon: 'error',
        title: 'Slot Not Available',
        text: "Please try a different Time",
        confirmButtonText: 'OK'
      });
      return;
    }

    const isUnavailable = this.unavailableTimeSlots.some(
      (slot) => this.selectedTime >= slot.start && this.selectedTime < slot.end
    );

    if (isUnavailable) {
      Swal.fire({
        icon: 'error',
        title: 'Selected time slot is not available',
        text: "Choose a different time",
        confirmButtonText: 'OK'
      });
      return;
    }

    // Include the uniqueId in the data sent to the API
    this.http.post('/api/users/sendinfo', {
      ...this.booking,
      travelDate: this.selectedDate,
      travelTime: this.selectedTime,
      uniqueId: this.uniqueId // Add the unique ID here
    }).subscribe(
      response => {
        console.log('Data sent successfully!', response);
        // Pass the uniqueId to the success page as a query parameter
        this.router.navigate(['/success'], {
          queryParams: { 
            source: this.booking.source, 
            destination: this.booking.destination,
            fare: this.booking.fare,
            distance: this.booking.distance,
            travelDate: this.selectedDate,
            travelTime: this.selectedTime,
            uniqueId: this.uniqueId // Pass uniqueId to the success page
          }
        });
      },
      error => {
        console.error('Error sending data!', error);
      }
    );

    console.log('Form Data:', data);
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
    this.highlightedDate = date;
    const dateStr = date.toISOString().split('T')[0];

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

  navigateMonth(offset: number): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + offset);
    this.generateDaysInMonth();
    this.loadUnavailableDates();
  }

  goBack() {
    window.history.back(); // Navigates to the previous page in the history
  }
}
