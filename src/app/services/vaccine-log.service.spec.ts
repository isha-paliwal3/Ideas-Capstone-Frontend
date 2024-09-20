import { TestBed } from '@angular/core/testing';

import { VaccineLogService } from './vaccine-log.service';

describe('VaccineLogService', () => {
  let service: VaccineLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
