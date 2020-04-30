import { Component, OnInit } from '@angular/core';
import { SalesOrder } from '../../models/sales-order';
import { SalesOrderService } from '../../services/sales-order.service';
import { MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import{Router} from '@angular/router';
@Component({
  selector: 'app-inproduction',
  templateUrl: './inproduction.component.html',
  styleUrls: ['./inproduction.component.css']
})
export class InproductionComponent implements OnInit {
  displayedColumns = [ 'select','id', 'mobile', 'advance', 'total', 'expectedDate', 'expectedTime', 'shop'];
  public salesorder: Array<SalesOrder>;
  public salesorder1: Array<SalesOrder> =[];
  public dataSource = new MatTableDataSource<SalesOrder>(this.salesorder);
  selection = new SelectionModel<SalesOrder>(true, []);
   constructor(private salesOrderService: SalesOrderService,private router:Router,private snackBar: MatSnackBar,
   ) { }
   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.salesOrderService.getInproductionParam()
    .subscribe((resultData: Array<SalesOrder>) => {
      this.salesorder = resultData;
      this.dataSource = new MatTableDataSource(this.salesorder);
    });
  }

  onclick(salesorder:SalesOrder){
    const selectvalue =this.selection.isSelected(salesorder);
    if(selectvalue === false){
      this.salesorder1.push(salesorder);
    }else if(selectvalue === true){
      for(var i=0;i<this.salesorder1.length;i++){
        if(this.salesorder1[i]["id"] === salesorder.id){
          this.salesorder1.splice(i,1);
        }
      }
     }
  }
  onAllClick(){
    const selectAll= this.isAllSelected();
    if(selectAll === false){
      this.salesorder1=this.salesorder;
      console.log("salesorder1",this.salesorder1);
    }else{
      this.salesorder1 = [];
    }
  }
  onSubmit(){
    if(this.salesorder1.length >0){
      this.salesOrderService.movetoInStock(this.salesorder1)
      .subscribe((resultData:Array<SalesOrder>) => {
        this.router.navigate(['/orderlist']);
      });
          }else {
            this.snackBar.open("please check atleast one checkbox","", {
              duration: 3000,
            });
          }
    // 
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
