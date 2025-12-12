import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientDto } from '../interfaces/patient.dto';
import { CommonHttpService } from './common-http.service';

@Injectable({ providedIn: 'root' })
export class PatientsService {
  constructor(private readonly http: CommonHttpService) {}

  getPatients(): Observable<PatientDto[]> {
    return this.http.get<PatientDto[]>('/api/patients');
  }

  getPatient(id: number): Observable<PatientDto> {
    return this.http.get<PatientDto>(`/api/patients/${id}`);
  }

  createPatient(dto: PatientDto): Observable<PatientDto> {
    return this.http.post<PatientDto>('/api/patients', dto);
  }

  updatePatient(id: number, dto: Partial<PatientDto>): Observable<PatientDto> {
    return this.http.put<PatientDto>(`/api/patients/${id}`, dto);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`/api/patients/${id}`);
  }
}
