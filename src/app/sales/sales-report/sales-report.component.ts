import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { SalesReportDetailsComponent } from '../sales-report-details/sales-report-details.component';
import { SalesOrder } from '../../models/sales-order';
import { SalesOrderService } from '../../services/sales-order.service';
import { OrderStatus } from '../../models/order-status';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  displayedColumns = ['position', 'name', 'mobile', 'total', 'actionsColumn'];
  dataSource: MatTableDataSource<SalesOrder>;
  salesReport: Array<SalesOrder>;

  applyFilter(filterValue: string) {
    // filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isPopupOpened = true;
  constructor(private salesOrderService: SalesOrderService,
    private dialog?: MatDialog,
  ) { }
  salesshow(salesOrder: SalesOrder) {
    this.isPopupOpened = true;

    const dialogRef = this.dialog.open(SalesReportDetailsComponent, {
      data: salesOrder
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

  ngOnInit() {
    this.salesOrderService.getSalesReport()
      .subscribe((salesReport: Array<SalesOrder>) => {
        this.salesReport = salesReport;
        this.dataSource = new MatTableDataSource(this.salesReport);
      });

  }


}
