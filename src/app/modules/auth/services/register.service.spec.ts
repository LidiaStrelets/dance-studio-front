import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BeService } from '@authModule/services/register.service';

describe('BeService', () => {
  let service: BeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
