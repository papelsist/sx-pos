import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceladasPageComponent } from './canceladas-page.component';

describe('CanceladasPageComponent', () => {
  let component: CanceladasPageComponent;
  let fixture: ComponentFixture<CanceladasPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceladasPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceladasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
