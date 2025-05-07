import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  headers = new HttpHeaders({
    Authorization: 'Basic ' + btoa('admin:admin'),
    'Content-Type': 'application/json',
  });
  getProducts(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:5984/products/_all_docs?include_docs=true',
      { headers: this.headers }
    );
  }
}
