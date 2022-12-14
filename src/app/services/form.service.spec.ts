import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormService } from '@services/form.service';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    });
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
