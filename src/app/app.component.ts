import { Component, inject, OnInit } from '@angular/core';
import { Product } from './models/Product';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductService } from './services/product.service';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ProductCardComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  productService = inject(ProductService);
  fb = inject(NonNullableFormBuilder);
  productForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    description: ['', Validators.required],
  });
  title = 'couchDB-learning';
  products: Product[] = [];
  editMode = false;
  productEdited: Product = null!;

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
  updateProduct() {
    if (this.editMode && this.productEdited) {
      this.productService
        .updateProduct(
          this.productEdited._id,
          this.productEdited._rev,
          this.productForm.value
        )
        .subscribe((res) => {
          let index = this.products.findIndex(
            (product) => product._id == res.id
          );
          // It is always important to get the new 'rev' to update again, otherwise we will get an error if we try with a previous value of rev.
          this.productService.getById(res.id).subscribe((res2) => {
            this.products[index] = res2;
          });
          this.cleanForm();
        });
    }
  }
  saveProduct() {
    if (this.editMode) this.updateProduct();
    else this.addProduct();
  }
  deleteProduct(data: any) {
    this.productService.deleteProduct(data._id, data._rev).subscribe((res) => {
      let index = this.products.findIndex((product) => product._id == res.id);
      this.products.splice(index, 1);
    });
  }
  loadForm(data: any) {
    let found = this.products.find((product) => product._id == data._id);
    if (found) this.productEdited = found;
    this.editMode = true;
    this.productForm.setValue({
      name: this.productEdited.name,
      price: this.productEdited.price,
      description: this.productEdited.description,
    });
  }
  cleanForm() {
    this.productForm.reset();
    this.editMode = false;
    this.productEdited = null!;
  }
}
