import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material/material/material.module';
import { DoctorComponent } from './component/dashboard/doctor/doctor.component';
import { PatientComponent } from './component/dashboard/patient/patient.component';
import { SidebarComponent } from './component/dashboard/sidebar/sidebar.component';
import { AddDoctorComponent } from './component/dashboard/doctor/add-doctor/add-doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteDoctorComponent } from './component/dashboard/doctor/delete-doctor/delete-doctor.component';
import { ViewDoctorComponent } from './component/dashboard/doctor/view-doctor/view-doctor.component';
import { AddPatientComponent } from './component/dashboard/patient/add-patient/add-patient.component';
import { DeletePatientComponent } from './component/dashboard/patient/delete-patient/delete-patient.component';
import { ViewPatientComponent } from './component/dashboard/patient/view-patient/view-patient.component';
import { LoginComponent } from './component/auth/login/login.component';
import { AppointmentsComponent } from './component/dashboard/appointments/appointments.component';
import { AddAppointmentComponent } from './component/dashboard/appointments/add-appointment/add-appointment.component';
import { DeleteAppointmentComponent } from './component/dashboard/appointments/delete-appointment/delete-appointment.component';
import { ViewAppointmentComponent } from './component/dashboard/appointments/view-appointment/view-appointment.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PaymentsComponent } from './component/dashboard/payments/payments.component';
import { AddPaymentsComponent } from './component/dashboard/payments/add-payments/add-payments.component';
import { DeletePaymentsComponent } from './component/dashboard/payments/delete-payments/delete-payments.component';
import { AgGridModule } from 'ag-grid-angular';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    PatientComponent,
    SidebarComponent,
    AddDoctorComponent,
    DeleteDoctorComponent,
    ViewDoctorComponent,
    AddPatientComponent,
    DeletePatientComponent,
    ViewPatientComponent,
    LoginComponent,
    AppointmentsComponent,
    AddAppointmentComponent,
    DeleteAppointmentComponent,
    ViewAppointmentComponent,
    PaymentsComponent,
    AddPaymentsComponent,
    DeletePaymentsComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MaterialModule,
    MatTableExporterModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddDoctorComponent]
})
export class AppModule { }
