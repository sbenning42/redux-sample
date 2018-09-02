import { TestBed, inject } from '@angular/core/testing';

import { PrincipeService } from './principe.service';

describe('PrincipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrincipeService]
    });
  });

  it('should be created', inject([PrincipeService], (service: PrincipeService) => {
    expect(service).toBeTruthy();
  }));
});
