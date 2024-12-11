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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dash', component: DashboardComponent, canActivate: [AuthGuard] },   // Protected route
  { path: 'google', component: GoogleDummyComponent },   // Protected route
  { path: 'login', component: LoginComponent }, // Route for LoginComponent
  { path: 'register', component: RegisterComponent }, // Route for RegisterComponent
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'check-avilability', component: DateAvialableComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'planjourney', component: PlanjourneyComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'history', component: BookingHistoryComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'courier', component: CourierDeliveryComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'FAQs', component: FaqComponentComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'success', component: AppointmentSuccessComponent, canActivate: [AuthGuard] } ,// Protected route
  // admin routes 

  { path: 'admindash', component: AdmindashComponent, canActivate: [AuthGuard] } ,// Protected route
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
