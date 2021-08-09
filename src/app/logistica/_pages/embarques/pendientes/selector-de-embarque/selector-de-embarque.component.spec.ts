import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorDeEmbarqueComponent } from './selector-de-embarque.component';

describe('SelectorDeEmbarqueComponent', () => {
  let component: SelectorDeEmbarqueComponent;
  let fixture: ComponentFixture<SelectorDeEmbarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorDeEmbarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorDeEmbarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
