import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Groups for Product</h2>
    <form (submit)="fetchGroups()">
      <label>Product Name: <input [(ngModel)]="productname" name="productname" required /></label>
      <button type="submit">Load Groups</button>
    </form>

    <div *ngIf="groups?.length">
      <h3>Existing Groups</h3>
      <ul>
        <li *ngFor="let group of groups">
          {{ group.groupname }}
          <button (click)="deleteGroup(group.groupname)">Delete</button>
        </li>
      </ul>
    </div>

    <h3>Add Group</h3>
    <form (ngSubmit)="addGroup()">
      <label>Group Name: <input [(ngModel)]="groupname" name="groupname" required /></label>
      <button type="submit">Add Group</button>
    </form>
  `
})
export class GroupsComponent implements OnInit {
  productname = '';
  groupname = '';
  groups: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  fetchGroups() {
    this.productService.getProductByName(this.productname).subscribe(product => {
      this.groups = product.groups || [];
    });
  }

  addGroup() {
    const payload = {
      groupname: this.groupname,
      labels: []
    };
    this.productService.addGroupToProduct(this.productname, payload).subscribe(res => {
      this.fetchGroups();
      this.groupname = '';
    });
  }

  deleteGroup(groupname: string) {
    this.productService.deleteGroup(this.productname, groupname).subscribe(() => {
      this.fetchGroups();
    });
  }
}
