import { TestBed, inject } from '@angular/core/testing';

import { ChoferesService } from './choferes.service';

describe('ChoferesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChoferesService]
    });
  });

  it('should be created', inject([ChoferesService], (service: ChoferesService) => {
    expect(service).toBeTruthy();
  }));
});
