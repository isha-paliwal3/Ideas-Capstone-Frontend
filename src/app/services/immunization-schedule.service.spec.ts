import { TestBed } from '@angular/core/testing';

import { ImmunizationScheduleService } from './immunization-schedule.service';

describe('ImmunizationScheduleService', () => {
  let service: ImmunizationScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImmunizationScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
