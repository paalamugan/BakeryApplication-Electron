import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderStatus } from '../../models/order-status';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesOrder } from '../../models/sales-order';
import { Utils } from '../../utils';

@Component({
  selector: 'app-all-sales-report-edit',
  templateUrl: './all-sales-report-edit.component.html',
  styleUrls: ['./all-sales-report-edit.component.css']
})
export class AllSalesReportEditComponent implements OnInit {

  public productForm: FormGroup;
  public orderStatuses: Array<OrderStatus>;

  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AllSalesReportEditComponent>,
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
    this.orderStatuses = Utils.getOrderStatuses() ;
this.balance=this.data.total - this.data.advance;
  }

  onSubmit() {
    this.salesOrderService.editSalesOrder(this.data)
      .subscribe((response) => {
        this.dialogRef.close();
      });
  }

}
