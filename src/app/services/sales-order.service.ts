import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../utils';
import { SalesOrder } from '../models/sales-order';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  constructor(private httpClient: HttpClient) { }
  public getAllOrders() {
    return this.httpClient.get(`${Utils.getAllOrderURL()}`);
  }

  public getOrders() {
    return this.httpClient.get(`${Utils.getOrderURL()}`);
  }
  public getSalesReport() {
    return this.httpClient.get(`${Utils.getSalesURL()}`);
  }
  addSalesOrder(salesOrder: SalesOrder) {
    return this.httpClient.post(`${Utils.addOrderURL()}`, salesOrder);
  }
  addSalesOrderNew(salesOrder: SalesOrder) {
    return this.httpClient.post(`${Utils.addOrderNewURL()}`, salesOrder);
  }
  
  editSalesOrder(salesOrder: SalesOrder) {
    return this.httpClient.post(`${Utils.editOrderURL()}`, salesOrder);
  }
  getStatuses() {
    return this.httpClient.get(`${Utils.getStatusesURL()}`);
  }
  getPendingParam() {
    return this.httpClient.get(`${Utils.getPendingParamURL()}`);
  }
  getInproductionParam(){
    return this.httpClient.get(`${Utils.getInproductionParamURL()}`);
  }
  movetoProduction(salesOrder: Array<SalesOrder>) {
    return this.httpClient.post(`${Utils.movetoProductionURL()}`,salesOrder);
  }
  movetoInStock(salesOrder: Array<SalesOrder>){
    return this.httpClient.post(`${Utils.movetoInStockURL()}`,salesOrder);
  }
  //return this.httpClient.post(`${Utils.editProductURL()}`+`/${shop.id}`,shop);
}
