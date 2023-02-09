import { DeletePaymentsComponent } from './delete-payments/delete-payments.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Appointments } from 'src/app/shared/model/interfaces';
import { Doctor } from 'src/app/shared/model/interfaces';
import { Payments } from 'src/app/shared/model/interfaces';
import { DataService } from 'src/app/shared/service/data.service';
import { AddPaymentsComponent } from './add-payments/add-payments.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  allPayments : Payments[] = [];
  allDoctors : Doctor[] = [];
  displayedColumns: string[] = ['bill_no', 'patient_name', 'doctor_name', 'date', 'charges', 'tax', 'discount', 'total'];
  dataSource!: MatTableDataSource<Payments>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    //this.getAllPatients();
    this.getAllPayments();
    this.getAllDoctors();
  }

  addPayments() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Add payments',
      buttonName : 'Register'
    }

    const dialogRef = this.dialog.open(AddPaymentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addPayments(data);
        this.openSnackBar("Registration of payments is successful.", "OK")
      }
    })
  }

  getAllPayments() {
    this.dataApi.getAllPayments().subscribe(res => {
      this.allPayments = res.map((e:any) => {
        const data = e.payload.doc.data();
        data.bill_id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.allPayments);
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

  viewPayment(row : any) {
    window.open('/payments/'+row.payment_id,'_blank');
  }

  deletePayments(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete payment',
      paymentName : row.payment_name
    }

    const dialogRef = this.dialog.open(DeletePaymentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.deletePayments(row.payment_id);
        this.openSnackBar("Payment deleted successfully.", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
