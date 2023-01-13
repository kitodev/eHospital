import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.scss']
})
export class AddDocumentsComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  name !: string;
  buttonName !: string;

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddDocumentsComponent>,
    private dataApi : DataService
  ) {
      this.name = data.name;
  }

  ngOnInit(): void {
    //this.getAllDoctors();
    this.form = this.fb.group({
      //patient_id: [this.patient_id, []],
      patient_name : [this.name, [Validators.required]],
    })
  }

  cancelDocument() {
    this.dialogRef.close();
  }

  async registerDocument() {
    //this.form.value.doctor_name = await this.getDoctorName(this.form.value.id);
    this.dialogRef.close(this.form.value);
  }

}
