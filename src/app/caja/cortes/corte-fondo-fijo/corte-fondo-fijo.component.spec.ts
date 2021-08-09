import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteFondoFijoComponent } from './corte-fondo-fijo.component';

describe('CorteFondoFijoComponent', () => {
  let component: CorteFondoFijoComponent;
  let fixture: ComponentFixture<CorteFondoFijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorteFondoFijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorteFondoFijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
