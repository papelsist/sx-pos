import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioDireccionComponent } from './envio-direccion.component';

describe('EnvioDireccionComponent', () => {
  let component: EnvioDireccionComponent;
  let fixture: ComponentFixture<EnvioDireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioDireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
