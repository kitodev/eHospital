import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-appointment',
  templateUrl: './delete-appointment.component.html',
  styleUrls: ['./delete-appointment.component.scss']
})
export class DeleteAppointmentComponent implements OnInit {

  appointmentName !: string;
  title !: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<DeleteAppointmentComponent>
  ) {
      this.appointmentName = data.appointmentName;
      this.title = data.title;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    const deleteAppointment = true;
    this.dialogRef.close(deleteAppointment);
  }

}
