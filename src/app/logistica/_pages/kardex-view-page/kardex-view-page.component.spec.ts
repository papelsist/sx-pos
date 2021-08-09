import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KardexViewPageComponent } from './kardex-view-page.component';

describe('KardexViewPageComponent', () => {
  let component: KardexViewPageComponent;
  let fixture: ComponentFixture<KardexViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KardexViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KardexViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
