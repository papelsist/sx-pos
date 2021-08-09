import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformacionPartidasListComponent } from './transformacion-partidas-list.component';

describe('TransformacionPartidasListComponent', () => {
  let component: TransformacionPartidasListComponent;
  let fixture: ComponentFixture<TransformacionPartidasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformacionPartidasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformacionPartidasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
