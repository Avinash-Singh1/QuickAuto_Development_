import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'; 


@Component({
  selector: 'app-manage-not-avialable',
  templateUrl: './manage-not-avialable.component.html',
  styleUrls: ['./manage-not-avialable.component.css']
})
export class ManageNotAvialableComponent {




  formattedTime: string = ''; 
  isTimeAvailable: boolean = true; 

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.loadUnavailableDates();
    this.generateDaysInMonth();
  }

  

  // start 
  currentMonth: Date = new Date();
  daysInMonth: Date[] = [];
  schedules: any[] = [];
  unavailableDates: string[] = [];
  unavailableTimeSlots: { start: string; end: string }[] = [];

  selectedDate: string | null = null;
  startTime: string = '';
  endTime: string = '';
  showBookingForm: boolean = false;



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

  Mark_Not_Available(){

    this.http
    .post<any[]>(`/api/mark-notavaiable`,{selectedDate:this.selectedDate,d_id:1})
    .subscribe(
      (res) => {
        console.log("not availabe Response: ",res);
        this.loadUnavailableDates();
        Swal.fire({
          icon: 'success',
          title: 'Non Availability successfully Marked',
          text: "Thank you",
          confirmButtonText: 'OK'
        });
       
      },
      (error) => {
        console.error('Error fetching schedules:', error);
        this.schedules = [];
      }
    );
 
  }
  Mark_Schedule(){
    console.log("selectedDate",this.selectedDate);
    console.log(this.startTime);
    console.log(this.endTime);

    this.http
    .post<any[]>(`/api/Mark_Schedule`,{selectedDate:this.selectedDate,startTime:this.startTime,endTime:this.endTime,d_id:1})
    .subscribe(
      (res) => {
        console.log("not availabe Response: ",res);

        this.loadUnavailableDates();
          Swal.fire({
            icon: 'success',
            title: 'Schedule successfully Marked',
            text: "Thank you",
            confirmButtonText: 'OK'
          });
        
       
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


  // end

  goBack() {
    window.history.back(); // Navigates to the previous page in the history
  }
}
