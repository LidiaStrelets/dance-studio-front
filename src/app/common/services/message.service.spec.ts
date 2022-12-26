import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@authModule/services/auth.service';

import { MessageService } from '@services/message.service';

describe('MessageService', () => {
  let service: MessageService;

  const authSpy = jasmine.createSpyObj<AuthService>(['getCurrentUserId']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: authSpy }],
    });
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
