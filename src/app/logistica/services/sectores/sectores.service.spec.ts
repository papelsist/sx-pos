import { TestBed, inject } from '@angular/core/testing';

import { SectoresService } from './sectores.service';

describe('SectoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SectoresService]
    });
  });

  it('should be created', inject([SectoresService], (service: SectoresService) => {
    expect(service).toBeTruthy();
  }));
});
