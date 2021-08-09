import { TestBed, inject } from '@angular/core/testing';

import { FondoFijoService } from './fondo-fijo.service';

describe('FondoFijoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FondoFijoService]
    });
  });

  it('should be created', inject([FondoFijoService], (service: FondoFijoService) => {
    expect(service).toBeTruthy();
  }));
});
