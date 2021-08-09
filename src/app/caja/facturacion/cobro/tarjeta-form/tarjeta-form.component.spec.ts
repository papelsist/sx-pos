import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaFormComponent } from './tarjeta-form.component';

describe('TarjetaFormComponent', () => {
  let component: TarjetaFormComponent;
  let fixture: ComponentFixture<TarjetaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
