import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = [];
  searchTerm: string = '';

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe(
      (data) => {
        this.patients = data.map(patient => ({
          ...patient,
          ageInDays: this.calculateAgeInDays(patient.dateOfBirth),
          ageInweeks: this.calculateAgeInWeeks(patient.dateOfBirth)
        }));
        this.filteredPatients = [...this.patients];
      },
      (error) => {
        console.error('Error loading patients', error);
      }
    );
  }

  calculateAgeInDays(dob: string): number {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const diffInTime = currentDate.getTime() - dobDate.getTime();
    return Math.floor(diffInTime / (1000 * 3600 * 24));
  }

  calculateAgeInWeeks(dateOfBirth: any): number {
    const ageInDays = this.calculateAgeInDays(dateOfBirth);
    const ageInWeeks = Math.floor(ageInDays / 7);
    return ageInWeeks;
  }

  filterPatients(): void {
    this.filteredPatients = this.patients.filter(patient =>
      patient.patientName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      patient.patientId.toString().includes(this.searchTerm)
    );
  }

  deletePatient(id: number): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe(
        () => {
          this.loadPatients();
        },
        (error) => {
          console.error('Error deleting patient', error);
        }
      );
    }
  }
}
