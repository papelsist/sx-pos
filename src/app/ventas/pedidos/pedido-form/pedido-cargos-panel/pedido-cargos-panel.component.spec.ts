import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCargosPanelComponent } from './pedido-cargos-panel.component';

describe('PedidoCargosPanelComponent', () => {
  let component: PedidoCargosPanelComponent;
  let fixture: ComponentFixture<PedidoCargosPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoCargosPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCargosPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
