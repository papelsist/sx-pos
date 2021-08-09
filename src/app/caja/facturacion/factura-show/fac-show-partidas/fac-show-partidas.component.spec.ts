import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacShowPartidasComponent } from './fac-show-partidas.component';

describe('FacShowPartidasComponent', () => {
  let component: FacShowPartidasComponent;
  let fixture: ComponentFixture<FacShowPartidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacShowPartidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacShowPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
