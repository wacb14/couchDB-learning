import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  headers = new HttpHeaders({
    Authorization: 'Basic ' + btoa('admin:admin'),
    'Content-Type': 'application/json',
  });

  getById(id:string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5984/products/${id}`,
      { headers: this.headers }
    );
  }
  getProducts(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:5984/products/_all_docs?include_docs=true',
      { headers: this.headers }
    );
  }
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(
      'http://localhost:5984/products/',
      product,
      { headers: this.headers }
    );
  }
}
