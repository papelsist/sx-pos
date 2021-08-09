import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavListLayoutComponent } from './nav-list-layout.component';

describe('NavListLayoutComponent', () => {
  let component: NavListLayoutComponent;
  let fixture: ComponentFixture<NavListLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavListLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
