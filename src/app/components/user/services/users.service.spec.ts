import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@authModule/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { UsersService } from '@userModule/services/users.service';

describe('UsersService', () => {
  let service: UsersService;

  const authSpy = jasmine.createSpyObj<AuthService>(['getCurrentUserId']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [{ provide: AuthService, useValue: authSpy }],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
