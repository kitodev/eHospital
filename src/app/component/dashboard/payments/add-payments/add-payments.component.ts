import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-add-payments',
  templateUrl: './add-payments.component.html',
  styleUrls: ['./add-payments.component.scss']
})
export class AddPaymentsComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  bill_no !: string;
  bill_id !: string;
  doctor_id !: string;
  doctor_name !: string;
  patient_name !: string;
  total !: number;
  discount !: number;
  charges !: number;
  date !: Date;
  buttonName !: string;
  allDoctors : any[] = [];

  constructor(
    private fb : FormBuilder,
    private dataApi : DataService,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddPaymentsComponent>
  ) {
      this.title = data.title;
      this.bill_no = data.bill_no;
      this.bill_id = data.bill_id;
      this.patient_name = data.patient_name;
      this.date = data.date;
      this.doctor_id = data.doctor_id;
      this.total = data.total;
      this.charges = data.charges;
      this.doctor_name = data.doctor_name;
      this.discount = data.discount;
      this.buttonName = data.buttonName;
   }

  ngOnInit(): void {
    this.getAllDoctors();
    this.form = this.fb.group({
      bill_no : [this.bill_no, [Validators.required]],
      bill_id : [this.bill_id, []],
      doctor_id : [this.doctor_id, []],
      patient_name: [this.patient_name, [Validators.required]],
      doctor_name : [this.doctor_name, []],
      date : [this.date, []],
      total : [this.total, [Validators.required]],
      charges : [this.charges, [Validators.required]],
      discount : [this.discount, [Validators.required]],
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

  async registerPayment() {
    this.form.value.doctor_name = await this.getDoctorName(this.form.value.id);
    this.dialogRef.close(this.form.value);
  }

}
