import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacViewHeaderComponent } from './fac-view-header.component';

describe('FacViewHeaderComponent', () => {
  let component: FacViewHeaderComponent;
  let fixture: ComponentFixture<FacViewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacViewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
