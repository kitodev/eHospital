import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.scss']
})
export class AddDocumentsComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  id !: string;
  name !: string;
  file !: any;
  buttonName !: string;
  readonly maxSize = 104857600;

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddDocumentsComponent>,
  ) {
      this.name = data.name;
      this.id = data.id;
      this.file = data.file;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id, []],
      file: [this.file, [Validators.required, FileValidator.maxContentSize(this.maxSize)]],
      patient_name : [this.name, [Validators.required]],
    })
  }

  getFile(event: any) {
    this.file = event.target.files[0];
  }

  cancelDocument() {
    this.dialogRef.close();
  }

  async registerDocument() {
    this.dialogRef.close(this.form.value);
  }

}
