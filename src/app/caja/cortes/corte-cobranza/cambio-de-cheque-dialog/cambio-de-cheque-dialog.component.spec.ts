import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioDeChequeDialogComponent } from './cambio-de-cheque-dialog.component';

describe('CambioDeChequeDialogComponent', () => {
  let component: CambioDeChequeDialogComponent;
  let fixture: ComponentFixture<CambioDeChequeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioDeChequeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioDeChequeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
