import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { Product } from '../../models/product';
import { OrderView } from '../../models/order-view';
import { Time } from '@angular/common';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { SalesOrder } from '../../models/sales-order';
import { OrderItem } from '../../models/order-item';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatInput } from '@angular/material';
import { FlavourService } from '../../services/flavour.service';
import { Flavour } from '../../models/flavour';
import { Uom } from '../../models/uom';
import { UomService } from '../../services/uom.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  item: OrderItem;
  selected: Uom;
  public products: Array<Product> = [];
  public flavours: Array<Flavour> = [];
  public uom: Array<Uom> = [];
  public filteredOptions: Observable<Product[]>;
  public filteredOptions2: Observable<Flavour[]>;
  formControl: FormControl = new FormControl();
  formControl1: FormControl = new FormControl();
  @Output() addToCart = new EventEmitter<any>();
  @Output() addToCartselect = new EventEmitter<any>();
  @ViewChild('itemNameInput') itemName: MatInput;
  @ViewChild('itemquantityInput') itemQuantity: MatInput;
  @ViewChild('quantitySearch') searchinput1: ElementRef;
  @ViewChild('inputSearch') inputSearch: ElementRef;


  constructor(private customerService: CustomerService, private flavourService: FlavourService, private uomService: UomService,
    private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll()
      .subscribe((products: Array<Product>) => {
        this.products = products;
        this.itemName.focus();

      });
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
    this.flavourService.getAll()
      .subscribe((flavour: Array<Flavour>) => {
        this.flavours = flavour;

      });
      this.filteredOptions2 = this.formControl1.valueChanges.pipe(
        startWith(''),
        map(val => this.applyFilter(val))
      );
    this.uomService.getAll()
      .subscribe((uom: Array<Uom>) => {
        this.uom = uom;

      });
      
    
  }
  filter(val: any): any[] {
    return this.products.filter(product => product.modelNumber.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  applyFilter(val: any): any[] {

    return this.flavours.filter(flavour => flavour.name.toLowerCase().indexOf(val.toLowerCase()) === 0);

  }

  public search = null;
  onAdd(item: any) {
    this.addToCart.emit(item);
    this.itemName.focus();
    const inputsearch = <HTMLInputElement>this.inputSearch.nativeElement;
    inputsearch.select();
  }

  onSelectionChange(product: Product, flavour: Flavour, uom: Uom) {
  
    for (let i of this.uom) {
      if (i.id == 1) {

        this.selected = i;
      }
    }
    this.item = new OrderItem(
      1,
      product,
      product.price,
      1,
      this.selected,
      flavour,
      null
    );
  }
  public flavoursearch = null;
  onChange(event, flavour: Flavour) {
    
    if (event.isUserInput) {
      this.item.flavour = flavour;
    }
  }
}