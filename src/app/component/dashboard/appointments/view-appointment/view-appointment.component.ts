import { Appointments } from './../../../../shared/model/interfaces';
import { AddAppointmentComponent } from './../add-appointment/add-appointment.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

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
      this.appointmentObj = res;
      this.appointmentObj.visit_time = this.appointmentObj.visit_time.toDate();
    })
  }

}
