import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorrallaListComponent } from './morralla-list.component';

describe('MorrallaListComponent', () => {
  let component: MorrallaListComponent;
  let fixture: ComponentFixture<MorrallaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorrallaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorrallaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
