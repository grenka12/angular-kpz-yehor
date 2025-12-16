import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AssignmentDto } from '../../../core/interfaces/assignment.dto';
import { DoctorDto } from '../../../core/interfaces/doctor.dto';
import { RequestDto } from '../../../core/interfaces/request.dto';

@Component({
  selector: 'assignments-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignments-table.component.html',
  styleUrls: ['./assignments-table.component.scss']
})
export class AssignmentsTableComponent {
  @Input() assignments: AssignmentDto[] = [];
  @Input() doctors: DoctorDto[] = [];
  @Input() requests: RequestDto[] = [];

  resolveDoctorName(id: number) {
    const doctor = this.doctors.find((d) => d.id === id);
    return doctor ? `${doctor.lastName} ${doctor.firstName}` : 'N/A';
  }

  resolvePatientName(requestId: number) {
    const request = this.findRequestById(requestId);

    if (!request) {
      return 'Unknown patient';
    }

    return [request.patientLastName, request.patientFirstName, request.patientPatronymic]
      .filter(Boolean)
      .join(' ');
  }

  resolveRequestedSlot(requestId: number) {
    const request = this.findRequestById(requestId);

    if (!request) {
      return 'N/A';
    }

    const dateTime = this.splitDateTime(request.requestedDate);
    const time = request.requestedTime || dateTime.time;
    const date = dateTime.date;

    if (!date && !time) {
      return 'Not specified';
    }

    return [date, time].filter(Boolean).join(' ');
  }

  resolveRequestCase(id: number) {
    const request = this.findRequestById(id);
    return request ? request.caseDescription : 'Unknown request';
  }

  resolveRequestAddress(id: number) {
    const request = this.findRequestById(id);
    return request?.address || '';
  }

  private findRequestById(requestId: number) {
    return this.requests.find((r) => r.id === requestId);
  }

  private splitDateTime(value?: string) {
    if (!value) {
      return { date: '', time: '' };
    }

    const [datePart, timePart] = value.split('T');
    const cleanTime = timePart ? timePart.replace('Z', '').slice(0, 5) : '';

    return { date: datePart || value, time: cleanTime };
  }
}
