import { TestBed, inject } from '@angular/core/testing';

import { DecsService } from './decs.service';

describe('DecsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecsService]
    });
  });

  it('should be created', inject([DecsService], (service: DecsService) => {
    expect(service).toBeTruthy();
  }));
});
