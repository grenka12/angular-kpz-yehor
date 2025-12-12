import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentDto } from '../interfaces/assignment.dto';
import { CommonHttpService } from './common-http.service';

@Injectable({ providedIn: 'root' })
export class AssignmentsService {
  private readonly baseEndpoint = '/api/assignments';

  constructor(private readonly http: CommonHttpService) {}

  getAssignments(): Observable<AssignmentDto[]> {
    return this.http.get<AssignmentDto[]>(this.baseEndpoint);
  }

  getAssignment(doctorId: number, requestId: number): Observable<AssignmentDto> {
    return this.http.get<AssignmentDto>(`${this.baseEndpoint}/doctor/${doctorId}/request/${requestId}`);
  }

  createAssignment(payload: AssignmentDto): Observable<AssignmentDto> {
    return this.http.post<AssignmentDto>(this.baseEndpoint, payload);
  }

  updateAssignment(doctorId: number, requestId: number, payload: AssignmentDto): Observable<void> {
    return this.http.put<void>(
      `${this.baseEndpoint}/doctor/${doctorId}/request/${requestId}`,
      payload
    );
  }

  deleteAssignment(doctorId: number, requestId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/doctor/${doctorId}/request/${requestId}`);
  }
}
