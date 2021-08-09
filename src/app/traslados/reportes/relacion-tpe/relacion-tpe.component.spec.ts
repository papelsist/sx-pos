import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionTpeComponent } from './relacion-tpe.component';

describe('RelacionTpeComponent', () => {
  let component: RelacionTpeComponent;
  let fixture: ComponentFixture<RelacionTpeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionTpeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionTpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
