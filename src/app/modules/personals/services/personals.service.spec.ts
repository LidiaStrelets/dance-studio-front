import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { PersonalsService } from '@personalsModule/services/personals.service';

describe('PersonalsService', () => {
  let service: PersonalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), HttpClientTestingModule],
    });
    service = TestBed.inject(PersonalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
