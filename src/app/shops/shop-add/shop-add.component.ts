import { Component, OnInit, ViewChild } from '@angular/core';
import { Shop } from '../../models/shop';
import { ShopService } from '../../services/shop.service';
import { MatSnackBar, MatInput } from '@angular/material';

@Component({
  selector: 'app-shop-add',
  templateUrl: './shop-add.component.html',
  styleUrls: ['./shop-add.component.css']
})
export class ShopAddComponent implements OnInit {
  @ViewChild('shopNameInput') shopname: MatInput;
  public shop: Shop
  = new Shop(1,"","");
  constructor(private shopService: ShopService,
    public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.shopname.focus();
  }
  onSubmit(){
    this.shopService.addShop(this.shop)
    .subscribe((response) => {
      this.snackBar.open("Added Shop Successfully", "Ok", {
        duration: 2000,
      });
    }
    );
  this.shop.shopName ="";
  this.shop.shopCode ="";
  this.shopname.focus();
  }
}
