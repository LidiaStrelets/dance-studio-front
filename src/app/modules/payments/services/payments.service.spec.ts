import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@authModule/services/auth.service';
import { PaymentsService } from '@paymentsModule/services/payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;

  const authSpy = jasmine.createSpyObj<AuthService>(['getCurrentUserId']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authSpy }],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
