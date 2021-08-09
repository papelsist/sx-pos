import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioParcialFormComponent } from './envio-parcial-form.component';

describe('EnvioParcialFormComponent', () => {
  let component: EnvioParcialFormComponent;
  let fixture: ComponentFixture<EnvioParcialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioParcialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioParcialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
