import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenesFieldComponent } from './almacenes-field.component';

describe('AlmacenesFieldComponent', () => {
  let component: AlmacenesFieldComponent;
  let fixture: ComponentFixture<AlmacenesFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenesFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenesFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
