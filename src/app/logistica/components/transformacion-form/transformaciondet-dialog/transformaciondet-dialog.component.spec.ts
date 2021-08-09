import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformaciondetDialogComponent } from './transformaciondet-dialog.component';

describe('TransformaciondetDialogComponent', () => {
  let component: TransformaciondetDialogComponent;
  let fixture: ComponentFixture<TransformaciondetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformaciondetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformaciondetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
