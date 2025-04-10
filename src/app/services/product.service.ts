import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://192.168.31.64:5000'; // 🔧 Change this to match your API host/port

  constructor(private http: HttpClient) {}

  // ✅ GET all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  // ✅ GET a product by name
  getProductByName(productName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${productName}`);
  }

  // ✅ POST a new group to a product
  addGroupToProduct(productName: string, group: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/${productName}/groups`, group);
  }

  // ✅ PUT: Update group name
  updateGroupName(productName: string, groupName: string, newGroupName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${productName}/groups/${groupName}`, {
      newGroupName
    });
  }

  // ✅ DELETE a group
  deleteGroup(productName: string, groupName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${productName}/groups/${groupName}`);
  }

  // ✅ POST a new label to a group
  addLabelToGroup(productName: string, groupName: string, label: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/${productName}/groups/${groupName}/labels`, label);
  }

  // ✅ PUT: Update a label
  updateLabel(
    productName: string,
    groupName: string,
    labelName: string,
    labelData: any
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${productName}/groups/${groupName}/labels/${labelName}`, labelData);
  }

  // ✅ DELETE a label
  deleteLabel(productName: string, groupName: string, labelName: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${productName}/groups/${groupName}/labels/${labelName}`);
  }
}
