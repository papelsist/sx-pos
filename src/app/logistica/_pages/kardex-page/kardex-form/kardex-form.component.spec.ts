import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KardexFormComponent } from './kardex-form.component';

describe('KardexFormComponent', () => {
  let component: KardexFormComponent;
  let fixture: ComponentFixture<KardexFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KardexFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KardexFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
