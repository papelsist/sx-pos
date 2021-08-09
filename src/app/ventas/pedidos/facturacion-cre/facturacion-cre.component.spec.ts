import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionCreComponent } from './facturacion-cre.component';

describe('FacturacionCreComponent', () => {
  let component: FacturacionCreComponent;
  let fixture: ComponentFixture<FacturacionCreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturacionCreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionCreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
