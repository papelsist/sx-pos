import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdendetAddDialogComponent } from './ordendet-add-dialog.component';

describe('OrdendetAddDialogComponent', () => {
  let component: OrdendetAddDialogComponent;
  let fixture: ComponentFixture<OrdendetAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdendetAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdendetAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
