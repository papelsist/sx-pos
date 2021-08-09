import { TestBed, inject } from '@angular/core/testing';

import { ExistenciasService } from './existencias.service';

describe('ExistenciasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExistenciasService]
    });
  });

  it('should be created', inject([ExistenciasService], (service: ExistenciasService) => {
    expect(service).toBeTruthy();
  }));
});
