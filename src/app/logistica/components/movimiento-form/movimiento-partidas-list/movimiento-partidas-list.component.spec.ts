import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoPartidasListComponent } from './movimiento-partidas-list.component';

describe('MovimientoPartidasListComponent', () => {
  let component: MovimientoPartidasListComponent;
  let fixture: ComponentFixture<MovimientoPartidasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientoPartidasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientoPartidasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
