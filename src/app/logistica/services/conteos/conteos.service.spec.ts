import { TestBed, inject } from '@angular/core/testing';

import { ConteosService } from './conteos.service';

describe('ConteosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConteosService]
    });
  });

  it('should be created', inject([ConteosService], (service: ConteosService) => {
    expect(service).toBeTruthy();
  }));
});
