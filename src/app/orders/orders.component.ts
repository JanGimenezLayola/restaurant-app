import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderList;

  constructor(
    private service: OrderService,
    private router: Router, 
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
    this.service.getOrderList().then(res => this.orderList = res);
  }

  openForEdit(orderID: number) {
    this.router.navigate(['/order/edit/'+orderID])
  }

  async onDeleteOrder(orderID: number) {    
    this.service.deleteOrder(orderID).then(() =>  {
      this.service.getOrderList().then(res => this.orderList = res);
      this.toastr.error('Deleted Succesfully', 'Restaurant App.')
    })
  }

}
