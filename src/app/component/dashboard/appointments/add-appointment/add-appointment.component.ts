import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  form !: FormGroup;
  title !: string;
  mobile !: string;
  email !: string;
  injury !: string;
  doctor_id !: string;
  doctor_name !: string;
  visit_time !: Date;
  appointment_id !: string;
  appointment_name !: string;
  buttonName !: string;
  allDoctors : any[] = [];

  constructor(
    private fb : FormBuilder,
    private dataApi : DataService,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddAppointmentComponent>
  ) {
      this.title = data.title;
      this.mobile = data.mobile;
      this.email = data.email;
      this.visit_time = data.visit_time;
      this.injury = data.injury;
      this.appointment_id = data.appointment_id;
      this.appointment_name = data.appointment_name;
      this.doctor_id = data.doctor_id;
      this.doctor_name = data.doctor_name;
      this.buttonName = data.buttonName;
   }

  ngOnInit(): void {
    this.getAllDoctors();
    this.form = this.fb.group({
      appointment_id: [this.appointment_id, []],
      appointment_name : [this. appointment_name, [Validators.required]],
      mobile : [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email : [this.email, [Validators.required, Validators.email]],
      visit_time : [this.visit_time, [Validators.required]],
      doctor_id : [this.doctor_id, [Validators.required]],
      doctor_name : [this.doctor_name, []],
      injury : [this.injury, [Validators.required]]
    })
  }

  getAllDoctors() {
    this.dataApi.getAllDoctors().subscribe(res => {
      this.allDoctors = res.map((e : any) => {
        const data = e.payload.doc.data();
        const doctor = {
          doctor_name : data.name,
          doctor_id : e.payload.doc.id
        }
        return doctor;
      })
    })
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  getDoctorName(doctorId : string) {
    for( let i = 0; i < this.allDoctors.length; i++) {
      if(this.allDoctors[i].doctor_id == doctorId) {
        return this.allDoctors[i].doctor_name;
      }
    }
    return "";
  }

  async registerAppointment() {
    this.form.value.doctor_name = await this.getDoctorName(this.form.value.id);
    this.dialogRef.close(this.form.value);
  }
}
