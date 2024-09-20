import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { VaccineLogService } from 'src/app/services/vaccine-log.service';
import { VaccineService } from 'src/app/services/vaccine.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patientId: number = 0;
  patient: any;
  vaccinationLogs: any[] = [];
  editableLog: any = null;
  originalLog: any = null; 
  editingIndex: number | null = null;
  vaccines: any[] = [];
  filteredVaccines: any[] = [];
  showDropdown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private vaccineLogService: VaccineLogService,
    private vaccineService: VaccineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.params['id'];
    this.getPatientDetails();
    this.getVaccinationLogs();
    this.loadVaccines();
  }

  getPatientDetails(): void {
    this.patientService.getPatientById(this.patientId).subscribe(
      (data) => {
        this.patient = data;
      },
      (error) => {
        console.error('Error fetching patient details', error);
      }
    );
  }

  getVaccinationLogs(): void {
    this.vaccineLogService.getVaccinationLogsByPatientId(this.patientId).subscribe(
      (data) => {
        this.vaccinationLogs = data;
      },
      (error) => {
        console.error('Error fetching vaccination logs', error);
      }
    );
  }

  loadVaccines(): void {
    this.vaccineService.getAllVaccines().subscribe(
      (data) => {
        this.vaccines = data;
        this.filteredVaccines = data;
      },
      (error) => {
        console.error('Error fetching vaccines', error);
      }
    );
  }

  calculateAgeInWeeks(dateOfBirth: string | undefined): number {
    if (!dateOfBirth) return 0;
    const dob = new Date(dateOfBirth);
    const diffInMs = Date.now() - dob.getTime();
    const ageInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));
    return ageInWeeks;
  }

  addLog(): void {
    this.router.navigate(['/addLog', this.patientId]);
  }

  editLog(index: number, log: any): void {
    this.editingIndex = index;
    this.editableLog = { ...log };
    this.originalLog = { ...log };
  }

  isEditing(index: number): boolean {
    return this.editingIndex === index;
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.editableLog = null;
    this.originalLog = null;

    this.getVaccinationLogs();
  }

  saveLog(index: number): void {
    if (this.editableLog) {
      console.log('Sending log to backend:', this.editableLog);

      this.vaccineLogService.updateVaccinationLog(this.editableLog).subscribe(
        (updatedLog) => {
          console.log('Log updated successfully:', updatedLog);
          this.vaccinationLogs[index] = updatedLog;
          this.cancelEdit();
        },
        (error) => {
          console.error('Error updating vaccination log', error);
        }
      );
    }
  }



  filterVaccineList(): void {
    const searchTerm = this.editableLog?.vaccine?.vaccineName?.toLowerCase() || '';
    if (searchTerm) {
      this.filteredVaccines = this.vaccines.filter(vaccine =>
        vaccine.vaccineName.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredVaccines = [];
    }
    this.showDropdown = this.filteredVaccines.length > 0;
  }

  selectVaccine(vaccine: any): void {
    if (this.editableLog) {
      this.editableLog.vaccine.vaccineName = vaccine.vaccineName;
      this.editableLog.vaccine.vaccineId = vaccine.vaccineId;
      this.showDropdown = false;
    }
  }
}
