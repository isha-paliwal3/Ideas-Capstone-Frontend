import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VaccineLogService } from 'src/app/services/vaccine-log.service';
import { VaccineService } from 'src/app/services/vaccine.service';

@Component({
  selector: 'app-add-log',
  templateUrl: './add-log.component.html',
  styleUrls: ['./add-log.component.css']
})
export class AddLogComponent implements OnInit {
  vaccinationLogForm: FormGroup;
  vaccines: any[] = [];
  filteredVaccines: any[] = [];
  showDropdown: boolean = false;
  patientId: number = 0;
  doctorId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private vaccineLogService: VaccineLogService,
    private vaccineService: VaccineService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const today = new Date().toISOString().split('T')[0];
    this.vaccinationLogForm = this.formBuilder.group({
      doseNumber: ['', Validators.required],
      vaccinationDate: [today, Validators.required],
      nextDueDate: [''],
      vaccinationStatus: ['', Validators.required],
      vaccineName: ['', Validators.required],
      vaccineId: ['']
    });
  }

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    this.doctorId = this.authService.doctorProfile.doctor.doctorId
    this.loadVaccines();
  }

  loadVaccines(): void {
    this.vaccineService.getAllVaccines().subscribe(
      (data) => {
        this.vaccines = data;
        this.filteredVaccines = this.vaccines;
      },
      (error) => {
        console.error('Error fetching vaccines', error);
      }
    );
  }

  filterVaccineList(): void {
    const searchTerm = this.vaccinationLogForm.get('vaccineName')?.value.toLowerCase();
    this.filteredVaccines = this.vaccines.filter(vaccine => vaccine.vaccineName.toLowerCase().includes(searchTerm));
    this.showDropdown = true;
  }

  selectVaccine(vaccine: any): void {
    this.vaccinationLogForm.patchValue({
      vaccineName: vaccine.vaccineName,
      vaccineId: vaccine.vaccineId
    });
    this.showDropdown = false;
  }


  onSubmit(): void {
    if (this.vaccinationLogForm.valid) {

      const newLog = {
        ...this.vaccinationLogForm.value,
        patientId: this.patientId,
        doctorId: this.authService.doctorProfile.doctor.doctorId
      };

      this.vaccineLogService.addVaccinationLog(newLog).subscribe(
        (response) => {
          console.log('Vaccination log added successfully:', response);
          this.router.navigate(['/patients', this.patientId]);
        },
        (error) => {
          if (error.status === 201) {
            console.log('Vaccination log added successfully:', error);
            this.router.navigate(['/patients', this.patientId]);
          } else {
            console.error('Error adding vaccination log:', error);
          }
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/patients', this.patientId]);
  }
}
