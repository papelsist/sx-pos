import { TestBed, inject } from '@angular/core/testing';

import { MorrallaService } from './morralla.service';

describe('MorrallaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MorrallaService]
    });
  });

  it('should be created', inject([MorrallaService], (service: MorrallaService) => {
    expect(service).toBeTruthy();
  }));
});
