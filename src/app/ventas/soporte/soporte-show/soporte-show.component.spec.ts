import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteShowComponent } from './soporte-show.component';

describe('SoporteShowComponent', () => {
  let component: SoporteShowComponent;
  let fixture: ComponentFixture<SoporteShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoporteShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoporteShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
