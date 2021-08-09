import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdSelectorComponent } from './prod-selector.component';

describe('ProdSelectorComponent', () => {
  let component: ProdSelectorComponent;
  let fixture: ComponentFixture<ProdSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
