import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBarcodeComponent } from './find-barcode.component';

describe('FindBarcodeComponent', () => {
  let component: FindBarcodeComponent;
  let fixture: ComponentFixture<FindBarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
