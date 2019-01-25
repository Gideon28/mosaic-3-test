import { TestBed } from '@angular/core/testing';

import { CpaManagerService } from './cpa-manager.service';

describe('CpaManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CpaManagerService = TestBed.get(CpaManagerService);
    expect(service).toBeTruthy();
  });
});
