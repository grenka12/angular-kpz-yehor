import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RequestsService } from '../../core/services/requests.service';
import { DoctorsService } from '../../core/services/doctors.service';
import { AssignmentsService } from '../../core/services/assignments.service';
import { RequestDto } from '../../core/interfaces/request.dto';
import { DoctorDto } from '../../core/interfaces/doctor.dto';
import { AssignmentDto } from '../../core/interfaces/assignment.dto';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { RequestsTableComponent } from './requests/requests-table.component';
import { RequestDetailsComponent } from './requests/request-details.component';
import { AssignmentsTableComponent } from './assignments/assignments-table.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, LoaderComponent, RequestsTableComponent, RequestDetailsComponent, AssignmentsTableComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  requests = signal<RequestDto[]>([]);
  assignments = signal<AssignmentDto[]>([]);
  doctors = signal<DoctorDto[]>([]);
  selectedRequest = signal<RequestDto | null>(null);
  activeTab = signal<'requests' | 'assignments'>('requests');
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private readonly requestsService: RequestsService,
    private readonly doctorsService: DoctorsService,
    private readonly assignmentsService: AssignmentsService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  setTab(tab: 'requests' | 'assignments') {
    this.activeTab.set(tab);
  }

  onSelectRequest(request: RequestDto) {
    this.selectedRequest.set(request);
  }

  onAssignDoctor(doctorId: number) {
    const request = this.selectedRequest();
    if (!request?.id || !doctorId) {
      return;
    }

    this.loading.set(true);
    const payload: AssignmentDto = { doctorId, requestId: request.id };
    this.assignmentsService
      .createAssignment(payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.refreshAssignments(),
        error: () => this.errorMessage.set('Failed to create assignment')
      });
  }

  onApprove() {
    this.updateStatus('Approved');
  }

  onReject() {
    this.updateStatus('Rejected');
  }

  private updateStatus(status: 'Approved' | 'Rejected') {
    const request = this.selectedRequest();
    if (!request?.id) return;

    this.loading.set(true);
    this.requestsService
      .updateRequest(request.id, { status })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.refreshRequests(request.id!),
        error: () => this.errorMessage.set('Unable to update status')
      });
  }

  private refreshRequests(selectedId?: number) {
    this.requestsService
      .getRequests()
      .subscribe({
        next: (requests) => {
          this.requests.set(requests);
          if (selectedId) {
            const found = requests.find((r) => r.id === selectedId) || null;
            this.selectedRequest.set(found);
          }
        },
        error: () => this.errorMessage.set('Unable to reload requests')
      });
  }

  private refreshAssignments() {
    this.assignmentsService.getAssignments().subscribe({
      next: (data) => this.assignments.set(data),
      error: () => this.errorMessage.set('Unable to reload assignments')
    });
  }

  private loadData() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.requestsService
      .getRequests()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (requests) => this.requests.set(requests),
        error: () => this.errorMessage.set('Failed to load requests')
      });

    this.doctorsService.getDoctors().subscribe({
      next: (doctors) => this.doctors.set(doctors),
      error: () => this.errorMessage.set('Failed to load doctors')
    });

    this.assignmentsService.getAssignments().subscribe({
      next: (data) => this.assignments.set(data),
      error: () => this.errorMessage.set('Failed to load assignments')
    });
  }
}
