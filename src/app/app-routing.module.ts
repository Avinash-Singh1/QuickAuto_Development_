import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { BookingComponent } from './components/booking/booking.component';
import { DateAvialableComponent } from './components/date-avialable/date-avialable.component';
import { PlanjourneyComponent } from './components/planjourney/planjourney.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { CourierDeliveryComponent } from './components/courier-delivery/courier-delivery.component';
import { FaqComponentComponent } from './components/faq-component/faq-component.component';
import { AuthGuard } from './guards/auth.guard'; // Import the AuthGuard
import { AppointmentSuccessComponent } from './components/appointment-success/appointment-success.component';
import { GoogleDummyComponent } from './google-dummy/google-dummy.component';
import { AdmindashComponent } from './components/admindash/admindash.component';
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';
import { ManageUsersComponent } from './admindash/manage-users/manage-users.component';
import { ViewAllBookingsComponent } from './admindash/view-all-bookings/view-all-bookings.component';
import { GenerateReportsComponent } from './admindash/generate-reports/generate-reports.component';
import { ManageTicketsComponent } from './admindash/manage-tickets/manage-tickets.component';
import { SettingsComponent } from './admindash/settings/settings.component';
import { ManagePaymentsComponent } from './admindash/manage-payments/manage-payments.component';
import { FeedbackSupportComponent } from './admindash/feedback-support/feedback-support.component';
import { ViewAnalyticsComponent } from './admindash/view-analytics/view-analytics.component';
import { DriverdashComponent } from './drivercomponents/driverdash/driverdash.component';
import { DriverAvailabilityComponent } from './drivercomponents/driver-availability/driver-availability.component';
import { Booking2Component } from './components/booking2/booking2.component';
import { ManageBookingComponent } from './admindash/manage-booking/manage-booking.component';
import { ManageNotAvialableComponent } from './admindash/manage-not-avialable/manage-not-avialable.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'dash', component: DashboardComponent, canActivate: [AuthGuard] },   
  { path: 'dash', component: DashboardComponent, canActivate: [AuthGuard, UserGuard] },   
  { path: 'google', component: GoogleDummyComponent },   // Protected route
  { path: 'login', component: LoginComponent }, // Route for LoginComponent
  { path: 'register', component: RegisterComponent }, // Route for RegisterComponent
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard,UserGuard] }, // Protected route
  { path: 'booking2', component: Booking2Component, canActivate: [AuthGuard,UserGuard] }, // Protected route
  { path: 'check-avilability', component: DateAvialableComponent, canActivate: [AuthGuard,UserGuard] }, // Protected route
  { path: 'planjourney', component: PlanjourneyComponent, canActivate: [AuthGuard,UserGuard] }, // Protected route
  { path: 'history', component: BookingHistoryComponent, canActivate: [AuthGuard,UserGuard] }, // Protected route
  { path: 'courier', component: CourierDeliveryComponent, canActivate: [AuthGuard,UserGuard] }, // Protected route
  { path: 'FAQs', component: FaqComponentComponent, canActivate: [AuthGuard,UserGuard] }, // Protected route
  { path: 'success', component: AppointmentSuccessComponent, canActivate: [AuthGuard,UserGuard] } ,// Protected route
  
  // admin routes 
  // { path: 'admindash', component: AdmindashComponent, canActivate: [AuthGuard] } ,
  { path: 'admindash', component: AdmindashComponent, canActivate: [AuthGuard, AdminGuard] } ,
  { path: 'manageUsers', component: ManageUsersComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'viewallbookings', component: ViewAllBookingsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'generateReports', component: GenerateReportsComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'manageTickets', component: ManageTicketsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'openSettings', component: SettingsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'managePayments', component: ManagePaymentsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'feedbackSupport', component: FeedbackSupportComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'viewAnalytics', component: ViewAnalyticsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'managebookings', component: ManageBookingComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'notavailable', component: ManageNotAvialableComponent, canActivate: [AuthGuard, AdminGuard] },


  //driver routes 
  {path:'driverdash',component:DriverdashComponent},
  {path:'markavail',component:DriverAvailabilityComponent},
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
