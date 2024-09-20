import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes, Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthService } from './services/auth.service';
import { VaccinesComponent } from './components/vaccines/vaccines.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { ImmunizationScheduleComponent } from './components/immunization-schedule/immunization-schedule.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { AddLogComponent } from './components/add-log/add-log.component';
import { UpcomingVaccinationComponent } from './components/upcoming-vaccination/upcoming-vaccination.component';

export const guard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthService).canActivate()
};
export const adminGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthService).canAdminActivate()
};
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'landingPage', component: LandingPageComponent, canActivate: [guard] },
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'vaccines', component: VaccinesComponent, canActivate: [guard] },
  { path: 'patients', component: PatientsComponent, canActivate: [guard] },
  { path: 'schedule', component: ImmunizationScheduleComponent, canActivate: [guard] },
  { path: 'profile', component: ProfileComponent, canActivate: [guard] },
  { path: 'addpatients', component: AddPatientComponent, canActivate: [guard] },
  { path: 'patients/:id', component: PatientDetailComponent, canActivate: [guard] },
  { path: 'addLog/:id', component: AddLogComponent, canActivate: [guard] },
  { path: 'upcomingVaccinations', component: UpcomingVaccinationComponent, canActivate: [guard] },
  { path: '**', redirectTo: '/landingPage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
