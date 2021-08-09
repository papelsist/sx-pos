import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDashboardComponent } from './cliente-dashboard.component';

describe('ClienteDashboardComponent', () => {
  let component: ClienteDashboardComponent;
  let fixture: ComponentFixture<ClienteDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
