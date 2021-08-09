import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValesPendientesComponent } from './vales-pendientes.component';

describe('ValesPendientesComponent', () => {
  let component: ValesPendientesComponent;
  let fixture: ComponentFixture<ValesPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValesPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
