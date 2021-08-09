import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioEspecialComponent } from './precio-especial.component';

describe('PrecioEspecialComponent', () => {
  let component: PrecioEspecialComponent;
  let fixture: ComponentFixture<PrecioEspecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecioEspecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
