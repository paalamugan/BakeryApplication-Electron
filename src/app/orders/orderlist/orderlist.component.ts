import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Data } from '@angular/router';
import { SalesOrder } from '../../models/sales-order';
import { SalesOrderService } from '../../services/sales-order.service';
import { OrderEditComponent } from '../order-edit/order-edit.component';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  displayedColumns = ['id', 'customer', 'mobile', 'advance', 'total', 'orderedDate', 'expectedDate', 'orderedTime', 'expectedTime', 'orderStatus', 'shop', 'actioncolumn'];
  public salesorder: Array<SalesOrder> = [];
  public dataSource = new MatTableDataSource(this.salesorder);
  constructor(private salesorderservice: SalesOrderService, private dialog?: MatDialog) { }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  ngOnInit() {
    this.salesorderservice.getOrders()
      .subscribe((resultData: Array<SalesOrder>) => {
        this.salesorder = resultData;
        this.dataSource = new MatTableDataSource(this.salesorder);
      });

  }
  isPopupOpened = true;
  editorder(salesOrder: SalesOrder) {
    this.isPopupOpened = true;

    const dialogRef = this.dialog.open(OrderEditComponent, {
      data: salesOrder
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }
 

}
