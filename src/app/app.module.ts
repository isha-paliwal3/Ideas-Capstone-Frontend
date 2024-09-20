import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VaccinesComponent } from './components/vaccines/vaccines.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ImmunizationScheduleComponent } from './components/immunization-schedule/immunization-schedule.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { AddLogComponent } from './components/add-log/add-log.component';
import { UpcomingVaccinationComponent } from './components/upcoming-vaccination/upcoming-vaccination.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomePageComponent,
    FooterComponent,
    PatientsComponent,
    ProfileComponent,
    VaccinesComponent,
    AdminDashboardComponent,
    AddPatientComponent,
    LandingPageComponent,
    ImmunizationScheduleComponent,
    PatientDetailComponent,
    AddLogComponent,
    UpcomingVaccinationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
