import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionValeComponent } from './configuracion-vale.component';

describe('ConfiguracionValeComponent', () => {
  let component: ConfiguracionValeComponent;
  let fixture: ComponentFixture<ConfiguracionValeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionValeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
