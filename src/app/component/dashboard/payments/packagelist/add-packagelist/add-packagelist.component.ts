import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-packagelist',
  templateUrl: './add-packagelist.component.html',
  styleUrls: ['./add-packagelist.component.scss']
})
export class AddPackagelistComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  id !: string;
  package_name !: string;
  description !: string;
  discount !: string;
  status !: boolean;
  buttonName !: string;

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddPackagelistComponent>
  ) {
      this.title = data.title;
      this.id = data.id;
      this.package_name = data.package_name;
      this.description = data.description;
      this.discount = data.discount;
      this.status = data.status;
      this.buttonName = data.buttonName;
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id, []],
      package_name: [this.package_name, [Validators.required]],
      description: [this.description, [Validators.nullValidator]],
      discount: [this.discount, [Validators.required]],
      status: [this.status, [Validators.required]],
    })
  }

  cancelPackageList() {
    this.dialogRef.close();
  }

  registerPackageList() {
    this.dialogRef.close(this.form.value);
  }
}
