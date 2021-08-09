import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacViewTotalesComponent } from './fac-view-totales.component';

describe('FacViewTotalesComponent', () => {
  let component: FacViewTotalesComponent;
  let fixture: ComponentFixture<FacViewTotalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacViewTotalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacViewTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
