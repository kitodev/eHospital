import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';
import { AddPackagelistComponent } from '../add-packagelist/add-packagelist.component';

@Component({
  selector: 'app-view-packagelist',
  templateUrl: './view-packagelist.component.html',
  styleUrls: ['./view-packagelist.component.scss']
})
export class ViewPackagelistComponent implements OnInit {
  id !: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route : ActivatedRoute,
    private dataApi : DataService,
    private dialog : MatDialog,
    private _snackBar : MatSnackBar) {
      this.id = route.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
  }

  editPackagelist(row : any) {
    if(row.id == null || row.name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "View packagelist";
    dialogConfig.data.buttonName = "Update";

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(AddPackagelistComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updatePatient(data);
        this.openSnackBar("Package is updated successfully.", "OK")
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
