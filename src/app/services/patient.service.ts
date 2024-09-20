import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:8080/patients';

  constructor(private http: HttpClient, public authService: AuthService) { }

  addPatient(patientData: any): Observable<any> {
    const token = this.authService.doctorProfile.jwt;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl, patientData, { headers });
  }

  getPatients(): Observable<any[]> {
    const token = this.authService.doctorProfile.jwt;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  getPatientById(id: number): Observable<any> {
    const token = this.authService.doctorProfile.jwt;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }

  deletePatient(id: number): Observable<void> {
    const token = this.authService.doctorProfile.jwt;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}
