import { TestBed, inject } from '@angular/core/testing';

import { AddNewClienteService } from './add-new-cliente.service';

describe('AddNewClienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNewClienteService]
    });
  });

  it('should be created', inject([AddNewClienteService], (service: AddNewClienteService) => {
    expect(service).toBeTruthy();
  }));
});
