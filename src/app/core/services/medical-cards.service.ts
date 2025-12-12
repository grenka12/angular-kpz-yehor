import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalCardDto } from '../interfaces/medical-card.dto';
import { CommonHttpService } from './common-http.service';

@Injectable({ providedIn: 'root' })
export class MedicalCardsService {
  constructor(private readonly http: CommonHttpService) {}

  getMedicalCards(): Observable<MedicalCardDto[]> {
    return this.http.get<MedicalCardDto[]>('/api/medical-cards');
  }

  getMedicalCard(id: number): Observable<MedicalCardDto> {
    return this.http.get<MedicalCardDto>(`/api/medical-cards/${id}`);
  }

  createMedicalCard(dto: MedicalCardDto): Observable<MedicalCardDto> {
    return this.http.post<MedicalCardDto>('/api/medical-cards', dto);
  }

  updateMedicalCard(id: number, dto: Partial<MedicalCardDto>): Observable<MedicalCardDto> {
    return this.http.put<MedicalCardDto>(`/api/medical-cards/${id}`, dto);
  }

  deleteMedicalCard(id: number): Observable<void> {
    return this.http.delete<void>(`/api/medical-cards/${id}`);
  }
}
