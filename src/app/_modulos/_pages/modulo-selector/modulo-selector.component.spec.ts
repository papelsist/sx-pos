import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloSelectorComponent } from './modulo-selector.component';

describe('ModuloSelectorComponent', () => {
  let component: ModuloSelectorComponent;
  let fixture: ComponentFixture<ModuloSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
