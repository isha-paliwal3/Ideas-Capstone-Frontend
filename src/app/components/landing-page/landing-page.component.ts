import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit {
  patientCount: number = 0;
  nextVaccinationDays: number = 0;
  lowStockVaccineCount: number = 0;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.patientCount = 10;
    this.nextVaccinationDays = 3;
    this.lowStockVaccineCount = 2;
  }
}
