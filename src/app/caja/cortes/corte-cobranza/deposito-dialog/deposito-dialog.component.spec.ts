import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoDialogComponent } from './deposito-dialog.component';

describe('DepositoDialogComponent', () => {
  let component: DepositoDialogComponent;
  let fixture: ComponentFixture<DepositoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
