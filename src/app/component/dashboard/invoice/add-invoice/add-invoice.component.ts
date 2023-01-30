import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  description !: string;
  total !: number;
  price !: number;
  quantity !: number;
  buttonName !: string;
  allInvoices : any[] = [];

  constructor(
    private fb: FormBuilder,
    private dataApi : DataService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AddInvoiceComponent>
  ) {
      this.title = data.title;
      this.description = data.description;
      this.total = data.total;
      this.price = data.price;
      this.quantity = data.quantity;
      this.buttonName = data.buttonName;
   }

  ngOnInit(): void {
    this.getAllInvoice();
    this.form = this.fb.group({
      description: [this.description, [Validators.required]],
      total: [this.total, [Validators.required]],
      quantity: [this.quantity, [Validators.required]],
      price: [this.price, [Validators.required]],
    })
  }

  getAllInvoice() {
    this.dataApi.getAllInvoices()
      .subscribe(res => {
        this.allInvoices = res.map((e : any) => {
          const data = e.payload.doc.data();
          const doctor = {
            invoice_name: data.name,
            invoice_id: e.payload.doc.id
          }
          return doctor;
        })
    })
  }

  cancelInvoice() {
    this.dialogRef.close();
  }

  getInvoiceName(invoiceId : string) {
    for( let i = 0; i < this.allInvoices.length; i++) {
      if(this.allInvoices[i].invoice_id == invoiceId) {
        return this.allInvoices[i].doctor_name;
      }
    }
    return "";
  }

  async registerInvoice() {
    this.form.value.invoice_name = await this.getInvoiceName(this.form.value.id);
    this.dialogRef.close(this.form.value);
  }

}
