import { DeleteAppointmentComponent } from './delete-appointment/delete-appointment.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/shared/model/doctor';
import { Patient } from 'src/app/shared/model/patient';
import { DataService } from 'src/app/shared/service/data.service';
import { Appointments } from 'src/app/shared/model/appointments';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  allAppointments : Appointments[] = [];
  allDoctors : Doctor[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'email', 'injury', 'visit_time', 'doctor','action'];
  dataSource!: MatTableDataSource<Appointments>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    //this.getAllPatients();
    this.getAllAppointments();
    this.getAllDoctors();
  }

  addAppointment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Register Appointment',
      buttonName : 'Register'
    }

    const dialogRef = this.dialog.open(AddAppointmentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addAppointment(data);
        this.openSnackBar("Registration of patient is successful.", "OK")
      }
    })
  }

  getAllAppointments() {
    this.dataApi.getAllAppointment().subscribe(res => {
      console.log(res);
      this.allAppointments = res.map((e:any) => {
        const data = e.payload.doc.data();
        data.appointment_id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.allAppointments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  getAllDoctors() {
    this.dataApi.getAllDoctors().subscribe(res => {
      this.allDoctors = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    })
  }

  getDoctorName(id : string) {
    let doctorName = '';
    this.allDoctors.forEach(element => {
      if(element.id == id) {
        doctorName = element.name;
      }
    });
    return doctorName;
  }

  viewAppointment(row : any) {
    window.open('/dashboard/appointment/'+row.appointment_id,'_blank');
  }

  editAppointment(row : any) {
    if(row.appointment_id == null || row.appointment_name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit appointment";
    dialogConfig.data.buttonName = "Update";
    dialogConfig.data.visit_time = row.visit_time.toDate();

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(AddAppointmentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updateAppointment(data);
        this.openSnackBar("Appointment is updated successfully.", "OK")
      }
    })
  }

  deleteAppointment(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete appointment',
      patientName : row.appointment_name
    }

    const dialogRef = this.dialog.open(DeleteAppointmentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        console.log(row);
        this.dataApi.deleteAppointment(row.appointment_id);
        this.openSnackBar("Appointment deleted successfully.", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
