import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from '../../shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  customerList : Customer[];
  isValid:boolean = true;

  constructor(
    private service: OrderService,
    private dialog:MatDialog,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    let orderID = this.currentRoute.snapshot.paramMap.get('id');
    
    if(orderID == null)
    this.resetForm();
    else {
      this.service.getOrderByID(orderID).then(res => {        
        this.service.formData = res
        this.service.orderItems = res.OrderItem
      })
    }
    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[] )
  }

  resetForm(form?: NgForm) {    
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
    
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal()
    })
  }

  onDeleteOrderItem(itemID: number, i: number) {
    this.service.orderItems.splice(i, 1);
    this.updateGrandTotal()
  }

  updateGrandTotal(){
    this.service.formData.gTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);
    this.service.formData.gTotal = parseFloat(this.service.formData.gTotal.toFixed(2));
  }

  validateForm() {
    this.isValid = true;
    if(this.service.formData.customerID==0)
    this.isValid=false
    else if(this.service.orderItems.length==0)
    this.isValid=false
    return this.isValid
  }

  onSubmit(form:NgForm){
    if(this.validateForm()) {
      let orderID = this.currentRoute.snapshot.paramMap.get('id');
      if(orderID == null) {
        this.service.saveOrder().subscribe(res => {
          this.resetForm();
          this.toastr.success('Submitted Succesfully', 'Restaurant App.');
          this.router.navigate(['/orders'])
        })
      } else {
        this.service.updateOrder(orderID).subscribe(res => {
          this.resetForm();
          this.toastr.success('Submitted Succesfully', 'Restaurant App.');
          this.router.navigate(['/orders'])
        })
      }
    }
  }
}
