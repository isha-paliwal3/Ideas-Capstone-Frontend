import { Component, OnInit } from '@angular/core';
import { VaccineService } from 'src/app/services/vaccine.service';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.css']
})

export class VaccinesComponent implements OnInit {
  vaccines: any[] = [];
  filteredVaccines: any[] = [];
  searchTerm: string = '';

  constructor(private vaccineService: VaccineService) {}

  ngOnInit(): void {
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

  filterVaccines(): void {
    this.filteredVaccines = this.vaccines.filter(vaccine =>
      vaccine.vaccineName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
