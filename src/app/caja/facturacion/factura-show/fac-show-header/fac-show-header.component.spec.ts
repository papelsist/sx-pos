import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacShowHeaderComponent } from './fac-show-header.component';

describe('FacShowHeaderComponent', () => {
  let component: FacShowHeaderComponent;
  let fixture: ComponentFixture<FacShowHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacShowHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacShowHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
