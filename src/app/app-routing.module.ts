import { DashboardComponent } from './component/dashboard/dashboard.component';
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
import { DocumentsComponent } from './component/dashboard/documents/documents.component';
import { ViewDocumentsComponent } from './component/dashboard/documents/view-documents/view-documents.component';
import { PackagelistComponent } from './component/dashboard/payments/packagelist/packagelist.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { InvoiceComponent } from './component/dashboard/invoice/invoice.component';
import { ViewInvoiceComponent } from './component/dashboard/invoice/view-invoice/view-invoice.component';

const routes: Routes = [
  {path : '', redirectTo : 'login', pathMatch : 'full'},
  {path : '', children :
  [
    {path : '', redirectTo: 'patient', pathMatch: 'full'},
    {path : 'dashboard', component: DashboardComponent},
    {path : 'patient', component: PatientComponent},
    {path : 'doctor', component: DoctorComponent},
    {path : 'invoice', component: InvoiceComponent },
    {path : 'invoice/:id', component: ViewInvoiceComponent },
    {path : 'payments', component: PaymentsComponent},
    {path : 'appointment', component: AppointmentsComponent},
    {path : 'documents', component: DocumentsComponent},
    {path : 'documents/:id', component: ViewDocumentsComponent },
    {path : 'packagelist', component: PackagelistComponent},
    {path : 'appointment/:id', component: ViewAppointmentComponent },
    {path : 'doctor/:id', component: ViewDoctorComponent},
    {path : 'patient/:id', component: ViewPatientComponent},
  ], canActivate: [AuthguardGuard]},
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
