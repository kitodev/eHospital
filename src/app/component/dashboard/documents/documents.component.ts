import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/service/data.service';
import { AddDocumentsComponent } from './add-documents/add-documents.component';
import { AddDoctorComponent } from '../doctor/add-doctor/add-doctor.component';
import { Documents } from 'src/app/shared/model/documents';
import { DeleteDocumentsComponent } from './delete-documents/delete-documents.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  documentsArr : any[] = [];
  displayedColumns: string[] = ['name', 'created'];
  dataSource!: MatTableDataSource<Documents>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllDocuments();
  }

  addDocuments() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Add documents',
      buttonName : 'Upload'
    }

    const dialogRef = this.dialog.open(AddDocumentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.addDocuments(data);
        this.openSnackBar("Added documents is successfull.", "OK")
      }
    })
  }

  editDoctor(row : any) {
    if(row.id == null || row.name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit doctor";
    dialogConfig.data.buttonName = "Update";
    dialogConfig.data.birthdate = row.birthdate.toDate();

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updateDoctor(data);
        this.openSnackBar("Doctor is updated successfully.", "OK")
      }
    })
  }

  deleteDocument(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete document',
      documentName : row.name
    }

    const dialogRef = this.dialog.open(DeleteDocumentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.deleteDoctor(row.id);
        this.openSnackBar("Doctor deleted successfully.", "OK")
      }
    })
  }

  getAllDocuments() {
    this.dataApi.getAllDocuments().subscribe(res => {
      this.documentsArr = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.documentsArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
