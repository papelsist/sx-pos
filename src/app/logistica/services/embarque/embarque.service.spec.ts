import { TestBed, inject } from '@angular/core/testing';

import { EmbarqueService } from './embarque.service';

describe('EmbarqueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmbarqueService]
    });
  });

  it('should be created', inject([EmbarqueService], (service: EmbarqueService) => {
    expect(service).toBeTruthy();
  }));
});
