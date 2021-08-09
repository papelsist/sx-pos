import { TestBed, inject } from '@angular/core/testing';

import { PedidoDolaresFormServiceService } from './pedido-dolares-form-service.service';

describe('PedidoDolaresFormServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PedidoDolaresFormServiceService]
    });
  });

  it('should be created', inject([PedidoDolaresFormServiceService], (service: PedidoDolaresFormServiceService) => {
    expect(service).toBeTruthy();
  }));
});
