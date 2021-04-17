import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  token: any;
  product: any;

  baseUri = 'http://localhost:4000/api';

  constructor(private http: Http) { }

  addProduct(product) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      this.baseUri + '/product',
      product,
      { headers: headers }).pipe(map(res => res.json()));
  }

  getProducts() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      this.baseUri + '/product',
      { headers: headers }).pipe(map(res => res.json()));
  }
  
  getProductById(productId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let result = this.http.get(
      this.baseUri + `/product/${productId}`,
      { headers: headers }).pipe(map(res => res.json()));
    return result;
  }

  updateProduct(updateProduct: any, productId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return this.http.put(
      this.baseUri + `/product/${productId}`,
      updateProduct,
      { headers: headers }).pipe(map(res => res.json()));
  }

  deleteProduct(productId: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let result = this.http.post(
      this.baseUri + `/product/${productId}`,
      { headers: headers }).pipe(map(res => res.json()));
    return result;
  }
}
