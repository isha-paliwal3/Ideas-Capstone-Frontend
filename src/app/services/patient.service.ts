import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = `${environment.baseUrl}/patients`;

  constructor(private http: HttpClient, public authService: AuthService) { }

  addPatient(patientData: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post(this.baseUrl, patientData, { headers });
  }

  getPatients(): Observable<any[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  getPatientById(id: number): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }

  deletePatient(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers });
  }
}
