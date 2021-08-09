import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsoCfdiComponent } from './uso-cfdi.component';

describe('UsoCfdiComponent', () => {
  let component: UsoCfdiComponent;
  let fixture: ComponentFixture<UsoCfdiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsoCfdiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsoCfdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
