import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformacionFormComponent } from './transformacion-form.component';

describe('TransformacionFormComponent', () => {
  let component: TransformacionFormComponent;
  let fixture: ComponentFixture<TransformacionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformacionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
