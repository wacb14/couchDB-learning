import { Component, inject, OnInit } from '@angular/core';
import { Product } from './models/Product';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductService } from './services/product.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ProductCardComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  productService = inject(ProductService);
  fb = inject(FormBuilder);
  productForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    description: [''],
  });
  title = 'couchDB-learning';
  products: Product[] = [];

  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getProducts().subscribe((res: any) => {
      if (res.rows) {
        this.products = res.rows.map((row: any) => row.doc);
      }
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      this.productService
        .addProduct(this.productForm.value)
        .subscribe((res: any) => {
          this.productService.getById(res.id).subscribe((res2) => {
            this.products.push(<Product>res2);
          });
        });
    }
    this.productForm.reset();
  }
}
