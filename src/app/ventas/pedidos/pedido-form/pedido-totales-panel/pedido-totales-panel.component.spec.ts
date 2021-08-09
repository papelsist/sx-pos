import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoTotalesPanelComponent } from './pedido-totales-panel.component';

describe('PedidoTotalesPanelComponent', () => {
  let component: PedidoTotalesPanelComponent;
  let fixture: ComponentFixture<PedidoTotalesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoTotalesPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoTotalesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
