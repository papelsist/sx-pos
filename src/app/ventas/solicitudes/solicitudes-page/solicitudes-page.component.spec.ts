import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesPageComponent } from './solicitudes-page.component';

describe('SolicitudesPageComponent', () => {
  let component: SolicitudesPageComponent;
  let fixture: ComponentFixture<SolicitudesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
