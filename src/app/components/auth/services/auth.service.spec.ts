import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from '@authModule/services/auth.service';
import { AlertService } from '@services/alert.service';

describe('AuthService', () => {
  let service: AuthService;

  const alertServiceSpy = jasmine.createSpyObj<AlertService>([
    'presentAlertUnauthorized',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AlertService, useValue: alertServiceSpy }],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
