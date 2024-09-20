import { Component, OnInit } from '@angular/core';
import { ImmunizationScheduleService } from 'src/app/services/immunization-schedule.service';

@Component({
  selector: 'app-upcoming-vaccination',
  templateUrl: './upcoming-vaccination.component.html',
  styleUrls: ['./upcoming-vaccination.component.css']
})
export class UpcomingVaccinationComponent implements OnInit {
  upcomingVaccinations: any[] = [];

  constructor(private immunizationScheduleService: ImmunizationScheduleService) {}

  ngOnInit(): void {
    this.loadUpcomingVaccinations();
  }

  loadUpcomingVaccinations(): void {
    this.immunizationScheduleService.getVaccinationsDueWithin7Days().subscribe(
      (vaccinations: any[]) => {
        this.upcomingVaccinations = vaccinations;
      },
      (error) => {
        console.error('Error fetching upcoming vaccinations:', error);
      }
    );
  }
}
