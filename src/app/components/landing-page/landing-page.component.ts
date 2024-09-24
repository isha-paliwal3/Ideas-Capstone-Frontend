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
  upcomingVaccinations: any[] = [];
  vaccinationChart: any;
  vaccineTypeChart: any;

  constructor(
    private immunizationScheduleService: ImmunizationScheduleService,
    public authService: AuthService,
    private router: Router
  ) {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip);
  }

  ngOnInit(): void {
    this.loadUpcomingVaccinationsCount();
    this.loadNextVaccinationSchedule();
  }

  loadUpcomingVaccinationsCount(): void {
    this.immunizationScheduleService.getVaccinationsDueWithin7Days().subscribe(
      (vaccinations: any[]) => {
        // Using a Set to store unique patient names
        const uniquePatients = new Set<string>();

        vaccinations.forEach(vaccination => {
          const patientName = vaccination.patientName;  // Assuming vaccination has patientName field
          uniquePatients.add(patientName);  // Only unique names will be stored in the Set
        });

        // Update patientCount with the size of the Set (unique patients)
        this.patientCount = uniquePatients.size;
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
        this.createVaccinationChart();  // Vaccination schedule bar chart
        this.createVaccineTypeChart();  // Vaccine types horizontal bar chart
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
    if (this.vaccinationChart) {
      this.vaccinationChart.destroy();  // Destroy previous chart instance if necessary
    }

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
            max: 10,  // Maximum value on the y-axis
            ticks: {
              stepSize: 2  // Display steps of 2: 0, 2, 4, 6, 8, 10
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
    if (this.vaccineTypeChart) {
      this.vaccineTypeChart.destroy();
    }

    this.vaccineTypeChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: vaccineLabels,
        datasets: [{
          label: 'Quantity Required',
          data: vaccineData,
          backgroundColor: 'rgba(81, 66, 217, 0.6)',
          borderColor: '#5142d9',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 20,
            ticks: {
              stepSize: 2,
              color: '#fff'
            }
          },
          y: {
            ticks: {
              color: '#fff'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Vaccines Due by Type (Quantity)',
            font: {
              size: 18
            },
            color: '#f0f0f0'
          },
          legend: {
            labels: {
              color: '#fff'
            }
          }
        }
      }
    });
  }

}
