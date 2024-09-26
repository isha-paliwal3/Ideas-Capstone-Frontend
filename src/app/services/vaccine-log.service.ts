import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VaccineLogService {
  private baseUrl = `${environment.baseUrl}/vaccination-logs`;

  constructor(private http: HttpClient, public authService: AuthService) { }

  getVaccinationLogsByPatientId(patientId: number): Observable<any[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any[]>(`${ this.baseUrl } /patient/${ patientId } `, { headers });
  }

  addVaccinationLog(logData: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<any>(this.baseUrl, logData, { headers });
  }

  updateVaccinationLog(logData: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put<any>(`${ this.baseUrl }/${logData.logId}`, logData, { headers });
  }
}
