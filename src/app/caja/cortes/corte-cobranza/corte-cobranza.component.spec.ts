import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteCobranzaComponent } from './corte-cobranza.component';

describe('CorteCobranzaComponent', () => {
  let component: CorteCobranzaComponent;
  let fixture: ComponentFixture<CorteCobranzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorteCobranzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorteCobranzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
