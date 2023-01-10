import { AppointmentsComponent } from './component/dashboard/appointments/appointments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { DoctorComponent } from './component/dashboard/doctor/doctor.component';
import { ViewDoctorComponent } from './component/dashboard/doctor/view-doctor/view-doctor.component';
import { PatientComponent } from './component/dashboard/patient/patient.component';
import { ViewPatientComponent } from './component/dashboard/patient/view-patient/view-patient.component';
import { AuthguardGuard } from './shared/guard/authguard.guard';
import { ViewAppointmentComponent } from './component/dashboard/appointments/view-appointment/view-appointment.component';
import { PaymentsComponent } from './component/dashboard/payments/payments.component';

const routes: Routes = [
  {path : '', redirectTo : 'login', pathMatch : 'full'},
  {path : 'dashboard', children :
  [
    {path : '', redirectTo: 'patient', pathMatch: 'full'},
    {path : 'patient', component: PatientComponent},
    {path : 'doctor', component: DoctorComponent},
    {path : 'payments', component: PaymentsComponent},
    {path : 'appointment', component: AppointmentsComponent},
    {path : 'appointment/:id', component: ViewAppointmentComponent },
    {path : 'doctor/:id', component: ViewDoctorComponent},
    {path : 'patient/:id', component: ViewPatientComponent},
  ], canActivate: [AuthguardGuard]},
  {path : 'login', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
