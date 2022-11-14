import { TestBed } from '@angular/core/testing';
import { PricesService } from '@pricesModule/services/prices.service';

describe('PricesService', () => {
  let service: PricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
