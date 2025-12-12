import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientDto } from '../interfaces/patient.dto';
import { CommonHttpService } from './common-http.service';

@Injectable({ providedIn: 'root' })
export class PatientsService {
  private readonly baseEndpoint = '/api/patients';

  constructor(private readonly http: CommonHttpService) {}

  getPatients(): Observable<PatientDto[]> {
    return this.http.get<PatientDto[]>(this.baseEndpoint);
  }

  getPatient(id: number): Observable<PatientDto> {
    return this.http.get<PatientDto>(`${this.baseEndpoint}/${id}`);
  }

  createPatient(payload: PatientDto): Observable<PatientDto> {
    return this.http.post<PatientDto>(this.baseEndpoint, payload);
  }

  updatePatient(id: number, payload: PatientDto): Observable<void> {
    return this.http.put<void>(`${this.baseEndpoint}/${id}`, payload);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
