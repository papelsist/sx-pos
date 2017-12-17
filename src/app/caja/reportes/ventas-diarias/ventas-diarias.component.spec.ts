import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasDiariasComponent } from './ventas-diarias.component';

describe('VentasDiariasComponent', () => {
  let component: VentasDiariasComponent;
  let fixture: ComponentFixture<VentasDiariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasDiariasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasDiariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
