import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes, Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthService } from './services/auth/auth.service';
import { VaccinesComponent } from './components/vaccines/vaccines.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

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
  { path: 'schedule', component: ScheduleComponent, canActivate: [guard] },
  { path: 'profile', component: ProfileComponent, canActivate: [guard] },
  { path: '**', redirectTo: '/landingPage' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
