import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalFieldComponent } from './sucursal-field.component';

describe('SucursalFieldComponent', () => {
  let component: SucursalFieldComponent;
  let fixture: ComponentFixture<SucursalFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
