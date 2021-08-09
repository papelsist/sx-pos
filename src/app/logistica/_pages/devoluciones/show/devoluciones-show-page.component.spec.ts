import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionesShowPageComponent } from './devoluciones-show-page.component';

describe('DevolucionesShowPageComponent', () => {
  let component: DevolucionesShowPageComponent;
  let fixture: ComponentFixture<DevolucionesShowPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolucionesShowPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionesShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
