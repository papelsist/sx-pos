import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacViewPartidasComponent } from './fac-view-partidas.component';

describe('FacViewPartidasComponent', () => {
  let component: FacViewPartidasComponent;
  let fixture: ComponentFixture<FacViewPartidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacViewPartidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacViewPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
