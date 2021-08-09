import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorrallaDialogComponent } from './morralla-dialog.component';

describe('MorrallaDialogComponent', () => {
  let component: MorrallaDialogComponent;
  let fixture: ComponentFixture<MorrallaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorrallaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorrallaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
