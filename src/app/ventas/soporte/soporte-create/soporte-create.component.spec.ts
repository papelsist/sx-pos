import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteCreateComponent } from './soporte-create.component';

describe('SoporteCreateComponent', () => {
  let component: SoporteCreateComponent;
  let fixture: ComponentFixture<SoporteCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoporteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoporteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
