import { TestBed, inject } from '@angular/core/testing';

import { TransportesService } from './transportes.service';

describe('TransportesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportesService]
    });
  });

  it('should be created', inject([TransportesService], (service: TransportesService) => {
    expect(service).toBeTruthy();
  }));
});
