import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-labels',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Labels in Group</h2>
    <form (submit)="loadLabels()">
      <label>Product: <input [(ngModel)]="productname" name="productname" required /></label>
      <label>Group: <input [(ngModel)]="groupname" name="groupname" required /></label>
      <button type="submit">Load Labels</button>
    </form>

    <div *ngIf="labels.length">
      <h3>Existing Labels</h3>
      <ul>
        <li *ngFor="let label of labels">
          {{ label.label }} - {{ label.displayName }}
          <button (click)="deleteLabel(label.label)">Delete</button>
        </li>
      </ul>
    </div>

    <h3>Add Label</h3>
    <form (ngSubmit)="addLabel()">
      <label>Label: <input [(ngModel)]="label" name="label" required /></label>
      <label>Display Name: <input [(ngModel)]="displayName" name="displayName" required /></label>
      <label>Description: <input [(ngModel)]="description" name="description" /></label>
      <button type="submit">Add</button>
    </form>
  `
})
export class LabelsComponent {
  productname = '';
  groupname = '';
  label = '';
  displayName = '';
  description = '';
  labels: any[] = [];

  constructor(private productService: ProductService) {}

  loadLabels() {
    this.productService.getProductByName(this.productname).subscribe(product => {
      const group = product.groups.find((g: any) => g.groupname === this.groupname);
      this.labels = group ? group.labels : [];
    });
  }

  addLabel() {
    const payload = {
      label: this.label,
      description: this.description,
      displayName: this.displayName
    };
    this.productService.addLabelToGroup(this.productname, this.groupname, payload).subscribe(() => {
      this.loadLabels();
      this.label = '';
      this.description = '';
      this.displayName = '';
    });
  }

  deleteLabel(labelName: string) {
    this.productService.deleteLabel(this.productname, this.groupname, labelName).subscribe(() => {
      this.loadLabels();
    });
  }
}
