import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompradorFieldComponent } from './comprador-field.component';

describe('CompradorFieldComponent', () => {
  let component: CompradorFieldComponent;
  let fixture: ComponentFixture<CompradorFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompradorFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompradorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
