import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {
  form!: FormGroup;
  title!: string;
  name!: string;
  mobile!: number;
  email!: string;
  department!: number;
  birthdate!: Date;
  qualifications!: string;
  departments: string[] = ['Orthodpedics', 'Cardiology', 'Otorhinolarynology'];
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AddDoctorComponent>
  ) {
      this.title = data.title;
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', []],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      department: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      qualifications: ['', [Validators.required]],
    })
  }

}
