import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasladosPageComponent } from './traslados-page.component';

describe('TrasladosPageComponent', () => {
  let component: TrasladosPageComponent;
  let fixture: ComponentFixture<TrasladosPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrasladosPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasladosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
