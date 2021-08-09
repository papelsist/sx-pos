import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaDialogComponent } from './tarjeta-dialog.component';

describe('TarjetaDialogComponent', () => {
  let component: TarjetaDialogComponent;
  let fixture: ComponentFixture<TarjetaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
