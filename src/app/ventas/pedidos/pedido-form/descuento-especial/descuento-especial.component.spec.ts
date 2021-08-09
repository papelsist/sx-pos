import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentoEspecialComponent } from './descuento-especial.component';

describe('DescuentoEspecialComponent', () => {
  let component: DescuentoEspecialComponent;
  let fixture: ComponentFixture<DescuentoEspecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescuentoEspecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescuentoEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
