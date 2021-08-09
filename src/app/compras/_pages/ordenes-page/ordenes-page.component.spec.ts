import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesPageComponent } from './ordenes-page.component';

describe('OrdenesPageComponent', () => {
  let component: OrdenesPageComponent;
  let fixture: ComponentFixture<OrdenesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
