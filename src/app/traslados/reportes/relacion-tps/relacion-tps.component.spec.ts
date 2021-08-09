import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionTpsComponent } from './relacion-tps.component';

describe('RelacionTpsComponent', () => {
  let component: RelacionTpsComponent;
  let fixture: ComponentFixture<RelacionTpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionTpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionTpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
