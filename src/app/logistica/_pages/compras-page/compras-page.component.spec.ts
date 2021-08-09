import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasPageComponent } from './compras-page.component';

describe('ComprasPageComponent', () => {
  let component: ComprasPageComponent;
  let fixture: ComponentFixture<ComprasPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
