import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KardexPageComponent } from './kardex-page.component';

describe('KardexPageComponent', () => {
  let component: KardexPageComponent;
  let fixture: ComponentFixture<KardexPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KardexPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KardexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
