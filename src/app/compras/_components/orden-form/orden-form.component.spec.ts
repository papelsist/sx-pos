import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenFormComponent } from './orden-form.component';

describe('OrdenFormComponent', () => {
  let component: OrdenFormComponent;
  let fixture: ComponentFixture<OrdenFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
