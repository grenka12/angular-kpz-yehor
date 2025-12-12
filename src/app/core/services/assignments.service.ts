import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentDto } from '../interfaces/assignment.dto';
import { CommonHttpService } from './common-http.service';

@Injectable({ providedIn: 'root' })
export class AssignmentsService {
  constructor(private readonly http: CommonHttpService) {}

  getAssignments(): Observable<AssignmentDto[]> {
    return this.http.get<AssignmentDto[]>('/api/assignments');
  }

  getAssignment(doctorId: number, requestId: number): Observable<AssignmentDto> {
    return this.http.get<AssignmentDto>(`/api/assignments/doctor/${doctorId}/request/${requestId}`);
  }

  createAssignment(dto: AssignmentDto): Observable<AssignmentDto> {
    return this.http.post<AssignmentDto>('/api/assignments', dto);
  }

  updateAssignment(doctorId: number, requestId: number, dto: Partial<AssignmentDto>): Observable<AssignmentDto> {
    return this.http.put<AssignmentDto>(`/api/assignments/doctor/${doctorId}/request/${requestId}`, dto);
  }

  deleteAssignment(doctorId: number, requestId: number): Observable<void> {
    return this.http.delete<void>(`/api/assignments/doctor/${doctorId}/request/${requestId}`);
  }
}
