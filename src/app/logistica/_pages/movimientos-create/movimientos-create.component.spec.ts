import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosCreateComponent } from './movimientos-create.component';

describe('MovimientosCreateComponent', () => {
  let component: MovimientosCreateComponent;
  let fixture: ComponentFixture<MovimientosCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientosCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
