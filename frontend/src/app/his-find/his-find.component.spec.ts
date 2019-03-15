import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HisFindComponent } from './his-find.component';

describe('HisFindComponent', () => {
  let component: HisFindComponent;
  let fixture: ComponentFixture<HisFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HisFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HisFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
