import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorDto } from '../interfaces/doctor.dto';
import { CommonHttpService } from './common-http.service';

@Injectable({ providedIn: 'root' })
export class DoctorsService {
  private readonly baseEndpoint = '/api/doctors';

  constructor(private readonly http: CommonHttpService) {}

  getDoctors(): Observable<DoctorDto[]> {
    return this.http.get<DoctorDto[]>(this.baseEndpoint);
  }

  getDoctor(id: number): Observable<DoctorDto> {
    return this.http.get<DoctorDto>(`${this.baseEndpoint}/${id}`);
  }

  createDoctor(payload: DoctorDto): Observable<DoctorDto> {
    return this.http.post<DoctorDto>(this.baseEndpoint, payload);
  }

  updateDoctor(id: number, payload: DoctorDto): Observable<void> {
    return this.http.put<void>(`${this.baseEndpoint}/${id}`, payload);
  }

  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
