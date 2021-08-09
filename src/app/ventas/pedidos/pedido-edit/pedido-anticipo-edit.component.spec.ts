import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoAnticipoEditComponent } from './pedido-anticipo-edit.component';

describe('PedidoAnticipoEditComponent', () => {
  let component: PedidoAnticipoEditComponent;
  let fixture: ComponentFixture<PedidoAnticipoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoAnticipoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoAnticipoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
