import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmunizationScheduleComponent } from './immunization-schedule.component';

describe('ImmunizationScheduleComponent', () => {
  let component: ImmunizationScheduleComponent;
  let fixture: ComponentFixture<ImmunizationScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImmunizationScheduleComponent]
    });
    fixture = TestBed.createComponent(ImmunizationScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
