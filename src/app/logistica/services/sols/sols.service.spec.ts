import { TestBed, inject } from '@angular/core/testing';

import { SolsService } from './sols.service';

describe('SolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SolsService]
    });
  });

  it('should be created', inject([SolsService], (service: SolsService) => {
    expect(service).toBeTruthy();
  }));
});
