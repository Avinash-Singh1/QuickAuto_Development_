import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var Razorpay: any;
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) { }

  // Define a model to hold the form data
  booking = {
    source: '',
    destination: '',
    travelDate: '',
    travelTime: '',
    fare:'',
    distance:''
  };
  
  ngOnInit() {
    // Extract query params
    this.route.queryParams.subscribe(params => {
      this.booking.source = params['source'] || '';  // Set source from query param or empty if not provided
      this.booking.destination = params['destination'] || '';  // Set destination from query param or empty if not provided
      this.booking.fare = params['fare'] || '';  // Set destination from query param or empty if not provided
      this.booking.distance = params['distance'] || '';  // Set destination from query param or empty if not provided
    });
  }

  // Method to handle form submission
  SubmitBookinginfo(formValues: any) {
    console.log('Form Submitted!', formValues);
      this.http.post('/api/users/sendinfo', formValues).subscribe(
        (response) => {
          console.log('Login successful!', response);
          // Handle success, maybe navigate to a different page
          if(response){
            // this.router.navigate(['/success'], { state: { booking: this.booking } });
            this.router.navigate(['/success'], {
              queryParams: { source: this.booking.source, destination: this.booking.destination,fare:this.booking.fare, distance:this.booking.distance ,travelDate:this.booking.travelDate,travelTime:this.booking.travelTime}
            });

          }


        },
        (error) => {
          console.error('Login failed!', error);
          // Handle error, display an error message
        }
      );
    }

  
  SubmitBooking(bookingData: any) {
      // Backend call to create Razorpay order
      const paymentDetails = {
        amount: 50 * 100, // Amount in paise (₹50)
        currency: 'INR',
        receipt: `rcpt_${new Date().getTime()}`,
        bookingData
      };
      console.log("paydetails: ",paymentDetails);
  
      // Send request to backend to create order
      this.http.post<any>('/api/users/createOrder', paymentDetails).subscribe((response: any) => {
        if (response && response.order_id) {
          this.initiatePayment(response);
        } else {
          alert('Payment initiation failed!');
        }
      });
    }
  
    initiatePayment(orderResponse: any) {
      const options = {
        "key":  orderResponse.key_id, // Replace with your Razorpay key
        "amount": orderResponse.amount, // ₹50 in paise
        "currency": "INR",
        "name": "Travel Booking",
        "description": "Payment for travel auto booking",
        "order_id": orderResponse.order_id, // Generated from backend
        "handler": function (response: any) {
          alert("Payment Successful: " + response.razorpay_payment_id);
        },
        "prefill": {
          "name": orderResponse.name,
          "email": orderResponse.email,
          "contact": orderResponse.contact
        },
        "theme": {
          "color": "#3399cc"
        },
        "modal": {
          "ondismiss": function () {
            alert('Payment was not completed.');
          }
        }
      };
  
      const rzp1 = new Razorpay(options);
      rzp1.open();
    }
  
  
    formattedTime: string = ''; // To display the converted time
  
    // Method to handle the time change and convert to 12-hour format
    onTimeChange(event: any) {
      const timeValue = event.target.value; // Get the time input value (in 24-hour format)
      this.formattedTime = this.convertTo12HourFormat(timeValue);
    }
  
    // Helper function to convert 24-hour time to 12-hour format with AM/PM
    convertTo12HourFormat(time: string): string {
      let [hours, minutes] = time.split(':').map(Number);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // Convert to 12-hour format, handling 00 as 12
      return `${this.padToTwoDigits(hours)}:${this.padToTwoDigits(minutes)} ${ampm}`;
    }
  
    // Helper function to ensure two-digit format for hours and minutes
    padToTwoDigits(num: number): string {
      return num.toString().padStart(2, '0');
    }


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

    SubmitFormData(data:any){
      console.log("Data: ",data);
      this.router.navigate(['/success'], {
        queryParams: { source: this.booking.source, destination: this.booking.destination,fare:this.booking.fare, distance:this.booking.distance ,travelDate:this.booking.travelDate,travelTime:this.booking.travelTime}
      });
    }

    goBack() {
      window.history.back(); // Navigates to the previous page in the history
    }
}
