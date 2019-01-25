import { TestBed } from '@angular/core/testing';

import { SupplierDropdownService } from './supplier-dropdown.service';

describe('SupplierDropdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierDropdownService = TestBed.get(SupplierDropdownService);
    expect(service).toBeTruthy();
  });
});
