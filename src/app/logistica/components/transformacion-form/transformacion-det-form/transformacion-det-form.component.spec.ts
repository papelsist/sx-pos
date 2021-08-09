import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformacionDetFormComponent } from './transformacion-det-form.component';

describe('TransformacionDetFormComponent', () => {
  let component: TransformacionDetFormComponent;
  let fixture: ComponentFixture<TransformacionDetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformacionDetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformacionDetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
