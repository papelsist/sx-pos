import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobroCodComponent } from './cobro-cod.component';

describe('CobroCodComponent', () => {
  let component: CobroCodComponent;
  let fixture: ComponentFixture<CobroCodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobroCodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobroCodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
