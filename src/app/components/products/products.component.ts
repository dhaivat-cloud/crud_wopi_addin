import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Products</h1>
    <ul>
      <li *ngFor="let product of products">
        {{ product.productname }}
      </li>
    </ul>
  `
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }
}
