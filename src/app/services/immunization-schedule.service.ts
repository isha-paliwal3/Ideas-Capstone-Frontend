import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImmunizationScheduleService {

  private baseUrl = 'http://localhost:8080/immunization-schedules';

  constructor(private http: HttpClient, public authService: AuthService) { }

  getUpcomingVaccinationCount(): Observable<number> {
    const token = this.authService.doctorProfile.jwt;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/count-upcoming`;

    return this.http.get<number>(url, { headers });
  }

  getImmunizationSchedule(): Observable<any[]> {
    const token = this.authService.doctorProfile.jwt;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  getScheduleForVaccine(vaccineId: number): Observable<any> {
    const token = this.authService.doctorProfile.jwt;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/vaccine/${vaccineId}`;

    return this.http.get<any>(url, { headers });
  }

  getVaccinationsDueWithin7Days(): Observable<any[]> {
    const token = this.authService.doctorProfile.jwt;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/upcoming`;

    return this.http.get<any[]>(url, { headers });
  }
}
