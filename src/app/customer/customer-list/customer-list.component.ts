import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  isPopupOpened = true;
  displayedColumns = ['id', 'name', 'mobile','amobile','actioncolumn'];
  @Input() public selectedCustomer:Customer;
  public customers: Array<Customer> = [];
  public dataSource = new MatTableDataSource(this.customers);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  constructor( private customerservice:CustomerService , private dialog?: MatDialog) { }
  
  

  ngOnInit() {
    this.customerservice.getAll()
      .subscribe((resultData: Array<Customer>) => {
        
        this.customers = resultData;
        this.dataSource = new MatTableDataSource(this.customers);
      });
  }
  editcustomer(customer:Customer) {
    this.isPopupOpened = true;
  
    const dialogRef = this.dialog.open(CustomerEditComponent, {
     data:customer
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  }

}
