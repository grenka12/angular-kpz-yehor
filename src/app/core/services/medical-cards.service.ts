import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalCardDto } from '../interfaces/medical-card.dto';
import { CommonHttpService } from './common-http.service';

@Injectable({ providedIn: 'root' })
export class MedicalCardsService {
  private readonly baseEndpoint = '/api/medical-cards';

  constructor(private readonly http: CommonHttpService) {}

  getMedicalCards(): Observable<MedicalCardDto[]> {
    return this.http.get<MedicalCardDto[]>(this.baseEndpoint);
  }

  getMedicalCard(id: number): Observable<MedicalCardDto> {
    return this.http.get<MedicalCardDto>(`${this.baseEndpoint}/${id}`);
  }

  createMedicalCard(payload: MedicalCardDto): Observable<MedicalCardDto> {
    return this.http.post<MedicalCardDto>(this.baseEndpoint, payload);
  }

  updateMedicalCard(id: number, payload: MedicalCardDto): Observable<void> {
    return this.http.put<void>(`${this.baseEndpoint}/${id}`, payload);
  }

  deleteMedicalCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
