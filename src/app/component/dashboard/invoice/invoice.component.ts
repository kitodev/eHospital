import { DeleteInvoiceComponent } from './delete-invoice/delete-invoice.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { Invoice } from './../../../shared/model/interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/service/data.service';
import { Doctor } from 'src/app/shared/model/interfaces';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {


  allInvoices : Invoice[] = [];
  allDoctors: Doctor[] = [];
  displayedColumns: string[] = ['description', 'price', 'quantity', 'total', 'action'];
  dataSource!: MatTableDataSource<Invoice>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.getAllInvoices();
  }

  addInvoices() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Register Invoices',
      buttonName : 'Register'
    }

    const dialogRef = this.dialog.open(AddInvoiceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addInvoice(data);
        this.openSnackBar("Registration of invoice is successful.", "OK")
      }
    })
  }

  getAllInvoices() {
    this.dataApi.getAllInvoices().subscribe(res => {
      this.allInvoices = res.map((e:any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.allInvoices);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  getAllInvoice() {
    this.dataApi.getAllInvoices().subscribe(res => {
      this.allInvoices = res.map((e : any) => {
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

  viewInvoice(row : any) {
    window.open('/invoice/'+row.id,'_blank');
  }

  editInvoice(row : any) {
    if(row.id == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit invoice";
    dialogConfig.data.buttonName = "Update";

    const dialogRef = this.dialog.open(AddInvoiceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updateInvoice(data);
        this.openSnackBar("Invoice is updated successfully.", "OK")
      }
    })
  }

  deleteInvoice(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete invoice',
      patientName : row.patient_name
    }

    const dialogRef = this.dialog.open(DeleteInvoiceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.deleteInvoice(row.id);
        this.openSnackBar("Invoice deleted successfully.", "OK")
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
