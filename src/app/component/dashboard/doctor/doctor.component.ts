import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent {

  constructor(public dialog: MatDialog) {}

  addDoctor() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Register doctor'
    }
  const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);
  }
}
