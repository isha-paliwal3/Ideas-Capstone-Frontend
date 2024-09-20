import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
  patient = {
    patientName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    address: ''
  };

  constructor(private patientService: PatientService, private router: Router) {}

  savePatient(): void {
    this.patientService.addPatient(this.patient).subscribe(
      (response) => {
        console.log('Patient saved successfully', response);
        this.router.navigate(['/patients']);
      },
      (error) => {
        console.error('Error saving patient', error);
      }
    );
  }
}
