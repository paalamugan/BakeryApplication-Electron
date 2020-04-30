import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ShopEditComponent } from '../shop-edit/shop-edit.component';
import { Shop } from '../../models/shop';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  isPopupOpened = true;
  displayedColumns = ['id', 'name', 'code', 'actionsColumn'];
  public shops: Array<Shop> = [];

  public dataSource = new MatTableDataSource(this.shops);

  constructor(private shopService: ShopService, private dialog?: MatDialog) { }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.shopService.getShopAll()
      .subscribe((resultData: Array<Shop>) => {
        this.shops = resultData;
        this.dataSource = new MatTableDataSource(this.shops);
      });
   
  }
  editproduct(shop: Shop) {
    //this.router.navigate(['/product-list',product._id]);
    this.isPopupOpened = true;
 
    const dialogRef = this.dialog.open(ShopEditComponent, {
    
      data: shop

    });
 

    dialogRef.afterClosed().subscribe(shop => {
      this.isPopupOpened = false;
    });

  }

}
export interface Shops {
  shopname: string;
  id: number;
  shopcode: number;
}
const ELEMENT_DATA: Shops[] = [
  {id: 1, shopname: 'cauvery', shopcode: 100,},
  {id: 2, shopname: 'yamuni', shopcode: 200,},
  {id: 3, shopname: 'ganga', shopcode: 300,},
 
];