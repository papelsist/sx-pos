import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaSearchDialogComponent } from './factura-search-dialog.component';

describe('FacturaSearchDialogComponent', () => {
  let component: FacturaSearchDialogComponent;
  let fixture: ComponentFixture<FacturaSearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaSearchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
