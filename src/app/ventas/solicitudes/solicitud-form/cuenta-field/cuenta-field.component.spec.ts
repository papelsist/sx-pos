import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaFieldComponent } from './cuenta-field.component';

describe('CuentaFieldComponent', () => {
  let component: CuentaFieldComponent;
  let fixture: ComponentFixture<CuentaFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
