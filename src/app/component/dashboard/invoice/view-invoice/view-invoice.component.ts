import { Invoice } from './../../../../shared/model/invoice';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {
  medList!:  [];
  invoice_id !: any;
  invoiceObj: any;

  constructor(
    private route: ActivatedRoute,
    private dataApi: DataService
  ) {
    this.invoice_id = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getInvoiceById();
  }

  getInvoiceById() {
    this.dataApi.getInvoiceById(this.invoice_id)
    .subscribe(res => {
      this.invoiceObj = res;
    })
  }

  print() {
    window.print();
  }
}
