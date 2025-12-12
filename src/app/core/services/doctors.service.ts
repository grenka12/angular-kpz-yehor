import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorDto } from '../interfaces/doctor.dto';
import { CommonHttpService } from './common-http.service';

@Injectable({ providedIn: 'root' })
export class DoctorsService {
  constructor(private readonly http: CommonHttpService) {}

  getDoctors(): Observable<DoctorDto[]> {
    return this.http.get<DoctorDto[]>('/api/doctors');
  }

  getDoctor(id: number): Observable<DoctorDto> {
    return this.http.get<DoctorDto>(`/api/doctors/${id}`);
  }

  createDoctor(dto: DoctorDto): Observable<DoctorDto> {
    return this.http.post<DoctorDto>('/api/doctors', dto);
  }

  updateDoctor(id: number, dto: Partial<DoctorDto>): Observable<DoctorDto> {
    return this.http.put<DoctorDto>(`/api/doctors/${id}`, dto);
  }

  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`/api/doctors/${id}`);
  }
}
