import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnticipoFormComponent } from './anticipo-form.component';

describe('AnticipoFormComponent', () => {
  let component: AnticipoFormComponent;
  let fixture: ComponentFixture<AnticipoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnticipoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnticipoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
