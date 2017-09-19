import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosPageComponent } from './movimientos-page.component';

describe('MovimientosPageComponent', () => {
  let component: MovimientosPageComponent;
  let fixture: ComponentFixture<MovimientosPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientosPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
