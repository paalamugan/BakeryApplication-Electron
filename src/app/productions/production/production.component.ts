import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SalesOrderService } from '../../services/sales-order.service';
import { SalesOrder } from '../../models/sales-order';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { OrderItem } from '../../models/order-item';
import { Utils } from '../../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  public salereports: Array<SalesOrder>;
 public orderitem: Array<OrderItem>;
 today: number = Date.now();

  constructor(private salesOrderService: SalesOrderService,private router:Router,private snackBar: MatSnackBar,
  ) { }
  ngOnInit() {
    this.salesOrderService.getPendingParam()
    .subscribe((resultData: Array<SalesOrder>) => {
      this.salereports = resultData;
     
    });

  }
 @ViewChild('printsection') printsection: ElementRef;
  onSubmit():void{
   
    if(this.salereports.length>0){
      this.salesOrderService.movetoProduction(this.salereports)
      .subscribe((resultData:Array<SalesOrder>) => {
        this.router.navigate(['/orderlist']);
      }); 
      let printContents, popupWin;
    
      printContents = document.getElementById('printsection').innerHTML;
      popupWin = window.open('', '_blank');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
         
            <style>
            html, body {
            
              display: block; 
              font-family: "Calibri";
              margin: 0px;
              font-size:auto;
            }
          table{
            width: 100%;
              max-width: 100%;
              margin-bottom: 20px;
          }
          table td{
            table-layout: fixed;
            width: 150px;
            overflow: hidden; 
            word-wrap: break-word;
          }
          .fixed{
            border-bottom: 2px solid;
        }
        .text-center{
          text-align:center;
        } 
    .display{
      display: none;
  }
  .none{
    float:right;
  }
            </style>
          </head>
      <body onload="window.print();window.close()"> ${printContents}</body>
        </html>`
      );
      popupWin.document.close();
    
    
    }else{
      this.snackBar.open("No pending list","", {
        duration: 3000,
      });
    }
   
 

}
}
