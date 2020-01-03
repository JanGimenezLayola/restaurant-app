import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private service: OrderService,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    console.log('HREWFDSFLDGJFGFMDLGMFDSGLMLFGMFLSDMGLFSDMGLFDMGLFSDMGLFDGFMDSG');
    
    if(form = null)
      form.resetForm();
    this.service.formData = {
      orderNo: Math.floor(100000+Math.random()*900000),
      customerID: 0,
      pMethod: '',
      gTotal: 0
    };
    this.service.orderItems= [];
  }

  AddOrEditOrderItem(orderItemIndex, orderId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {orderItemIndex, orderId};
    
    this.dialog.open(OrderItemsComponent, dialogConfig)
  }

}