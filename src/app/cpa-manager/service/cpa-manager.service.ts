import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CpaManagerService {
  downloadTemplateUrl: 'https://s3-eu-west-1.amazonaws.com/public-docs.sci-ware.com/CPA_TEMPLATE.csv';

  constructor(private httpclient: HttpClient) { }

  fetchReports() {
    return this.httpclient.get('../assets/data-test.json');
  }

  fetchSuppliers() {
    return this.httpclient.get('../assets/suppliers.json');
  }

  fetchDownloads() {
    return this.httpclient.get('../assets/data-test-downloads.json');
  }
}
