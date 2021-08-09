import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteFormComponent } from './soporte-form.component';

describe('SoporteFormComponent', () => {
  let component: SoporteFormComponent;
  let fixture: ComponentFixture<SoporteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoporteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoporteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
