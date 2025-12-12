import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestDto } from '../interfaces/request.dto';
import { CommonHttpService } from './common-http.service';

@Injectable({ providedIn: 'root' })
export class RequestsService {
  private readonly baseEndpoint = '/api/requests';

  constructor(private readonly http: CommonHttpService) {}

  getRequests(): Observable<RequestDto[]> {
    return this.http.get<RequestDto[]>(this.baseEndpoint);
  }

  getRequest(id: number): Observable<RequestDto> {
    return this.http.get<RequestDto>(`${this.baseEndpoint}/${id}`);
  }

  createRequest(payload: RequestDto): Observable<RequestDto> {
    return this.http.post<RequestDto>(this.baseEndpoint, payload);
  }

  updateRequest(id: number, payload: RequestDto): Observable<void> {
    return this.http.put<void>(`${this.baseEndpoint}/${id}`, payload);
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
