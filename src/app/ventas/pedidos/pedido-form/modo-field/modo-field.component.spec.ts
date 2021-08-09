import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModoFieldComponent } from './modo-field.component';

describe('ModoFieldComponent', () => {
  let component: ModoFieldComponent;
  let fixture: ComponentFixture<ModoFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModoFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModoFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
