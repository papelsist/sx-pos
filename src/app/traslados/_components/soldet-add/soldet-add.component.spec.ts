import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldetAddComponent } from './soldet-add.component';

describe('SoldetAddComponent', () => {
  let component: SoldetAddComponent;
  let fixture: ComponentFixture<SoldetAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldetAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
