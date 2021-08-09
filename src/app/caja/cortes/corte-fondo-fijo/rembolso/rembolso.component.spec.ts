import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RembolsoComponent } from './rembolso.component';

describe('RembolsoComponent', () => {
  let component: RembolsoComponent;
  let fixture: ComponentFixture<RembolsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RembolsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RembolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
