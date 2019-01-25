import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MosaicIconsComponent } from './mosaic-icons.component';

describe('MosaicIconsComponent', () => {
  let component: MosaicIconsComponent;
  let fixture: ComponentFixture<MosaicIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MosaicIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MosaicIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
