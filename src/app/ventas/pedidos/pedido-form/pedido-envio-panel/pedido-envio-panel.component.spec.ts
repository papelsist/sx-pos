import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoEnvioPanelComponent } from './pedido-envio-panel.component';

describe('PedidoEnvioPanelComponent', () => {
  let component: PedidoEnvioPanelComponent;
  let fixture: ComponentFixture<PedidoEnvioPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoEnvioPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoEnvioPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
