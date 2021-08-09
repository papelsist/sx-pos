import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacShowTotalesComponent } from './fac-show-totales.component';

describe('FacShowTotalesComponent', () => {
  let component: FacShowTotalesComponent;
  let fixture: ComponentFixture<FacShowTotalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacShowTotalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacShowTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
