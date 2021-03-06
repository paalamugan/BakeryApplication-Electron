import { Component, OnInit } from '@angular/core';
import { SalesOrder } from '../../models/sales-order';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SalesOrderService } from '../../services/sales-order.service';
import { AllSalesReportEditComponent } from '../all-sales-report-edit/all-sales-report-edit.component';

@Component({
  selector: 'app-all-sales-report',
  templateUrl: './all-sales-report.component.html',
  styleUrls: ['./all-sales-report.component.css']
})
export class AllSalesReportComponent implements OnInit {

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
    this.salesorderservice.getAllOrders()
      .subscribe((resultData: Array<SalesOrder>) => {
        this.salesorder = resultData;
        this.dataSource = new MatTableDataSource(this.salesorder);
      });

  }
  isPopupOpened = true;
  editorder(salesOrder: SalesOrder) {
    this.isPopupOpened = true;

    const dialogRef = this.dialog.open(AllSalesReportEditComponent, {
      data: salesOrder
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }
 


}
