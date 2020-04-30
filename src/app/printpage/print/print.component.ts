import { Component, OnInit, ViewChild, ElementRef, inject, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SalesOrder } from '../../models/sales-order';



@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  today: number = Date.now();
  
  constructor(
    private dialogRef: MatDialogRef<PrintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalesOrder
    ) {
      
     }
  

  ngOnInit() {
    
  
  }
  @ViewChild('printsection') printsection: ElementRef;
 
  print(): void {
    let printContents, popupWin;
    
    printContents = document.getElementById('printsection').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
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
       
        .bakeryhead{
          font-size: 25px;
        }
        .shop{
            padding-right: 50px;
        }
      .underline{
          border-bottom: 1px solid;
      } 
      table td{
        width:50px;
        overflow: hidden; 
        word-wrap: break-word;
      }
      .shop_print{
        position: relative;
        bottom: 20px;
      }
      .display{
        display: none;
    }
        .text-center{
          text-align:center;
        }
        .comments{
          width: 100%;
          word-wrap: break-word;
          border-color: white;
       }

        .table {
          width: 100%;
          max-width: 100%;
          margin-bottom: 20px;
      }
          </style>
        </head>
    <body onload="window.print();window.close()"> ${printContents}</body>
      </html>`
    );
    popupWin.document.close();
} 
 
}