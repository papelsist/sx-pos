import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformacionesCreatePageComponent } from './transformaciones-create-page.component';

describe('TransformacionesCreatePageComponent', () => {
  let component: TransformacionesCreatePageComponent;
  let fixture: ComponentFixture<TransformacionesCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformacionesCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformacionesCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
