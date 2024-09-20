import { Component, OnInit } from '@angular/core';
import { ImmunizationScheduleService } from 'src/app/services/immunization-schedule.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {
  Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, PieController, ArcElement, Legend
} from 'chart.js';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  patientCount: number = 0;
  nextVaccinationDays: number = 0;
  upcomingVaccinations: any[] = [];
  vaccinationChart: any;
  vaccineTypeChart: any;

  constructor(
    private immunizationScheduleService: ImmunizationScheduleService,
    public authService: AuthService,
    private router: Router
  ) {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, PieController, ArcElement, Legend);
  }

  ngOnInit(): void {
    this.loadUpcomingVaccinationsCount();
    this.loadNextVaccinationSchedule();
  }

  loadUpcomingVaccinationsCount(): void {
    this.immunizationScheduleService.getUpcomingVaccinationCount().subscribe(
      (count: number) => {
        this.patientCount = count;
      },
      (error) => {
        console.error('Error fetching upcoming vaccinations count:', error);
      }
    );
  }

  loadNextVaccinationSchedule(): void {
    this.immunizationScheduleService.getVaccinationsDueWithin7Days().subscribe(
      (vaccinations: any[]) => {
        this.upcomingVaccinations = vaccinations;
        this.createVaccinationChart();
        this.createVaccineTypeChart();
      },
      (error) => {
        console.error('Error fetching upcoming vaccinations:', error);
      }
    );
  }

  createVaccinationChart(): void {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const patientsPerDay = new Array(7).fill(0);

    this.upcomingVaccinations.forEach(vaccination => {
      const nextDueDate = new Date(vaccination.nextDueDate);
      const dayOfWeek = nextDueDate.getDay();
      patientsPerDay[dayOfWeek] += 1;
    });

    const ctx = document.getElementById('vaccinationChart') as HTMLCanvasElement;
    this.vaccinationChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: weekDays,
        datasets: [{
          label: 'Number of Patients Due for Vaccination',
          data: patientsPerDay,
          backgroundColor: 'rgba(81, 66, 217, 0.2)',
          borderColor: '#5142d9',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 1
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  createVaccineTypeChart(): void {
    const vaccineTypeCount = this.upcomingVaccinations.reduce((acc, vaccination) => {
      const vaccineName = vaccination.vaccineName;
      acc[vaccineName] = (acc[vaccineName] || 0) + 1;
      return acc;
    }, {});

    const vaccineLabels = Object.keys(vaccineTypeCount);
    const vaccineData = Object.values(vaccineTypeCount);

    const ctx = document.getElementById('vaccineTypeChart') as HTMLCanvasElement;
    this.vaccineTypeChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: vaccineLabels,
        datasets: [{
          label: 'Vaccines Due by Type',
          data: vaccineData,
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }


}
