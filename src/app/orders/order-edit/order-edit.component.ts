import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CustomerEditComponent } from '../../customer/customer-edit/customer-edit.component';
import { SalesOrder } from '../../models/sales-order';
import { OrderStatus } from '../../models/order-status';
import { Utils } from '../../utils';
import { SalesOrderService } from '../../services/sales-order.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  public productForm: FormGroup;
  public orderStatuses: OrderStatus;

  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OrderEditComponent>,
    private salesOrderService: SalesOrderService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrder
  ) {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

balance:number;
  ngOnInit() {
    this.orderStatuses = Utils.getOrderStatus("Delivered") ;
this.balance=this.data.total - this.data.advance;
  }

  onSubmit() {
  this.data.orderStatus = this.orderStatuses;
    this.salesOrderService.editSalesOrder(this.data)
      .subscribe((response) => {
        this.dialogRef.close();
      });
  }
}
