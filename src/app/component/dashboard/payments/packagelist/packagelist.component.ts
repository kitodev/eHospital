import { DeletePackagelistComponent } from './delete-packagelist/delete-packagelist.component';
import { Packagelist } from './../../../../shared/model/packagelist';
import { AddPackagelistComponent } from './add-packagelist/add-packagelist.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-packagelist',
  templateUrl: './packagelist.component.html',
  styleUrls: ['./packagelist.component.scss']
})
export class PackagelistComponent implements OnInit {

  packageArr : any[] = [];
  dataSource!: MatTableDataSource<Packagelist>;
  displayedColumns: string[] = ['package_name', 'description', 'discount', 'status', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog : MatDialog,
    private dataApi : DataService,
    private _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.getAllPackageList();
  }

  addPackagelist() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Add packagelist',
      buttonName : 'Register'
    }

    const dialogRef = this.dialog.open(AddPackagelistComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        console.log('PACKAGE', data);
        this.dataApi.addPackagelist(data);
        this.openSnackBar("Registration of payments is successful.", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  editPackagelist(row: any) {
    if(row.id == null || row.package_name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit packagelist";
    dialogConfig.data.buttonName = "Update";

    const dialogRef = this.dialog.open(AddPackagelistComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updatePackagelist(data);
        this.openSnackBar("Package is updated successfully.", "OK")
      }
    })
  }

  viewPackagelist(row : any) {
    window.open('/dashboard/packagelist/'+row.id,'_blank');
  }

  getAllPackageList() {
    this.dataApi.getAllPackagelist().subscribe(res => {
      this.packageArr = res.map((e : any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

      this.dataSource = new MatTableDataSource(this.packageArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deletePackagelist(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete packagelist',
      name : row.name
    }

    const dialogRef = this.dialog.open(DeletePackagelistComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.deletePackagelist(row.id);
        this.openSnackBar("Package deleted successfully.", "OK")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
