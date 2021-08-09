import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdFieldComponent } from './prod-field.component';

describe('ProdFieldComponent', () => {
  let component: ProdFieldComponent;
  let fixture: ComponentFixture<ProdFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
