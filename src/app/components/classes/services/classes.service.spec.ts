import { TestBed } from '@angular/core/testing';

import { ClassesService } from '@classesModule/services/classes.service';

describe('ClassesService', () => {
  let service: ClassesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
