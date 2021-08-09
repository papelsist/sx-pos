import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DolaresFormComponent } from './dolares-form.component';

describe('DolaresFormComponent', () => {
  let component: DolaresFormComponent;
  let fixture: ComponentFixture<DolaresFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DolaresFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DolaresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
