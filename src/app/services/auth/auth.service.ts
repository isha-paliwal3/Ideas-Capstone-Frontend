import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DoctorResponse } from 'src/app/model/doctor/doctor/doctor-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/auth/login';
  public isDoctorLoggedIn: boolean;
  public isAdminLoggedIn: boolean;

  public doctorProfile: DoctorResponse;
  errorFlag: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.isDoctorLoggedIn = false;
    this.doctorProfile = new DoctorResponse();
    this.errorFlag = false;
    this.isAdminLoggedIn = false;
  }

  canActivate(): boolean {
    if (this.isDoctorLoggedIn && this.doctorProfile.jwt!==null) {
      return true;
    }
    return false;
  }

  canAdminActivate(): boolean {
    if (this.isAdminLoggedIn && this.doctorProfile.jwt!==null) {
      return true;
    }
    return false;
  }


  login(email: string, password: string) {
    this.errorFlag = false;
    this.isDoctorLoggedIn = false;
    this.isAdminLoggedIn = false;
    const loginData = { email, password };

    this.http.post<DoctorResponse>(this.loginUrl, loginData).subscribe(response => {
      if (response.doctor == null) {
        this.isAdminLoggedIn = true;
        this.router.navigate(['/adminDashboard']);
      }
      else{
        this.isDoctorLoggedIn = true;
        this.doctorProfile = response;
        this.router.navigate(['/landingPage']);
      }

    },
      err => {
        this.errorFlag = true;
        console.log('Login failed', err);
      });
  }

  logout() {
    this.isDoctorLoggedIn = false;
    this.isAdminLoggedIn = false;
    this.doctorProfile = new DoctorResponse();
  }
}
