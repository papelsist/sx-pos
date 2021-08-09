import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFieldComponent } from './producto-field.component';

describe('ProductoFieldComponent', () => {
  let component: ProductoFieldComponent;
  let fixture: ComponentFixture<ProductoFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
