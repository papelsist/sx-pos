import { TestBed, inject } from '@angular/core/testing';

import { PuestosService } from './puestos.service';

describe('PuestosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuestosService]
    });
  });

  it('should be created', inject([PuestosService], (service: PuestosService) => {
    expect(service).toBeTruthy();
  }));
});
