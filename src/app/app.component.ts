import { Component, inject, OnInit } from '@angular/core';
import { Product } from './models/Product';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  imports: [ProductCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  productService = inject(ProductService);
  title = 'couchDB-learning';
  products: Product[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res.rows.map((row: any) => row.doc);
    });
  }
}
