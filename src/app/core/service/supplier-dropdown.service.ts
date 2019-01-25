import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierDropdownService {

  constructor(private http: HttpClient) { }

  fetchSuppliers() {
    return this.http.get('../assets/suppliers.json');
  }
}
