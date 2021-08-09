import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageListLayoutComponent } from './manage-list-layout.component';

describe('ManageListLayoutComponent', () => {
  let component: ManageListLayoutComponent;
  let fixture: ComponentFixture<ManageListLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageListLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageListLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
