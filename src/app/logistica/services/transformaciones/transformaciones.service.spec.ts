import { TestBed, inject } from '@angular/core/testing';

import { TransformacionesService } from './transformaciones.service';

describe('TransformacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransformacionesService]
    });
  });

  it('should be created', inject([TransformacionesService], (service: TransformacionesService) => {
    expect(service).toBeTruthy();
  }));
});
