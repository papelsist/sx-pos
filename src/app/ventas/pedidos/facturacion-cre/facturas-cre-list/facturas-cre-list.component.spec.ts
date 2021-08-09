import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasCreListComponent } from './facturas-cre-list.component';

describe('FacturasCreListComponent', () => {
  let component: FacturasCreListComponent;
  let fixture: ComponentFixture<FacturasCreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasCreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasCreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
