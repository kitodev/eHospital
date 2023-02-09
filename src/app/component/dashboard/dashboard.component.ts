import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Appointments } from 'src/app/shared/model/interfaces';
import { Doctor } from 'src/app/shared/model/interfaces';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  allAppointments : Appointments[] = [];
  allDoctors : Doctor[] = [];
  displayedColumns: string[] = ['appointment_name', 'mobile', 'email', 'injury', 'visit_time', 'doctor'];
  dataSource!: MatTableDataSource<Appointments>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataApi : DataService) { }

  ngOnInit(): void {
    this.getAllAppointments();
    this.getAllDoctors();
  }

  getAllAppointments() {
    this.dataApi.getAllAppointment().subscribe(res => {
      this.allAppointments = res.map((e:any) => {
        const data = e.payload.doc.data();
        console.log(data);
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
}
