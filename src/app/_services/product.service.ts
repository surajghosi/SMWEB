import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../_models/index';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  createProduct(productDetails: Product) {
    return this.http.post(`${environment.APIUrl}Product/AddProduct`, productDetails);
  }
  deleteProduct(productDetails: Product) {
    return this.http.post(`${environment.APIUrl}Product/DeleteProduct`, productDetails);
  }
}
