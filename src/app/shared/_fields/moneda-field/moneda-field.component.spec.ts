import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonedaFieldComponent } from './moneda-field.component';

describe('MonedaFieldComponent', () => {
  let component: MonedaFieldComponent;
  let fixture: ComponentFixture<MonedaFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonedaFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonedaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
