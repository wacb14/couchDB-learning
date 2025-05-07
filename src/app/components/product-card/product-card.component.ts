import { Component, EventEmitter, input, output, Output } from '@angular/core';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  deleter = output();
  editor = output();

  product = input.required<Product>();
  delete(data: any) {
    this.deleter.emit(data);
  }
  edit(data: any) {
    this.editor.emit(data);
  }
}
