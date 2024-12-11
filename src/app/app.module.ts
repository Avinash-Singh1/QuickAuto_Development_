import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { BookingComponent } from './components/booking/booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAvialableComponent } from './components/date-avialable/date-avialable.component';
import { PlanjourneyComponent } from './components/planjourney/planjourney.component';
import { GoogleMapsModule } from '@angular/google-maps';  // <-- Ensure this is imported
import { GoogleMapsService } from './google-maps.service';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { CourierDeliveryComponent } from './components/courier-delivery/courier-delivery.component';
import { FaqComponentComponent } from './components/faq-component/faq-component.component';
import { GoogleDummyComponent } from './google-dummy/google-dummy.component';
import { AdmindashComponent } from './components/admindash/admindash.component';
import { ViewbookingsComponent } from './components/admindash/viewbookings/viewbookings.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './auth/loader.interceptor';
import { ManageUsersComponent } from './admindash/manage-users/manage-users.component';
import { ViewAllBookingsComponent } from './admindash/view-all-bookings/view-all-bookings.component';
import { GenerateReportsComponent } from './admindash/generate-reports/generate-reports.component';
import { ManageTicketsComponent } from './admindash/manage-tickets/manage-tickets.component';
import { SettingsComponent } from './admindash/settings/settings.component';
import { ManagePaymentsComponent } from './admindash/manage-payments/manage-payments.component';
import { FeedbackSupportComponent } from './admindash/feedback-support/feedback-support.component';
import { ViewAnalyticsComponent } from './admindash/view-analytics/view-analytics.component';
import { AdminnavbarComponent } from './admindash/adminnavbar/adminnavbar.component';
import { CalendarComponent } from './components/calender/calender.component';
import { DriverdashComponent } from './drivercomponents/driverdash/driverdash.component';
import { DriverAvailabilityComponent } from './drivercomponents/driver-availability/driver-availability.component';
import { Booking2Component } from './components/booking2/booking2.component';
import { Calender2Component } from './components/calender2/calender2.component';
import { ManageBookingComponent } from './admindash/manage-booking/manage-booking.component';
import { ManageNotAvialableComponent } from './admindash/manage-not-avialable/manage-not-avialable.component';
// import { CalenderCompone } from './components/calender/calender.component';
// CalendarComponent
// import { ViewbookingsComponent } from './components/Admindash/viewbookings/viewbookings.component';
// import { AppointmentSuccessComponent } from './appointment-success/appointment-success.component';
ViewbookingsComponent
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    BookingComponent,
    DateAvialableComponent,
    PlanjourneyComponent,
    BookingHistoryComponent,
    CourierDeliveryComponent,
    FaqComponentComponent,
    GoogleDummyComponent,
    AdmindashComponent,
    ViewbookingsComponent,
    LoaderComponent,
    ManageUsersComponent,
    ViewAllBookingsComponent,
    GenerateReportsComponent,
    ManageTicketsComponent,
    SettingsComponent,
    ManagePaymentsComponent,
    FeedbackSupportComponent,
    ViewAnalyticsComponent,
    AdminnavbarComponent,
    CalendarComponent,
    DriverdashComponent,
    DriverAvailabilityComponent,
    Booking2Component,
    Calender2Component,
    ManageBookingComponent,
    ManageNotAvialableComponent
    // CalenderComponent,
    // AppointmentSuccessComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule, 
    GoogleMapsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    GoogleMapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
