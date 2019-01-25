import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpaManagerComponent } from './cpa-manager.component';

describe('CpaManagerComponent', () => {
  let component: CpaManagerComponent;
  let fixture: ComponentFixture<CpaManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpaManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpaManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
