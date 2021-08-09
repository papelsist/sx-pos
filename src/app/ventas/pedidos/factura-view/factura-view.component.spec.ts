import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaViewComponent } from './factura-view.component';

describe('FacturaViewComponent', () => {
  let component: FacturaViewComponent;
  let fixture: ComponentFixture<FacturaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
