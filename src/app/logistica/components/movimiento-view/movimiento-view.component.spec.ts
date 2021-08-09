import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoViewComponent } from './movimiento-view.component';

describe('MovimientoViewComponent', () => {
  let component: MovimientoViewComponent;
  let fixture: ComponentFixture<MovimientoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
