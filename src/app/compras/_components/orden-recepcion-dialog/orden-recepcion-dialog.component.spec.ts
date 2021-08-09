import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenRecepcionDialogComponent } from './orden-recepcion-dialog.component';

describe('OrdenRecepcionDialogComponent', () => {
  let component: OrdenRecepcionDialogComponent;
  let fixture: ComponentFixture<OrdenRecepcionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenRecepcionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenRecepcionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
