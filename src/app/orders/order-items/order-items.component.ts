import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrderItem } from '../../shared/order-item.model';
import { ItemService } from '../../shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
  formData:OrderItem;
  itemList: Item[];
  isValid:boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private orderSevice: OrderService
  ) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => {
      this.itemList = res as Item[]
    } )
    if(this.data.orderItemIndex==null)
      this.formData = {
        orderID: null,
        itemID: 0,
        itemName: '',
        price: 0,
        quantity: 0,
        Total: 0      
      }
    else 
    this.formData = Object.assign({}, this.orderSevice.orderItems[this.data.orderItemIndex]) 
  }

  updatePrice(ctrl) {
    if(ctrl.selectedIndex==0){
      this.formData.price = 0;
      this.formData.itemName = '';
    } else {      
      this.formData.price = this.itemList[ctrl.selectedIndex-1].Price;
      this.formData.itemName = this.itemList[ctrl.selectedIndex-1].name;
    }
  }

  updateTotal() {
    this.formData.Total = parseFloat((this.formData.quantity * this.formData.price).toFixed(2));    
  }

  onSubmit(form:NgForm){
    if(this.validateForm(form.value)) {
      if(this.data.orderItemIndex == null){
        this.orderSevice.orderItems.push(form.value);
        this.dialogRef.close();
      }
      else {
        this.orderSevice.orderItems[this.data.orderItemIndex] = form.value;
        this.dialogRef.close();
      }
      }
  }

  validateForm(formData:OrderItem) {    
    this.isValid = true;
    if (formData.itemID == 0) 

      this.isValid = false;
    else if (formData.quantity == 0)
      this.isValid = false;
    return this.isValid;
  }

}
