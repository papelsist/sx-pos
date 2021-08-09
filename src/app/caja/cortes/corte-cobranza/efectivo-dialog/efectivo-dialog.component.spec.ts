import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfectivoDialogComponent } from './efectivo-dialog.component';

describe('EfectivoDialogComponent', () => {
  let component: EfectivoDialogComponent;
  let fixture: ComponentFixture<EfectivoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfectivoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfectivoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
