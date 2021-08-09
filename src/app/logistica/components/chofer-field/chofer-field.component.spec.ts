import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChofereFieldComponent } from './chofere-field.component';

describe('ChofereFieldComponent', () => {
  let component: ChofereFieldComponent;
  let fixture: ComponentFixture<ChofereFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChofereFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChofereFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
