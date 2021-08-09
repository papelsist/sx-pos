import { TestBed, inject } from '@angular/core/testing';

import { FacturistasService } from './facturistas.service';

describe('FacturistasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacturistasService]
    });
  });

  it('should be created', inject([FacturistasService], (service: FacturistasService) => {
    expect(service).toBeTruthy();
  }));
});
