import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@authModule/services/auth.service';
import { HallService } from '@homeModule/services/hall.service';

describe('HallService', () => {
  let service: HallService;

  const authSpy = jasmine.createSpyObj<AuthService>(['getCurrentUserId']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authSpy }],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
