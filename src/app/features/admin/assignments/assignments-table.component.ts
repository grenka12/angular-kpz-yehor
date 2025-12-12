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

  resolveRequestCase(id: number) {
    const request = this.requests.find((r) => r.id === id);
    return request ? request.caseDescription : 'N/A';
  }
}
