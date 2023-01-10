import { Appointments } from './../../../../shared/model/appointments';
import { AddAppointmentComponent } from './../add-appointment/add-appointment.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss']
})
export class ViewAppointmentComponent implements OnInit {
  appointment_id !: any;
  appointmentObj !: any;

  constructor(
    private route : ActivatedRoute,
    private dataApi : DataService
  ) {
    this.appointment_id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getAppointmentById();
  }

  getAppointmentById() {
    this.dataApi.getAppointmentById(this.appointment_id).subscribe(res => {
      console.log(res);
      this.appointmentObj = res;
      this.appointmentObj.visit_time = this.appointmentObj.visit_time.toDate();
      console.log(res);
    })
  }

}
