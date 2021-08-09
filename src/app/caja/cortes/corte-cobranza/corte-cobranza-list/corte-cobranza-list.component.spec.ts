import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteCobranzaListComponent } from './corte-cobranza-list.component';

describe('CorteCobranzaListComponent', () => {
  let component: CorteCobranzaListComponent;
  let fixture: ComponentFixture<CorteCobranzaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorteCobranzaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorteCobranzaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
