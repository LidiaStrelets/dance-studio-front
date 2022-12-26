import { TestBed } from '@angular/core/testing';

import { AuthGuard } from '@authModule/guards/auth.guard';
import { AuthService } from '@authModule/services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  const authServiceSpy = jasmine.createSpyObj<AuthService>(['isAuthenticated']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
