import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoFijoListComponent } from './fondo-fijo-list.component';

describe('FondoFijoListComponent', () => {
  let component: FondoFijoListComponent;
  let fixture: ComponentFixture<FondoFijoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FondoFijoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FondoFijoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
