import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorService } from '@services/error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TranslateModule.forRoot()] });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
