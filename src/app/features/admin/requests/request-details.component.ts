import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RequestDto } from '../../../core/interfaces/request.dto';
import { RequestsService } from '../../../core/services/requests.service';
import { AssignmentDto } from '../../../core/interfaces/assignment.dto';
import { AssignmentsService } from '../../../core/services/assignments.service';
import { DoctorDto } from '../../../core/interfaces/doctor.dto';
import { buildAssignmentPayload } from '../../../shared/helpers/dto-mappers';

@Component({
  selector: 'app-request-details',
  standalone: false,
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnChanges {
  @Input() request: RequestDto | null = null;
  @Input() doctors: DoctorDto[] = [];
  @Output() updated = new EventEmitter<RequestDto>();

  selectedDoctorId?: number;
  saving = false;

  constructor(
    private readonly requestsService: RequestsService,
    private readonly assignmentsService: AssignmentsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['request']?.currentValue) {
      this.selectedDoctorId = this.request?.doctorId;
    }
  }

  approve() {
    if (!this.request?.id) return;
    this.persistRequest('Approved');
  }

  reject() {
    if (!this.request?.id) return;
    this.persistRequest('Rejected');
  }

  private persistRequest(status: 'Approved' | 'Rejected') {
    const request = this.request;
    if (!request || request.id == null) return;

    const requestId = request.id as number;

    this.saving = true;
    const payload: RequestDto = { ...request, status, doctorId: this.selectedDoctorId };
    this.requestsService.updateRequest(requestId, payload).subscribe({
      next: () => {
        const doctorId = this.selectedDoctorId;
        if (status === 'Approved' && doctorId != null) {
          const assignment: AssignmentDto = buildAssignmentPayload(doctorId, requestId);
          this.assignmentsService.createAssignment(assignment).subscribe();
        }
        this.updated.emit(payload);
        this.saving = false;
      },
      error: () => (this.saving = false)
    });
  }
}
