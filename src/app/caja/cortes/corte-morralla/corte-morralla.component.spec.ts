import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorteMorrallaComponent } from './corte-morralla.component';

describe('CorteMorrallaComponent', () => {
  let component: CorteMorrallaComponent;
  let fixture: ComponentFixture<CorteMorrallaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorteMorrallaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorteMorrallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
