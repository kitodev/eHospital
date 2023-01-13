import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-add-packagelist',
  templateUrl: './add-packagelist.component.html',
  styleUrls: ['./add-packagelist.component.scss']
})
export class AddPackagelistComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  buttonName !: string;

  constructor(
    private fb : FormBuilder,
    private dataApi : DataService,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddPackagelistComponent>
  ) {

      this.title = data.title;
   }

  ngOnInit(): void {
  }

  cancelPackageList() {
    this.dialogRef.close();
  }

  async registerPackageList() {
    //this.form.value.doctor_name = await this.getDoctorName(this.form.value.id);
    this.dialogRef.close(this.form.value);
  }
}
