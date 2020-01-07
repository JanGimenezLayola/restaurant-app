import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData:Order;
  orderItems:OrderItem[];

  constructor(private http: HttpClient) { }

  saveOrder() {
    var body = {
      ...this.formData,
      OrderItem: this.orderItems
    }
    return this.http.post(environment.apiURL+'/Order', body)
  }

  deleteOrder(id) {
    return this.http.delete(environment.apiURL+'/Order/'+id).toPromise()
  }

  updateOrder(id) {
    var body = {
      ...this.formData,
      OrderItem: this.orderItems
    }
    return this.http.put(environment.apiURL+'/Order/'+id, body)
  }

  getOrderList(){
    return this.http.get(environment.apiURL+'/Order').toPromise()
  }

  getOrderByID(id: string): any{        
    return this.http.get(environment.apiURL+'/Order/'+id).toPromise()
  }

}
