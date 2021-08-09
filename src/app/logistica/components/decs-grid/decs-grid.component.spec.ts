import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecsGridComponent } from './decs-grid.component';

describe('DecsGridComponent', () => {
  let component: DecsGridComponent;
  let fixture: ComponentFixture<DecsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
