import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private baseUrl = 'http://localhost:8080/vaccines';

  constructor(private http: HttpClient, public authService: AuthService) { }

  getAllVaccines(): Observable<any[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any[]>(this.baseUrl, { headers });
  }
}
