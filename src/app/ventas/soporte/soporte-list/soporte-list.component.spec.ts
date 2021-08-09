import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteListComponent } from './soporte-list.component';

describe('SoporteListComponent', () => {
  let component: SoporteListComponent;
  let fixture: ComponentFixture<SoporteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoporteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoporteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
