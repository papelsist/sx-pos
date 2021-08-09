import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioFieldComponent } from './socio-field.component';

describe('SocioFieldComponent', () => {
  let component: SocioFieldComponent;
  let fixture: ComponentFixture<SocioFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocioFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocioFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
