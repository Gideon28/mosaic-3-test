import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store} from '@ngrx/store';

import { Report } from './models/report.model';
import { Supplier } from './models/supplier.model';
import { Download } from './models/download.model';

import * as fromStore from './store';

import { CpaManagerService } from './service/cpa-manager.service';

@Component({
  selector: 'app-cpa-manager',
  templateUrl: './cpa-manager.component.html',
  styleUrls: ['./cpa-manager.component.scss']
})
export class CpaManagerComponent implements OnInit {

  reports$: Observable<Report[]>;
  downloads$: Observable<Download[]>;
  suppliers$: Observable<Supplier[]>;
  supplierSelected: boolean;

  dropdownPlaceholder = 'Select a Supplier';
  constructor(private store: Store<fromStore.CpaState>,
              private cpaManagerService: CpaManagerService) { }

  ngOnInit() {
    // this.cpaManagerService.fetchReports().subscribe(data => console.log(data));
    this.reports$ = this.store.pipe(
      select(fromStore.getReportsState)
    );
    this.downloads$ = this.store.pipe(
      select(fromStore.getDownloadsState)
    );
    this.suppliers$ = this.store.pipe(
      select(fromStore.getSuppliersState)
    );
    this.store.dispatch(new fromStore.LoadReports());
    this.store.dispatch(new fromStore.LoadSuppliers());
    this.store.dispatch(new fromStore.LoadDownloads());
  }

  updateSupplier(supplier: Supplier) {
    console.log(supplier);
  }

  getDownloadTemplateUrl() {
    return this.cpaManagerService.downloadTemplateUrl;
  }

  updatePlaceholder(placeholder: string) {
    this.dropdownPlaceholder = placeholder;
  }

  enableUploadBtn(supplierSelected: boolean) {
    this.supplierSelected = supplierSelected;
  }
}
