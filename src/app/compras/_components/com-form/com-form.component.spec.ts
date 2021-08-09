import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComFormComponent } from './com-form.component';

describe('ComFormComponent', () => {
  let component: ComFormComponent;
  let fixture: ComponentFixture<ComFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
