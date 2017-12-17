import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCreateComponent } from './solicitud-create.component';

describe('SolicitudCreateComponent', () => {
  let component: SolicitudCreateComponent;
  let fixture: ComponentFixture<SolicitudCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
