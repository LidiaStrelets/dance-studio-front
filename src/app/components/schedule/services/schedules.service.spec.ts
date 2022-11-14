import { TestBed } from '@angular/core/testing';
import { SchedulesService } from '@schedulesModule/services/schedules.service';

describe('SchedulesService', () => {
  let service: SchedulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
