import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDolaresEditComponent } from './pedido-dolares-edit.component';

describe('PedidoDolaresEditComponent', () => {
  let component: PedidoDolaresEditComponent;
  let fixture: ComponentFixture<PedidoDolaresEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDolaresEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDolaresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
