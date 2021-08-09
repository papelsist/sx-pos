import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudEditComponent } from './solicitud-edit.component';

describe('SolicitudEditComponent', () => {
  let component: SolicitudEditComponent;
  let fixture: ComponentFixture<SolicitudEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
