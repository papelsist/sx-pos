import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFieldComponent } from './cliente-field.component';

describe('ClienteFieldComponent', () => {
  let component: ClienteFieldComponent;
  let fixture: ComponentFixture<ClienteFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
