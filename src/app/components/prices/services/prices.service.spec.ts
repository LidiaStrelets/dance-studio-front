import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@authModule/services/auth.service';
import { PricesService } from '@pricesModule/services/prices.service';

describe('PricesService', () => {
  let service: PricesService;

  const authSpy = jasmine.createSpyObj<AuthService>(['getCurrentUserId']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authSpy }],
    });
    service = TestBed.inject(PricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
