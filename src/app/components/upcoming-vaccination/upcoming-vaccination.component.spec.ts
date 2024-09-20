import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingVaccinationComponent } from './upcoming-vaccination.component';

describe('UpcomingVaccinationComponent', () => {
  let component: UpcomingVaccinationComponent;
  let fixture: ComponentFixture<UpcomingVaccinationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingVaccinationComponent]
    });
    fixture = TestBed.createComponent(UpcomingVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
