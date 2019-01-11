import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Supplier } from '../../../cpa-manager/models/supplier.model';

@Component({
  selector: 'app-supplier-dropdown',
  templateUrl: './supplier-dropdown.component.html',
  styleUrls: ['./supplier-dropdown.component.scss']
})
export class SupplierDropdownComponent implements OnInit {

  @Input() suppliers: Supplier[];
  @Input() propertyName: string;
  @Input() placeholder: string;
  @Output() supplier = new EventEmitter<Supplier>();
  @Output() newPlaceholder = new EventEmitter<string>();
  @Output() supplierSelected = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    console.log('dropdown onInit: ', this.placeholder);
  }

  select(supplier: Supplier) {
    this.supplier.emit(supplier);
    this.newPlaceholder.emit(supplier[this.propertyName]);
    this.supplierSelected.emit(true);
  }

}
