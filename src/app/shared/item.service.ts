import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http:HttpClient) { }

  async getItemList(): Promise<any> {    
    return this.http.get(environment.apiURL+'/Item').toPromise();
  }
}
