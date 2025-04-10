import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { HttpClient  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FormsModule,HttpClient],
})
export class AppComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;
  selectedGroup: any = null;

  newGroupName: string = '';
  newLabel: any = { label: '', description: '', displayName: '' };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  selectProduct(product: any): void {
    this.selectedProduct = product;
    this.selectedGroup = null;
  }

  selectGroup(group: any): void {
    this.selectedGroup = group;
  }

  addGroup(): void {
    if (!this.selectedProduct) return;

    const group = {
      groupname: this.newGroupName,
      labels: [],
    };

    this.productService.addGroupToProduct(this.selectedProduct.productname, group).subscribe(() => {
      this.loadProducts(); // refresh data
      this.newGroupName = '';
    });
  }

  addLabel(): void {
    if (!this.selectedProduct || !this.selectedGroup) return;

    this.productService
      .addLabelToGroup(this.selectedProduct.productname, this.selectedGroup.groupname, this.newLabel)
      .subscribe(() => {
        this.loadProducts(); // refresh
        this.newLabel = { label: '', description: '', displayName: '' };
      });
  }
}
