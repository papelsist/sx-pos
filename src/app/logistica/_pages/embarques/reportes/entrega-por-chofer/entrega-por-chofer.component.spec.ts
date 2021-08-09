import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaPorChoferComponent } from './entrega-por-chofer.component';

describe('EntregaPorChoferComponent', () => {
  let component: EntregaPorChoferComponent;
  let fixture: ComponentFixture<EntregaPorChoferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaPorChoferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaPorChoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
