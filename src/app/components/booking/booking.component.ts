import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

declare var Razorpay: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  // availableDates = ['2024-10-26', '2024-10-27', '2024-10-29']; // Example available dates
  // unavailableDates = ['2024-10-25', '2024-10-28', '2024-10-30']; // Example unavailable dates
  // driverSchedule = [ // Example driver schedule
  //   { date: '2024-10-26', startTime: '10:00', endTime: '14:00' }, // Busy on this date and time
  //   { date: '2024-10-27', startTime: '09:00', endTime: '11:00' }, // Busy on this date and time
  //   // Add more scheduled trips here as needed
  // ];
  availableDates: string[] = [];
  unavailableDates: string[] = [];
  driverSchedule: any[] = []; // Adjust the type as necessary


  booking = {
    source: '',
    destination: '',
    travelDate: '',
    travelTime: '',
    fare: '',
    distance: ''
  };

  formattedTime: string = ''; // To display the converted time in 12-hour format
  isTimeAvailable: boolean = true; // To track time availability

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

       // Fetch booking data from the API
       this.http.get('/api/booking').subscribe((response: any) => {
        console.log("Fetched response: ", response); // Log the full response to check its structure
        
        // Accessing the data correctly based on the received structure
        if (response.length > 0 && response[0].data) {
          this.availableDates = response[0].data.availableDates; // Access the available dates
          this.unavailableDates = response[0].data.unavailableDates; // Access the unavailable dates
          this.driverSchedule = response[0].data.driverSchedule; // Access the driver schedule
        } else {
          console.error("No valid data found in the response.");
        }
      }, error => {
        console.error('Error fetching booking data:', error);
      });
      

    this.route.queryParams.subscribe(params => {
      this.booking.source = params['source'] || '';
      this.booking.destination = params['destination'] || '';
      this.booking.fare = params['fare'] || '';
      this.booking.distance = params['distance'] || '';
    });
  }

  onDateSelected(date: string): void {
    this.booking.travelDate = date; // Expecting date in format 'YYYY-MM-DD'
    console.log('Selected date:', date); // Check this output
    this.checkTimeAvailability(); 
}


  onTimeChange(event: any): void {
    const timeValue = event.target.value;
    this.formattedTime = this.convertTo12HourFormat(timeValue);
    this.booking.travelTime = timeValue; // Update the booking travel time
    this.checkTimeAvailability(); // Check availability when time changes
  }

  checkTimeAvailability(): void {
    const selectedDate = this.booking.travelDate;
    const selectedTime = this.booking.travelTime;

    if (!selectedDate || !selectedTime) {
      this.isTimeAvailable = true; // If no date or time is selected, consider time available
      return;
    }

    // Check if the driver is busy during the selected time
    const isBusy = this.driverSchedule.some(schedule => {
      return (
        schedule.date === selectedDate &&
        this.isTimeInRange(selectedTime, schedule.startTime, schedule.endTime)
      );
    });

    this.isTimeAvailable = !isBusy; // Invert the boolean to check if the time is available

    // Logging to help debug the availability
    console.log(`Checking availability for ${selectedDate} at ${selectedTime}: ${this.isTimeAvailable ? 'Available' : 'Not Available'}`);

    // Show alert if the time is not available and is within the driver's busy hours
    if (isBusy) {
      alert('The selected time is already booked. Please choose another time.');
      console.warn('The selected time is not available.');
    }
  }

  isTimeInRange(selectedTime: string, startTime: string, endTime: string): boolean {
    // Only check if the selected time is within the busy schedule
    return selectedTime >= startTime && selectedTime <= endTime;
  }

  convertTo12HourFormat(time: string): string {
    let [hours, minutes] = time.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    return `${this.padToTwoDigits(hours)}:${this.padToTwoDigits(minutes)} ${ampm}`;
  }

  padToTwoDigits(num: number): string {
    return num.toString().padStart(2, '0');
  }

  SubmitFormData(data: any): void {
    // Final availability check before submission
    if (!this.isTimeAvailable) {
      alert('Selected time is not available. Please choose another time.');
      return;
    }

    console.log('Form Data:', data);
    this.router.navigate(['/success'], {
      queryParams: { 
        source: this.booking.source, 
        destination: this.booking.destination,
        fare: this.booking.fare,
        distance: this.booking.distance,
        travelDate: this.booking.travelDate,
        travelTime: this.booking.travelTime
      }
    });

    // Uncomment below code for API call to send data
    /*
    this.http.post('/api/users/sendinfo', data).subscribe(
      response => {
        console.log('Data sent successfully!', response);
        this.router.navigate(['/success'], {
          queryParams: { 
            source: this.booking.source, 
            destination: this.booking.destination,
            fare: this.booking.fare,
            distance: this.booking.distance,
            travelDate: this.booking.travelDate,
            travelTime: this.booking.travelTime
          }s
        });
      },
      error => {
        console.error('Error sending data!', error);
      }
    );
    */
  }

  goBack() {
    window.history.back(); // Navigates to the previous page in the history
  }
}
