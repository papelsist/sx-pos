import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalLabelComponent } from './sucursal-label.component';

describe('SucursalLabelComponent', () => {
  let component: SucursalLabelComponent;
  let fixture: ComponentFixture<SucursalLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
