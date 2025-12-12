import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestDto } from '../interfaces/request.dto';
import { CommonHttpService } from './common-http.service';

@Injectable({ providedIn: 'root' })
export class RequestsService {
  constructor(private readonly http: CommonHttpService) {}

  getRequests(): Observable<RequestDto[]> {
    return this.http.get<RequestDto[]>('/api/requests');
  }

  getRequest(id: number): Observable<RequestDto> {
    return this.http.get<RequestDto>(`/api/requests/${id}`);
  }

  createRequest(dto: RequestDto): Observable<RequestDto> {
    return this.http.post<RequestDto>('/api/requests', dto);
  }

  updateRequest(id: number, dto: Partial<RequestDto>): Observable<RequestDto> {
    return this.http.put<RequestDto>(`/api/requests/${id}`, dto);
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`/api/requests/${id}`);
  }
}
