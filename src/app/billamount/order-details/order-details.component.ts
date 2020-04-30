
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { CustomerService } from '../../services/customer.service';
import { SalesOrder } from '../../models/sales-order';
import { Customer } from '../../models/customer';
import { SalesOrderService } from '../../services/sales-order.service';
import { PrintComponent } from '../../printpage/print/print.component';
import { MatDialog, MatInput } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Utils } from '../../utils';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  @ViewChild('mobileinput') mobileinput: MatInput;
  isPopupOpened = true;
  @Output() orderCompleted = new EventEmitter<boolean>();
  @Input() public salesOrder: SalesOrder;
  constructor(
    private customerService: CustomerService,
    private salesOrderService: SalesOrderService,
    private snackBar: MatSnackBar,
    private dialog?: MatDialog,
  ) { }


  ngOnInit() {
    
  }
  findmobile(){
    var x =(<HTMLInputElement>(document.getElementById("findmobile")));
    x.value =x.value, this.customerService.findByMobile(this.salesOrder.customer.mobile)
    .subscribe((customer: Customer) => {
      if (customer != null) {
        this.salesOrder.customer = customer;
      }
    });
  }
  onSubmit() {
    if(this.salesOrder.advance < this.salesOrder.total){
      this.salesOrder.orderStatus=Utils.getOrderStatus(Utils.PENDING);
    this.salesOrderService.addSalesOrder(this.salesOrder)
   
      .subscribe((response: SalesOrder) => {
        this.isPopupOpened = true;
        const dialogRef = this.dialog.open(PrintComponent, {
          data: response
        });


        dialogRef.afterClosed().subscribe(result => {
          this.isPopupOpened = false;
        });

        this.orderCompleted.emit(true);
        this.snackBar.open("Order Submitted Successfull", "ok", {
          duration: 2000
        });
      });
     
     
          }else{
            this.snackBar.open("Advance amount is lesser than total amount","",{
              duration: 3000
            });
          }
    
   

  }
}



