import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaShowComponent } from './factura-show.component';

describe('FacturaShowComponent', () => {
  let component: FacturaShowComponent;
  let fixture: ComponentFixture<FacturaShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
