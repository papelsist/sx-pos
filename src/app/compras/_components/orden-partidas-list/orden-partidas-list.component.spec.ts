import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenPartidasListComponent } from './orden-partidas-list.component';

describe('OrdenPartidasListComponent', () => {
  let component: OrdenPartidasListComponent;
  let fixture: ComponentFixture<OrdenPartidasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenPartidasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenPartidasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
