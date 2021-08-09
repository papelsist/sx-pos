import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolesPendientesComponent } from './soles-pendientes.component';

describe('SolesPendientesComponent', () => {
  let component: SolesPendientesComponent;
  let fixture: ComponentFixture<SolesPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolesPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
