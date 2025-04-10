import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent) },
  { path: 'groups', loadComponent: () => import('./components/groups/groups.component').then(m => m.GroupsComponent) },
  { path: 'labels', loadComponent: () => import('./components/labels/labels.component').then(m => m.LabelsComponent) }
];
