import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosShowComponent } from './movimientos-show.component';

describe('MovimientosShowComponent', () => {
  let component: MovimientosShowComponent;
  let fixture: ComponentFixture<MovimientosShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientosShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
