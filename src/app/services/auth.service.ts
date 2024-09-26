import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DoctorResponse } from '../model/doctor/doctor-response';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = `${environment.baseUrl}/auth/login`; 
  public isDoctorLoggedIn: boolean;
  public isAdminLoggedIn: boolean;
  public doctorProfile: DoctorResponse;
  errorFlag: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.isDoctorLoggedIn = false;
    this.doctorProfile = new DoctorResponse();
    this.errorFlag = false;
    this.isAdminLoggedIn = false;

    const storedJwt = localStorage.getItem('jwt');
    if (storedJwt) {
      this.isDoctorLoggedIn = true;
      this.doctorProfile.jwt = storedJwt;
      this.isAdminLoggedIn = this.doctorProfile.doctor == null;
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.doctorProfile.jwt;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  canActivate(): boolean {
    const storedJwt = localStorage.getItem('jwt');
    return this.isDoctorLoggedIn && !!storedJwt;
  }

  canAdminActivate(): boolean {
    const storedJwt = localStorage.getItem('jwt');
    return this.isAdminLoggedIn && !!storedJwt;
  }

  getLoggedInUser(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${environment.baseUrl}/doctors`, { headers }).pipe(
      map(response => ({ data: response })),
      catchError(error => {
        this.router.navigateByUrl("/login");
        return throwError(error);
      })
    );
  }

  login(email: string, password: string) {
    this.errorFlag = false;
    this.isDoctorLoggedIn = false;
    this.isAdminLoggedIn = false;

    // Encrypt password using Base64
    const encryptedPassword = btoa(password);
    const loginData = { email, password: encryptedPassword };

    this.http.post<DoctorResponse>(this.loginUrl, loginData).subscribe(response => {
      if (response.doctor == null) {
        this.isAdminLoggedIn = true;
        console.log('Admin login successful', response);
        localStorage.setItem('jwt', response.jwt);
        this.router.navigate(['/adminDashboard']);
      } else {
        this.isDoctorLoggedIn = true;
        this.doctorProfile = response;
        localStorage.setItem('jwt', response.jwt);
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
    localStorage.removeItem('jwt');
    localStorage.removeItem('doctor');
    this.router.navigate(['/login']);
  }
}
