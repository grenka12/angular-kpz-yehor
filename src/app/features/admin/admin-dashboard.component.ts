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

  onApprove(doctorId: number | null) {
    const request = this.selectedRequest();
    if (!request?.id) return;

    if (!doctorId) {
      alert('Оберіть лікаря перед затвердженням!');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.requestsService
      .approveRequest(request.id, doctorId)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.errorMessage.set('');
          this.loadRequests(request.id);
          this.refreshAssignments();
        },
        error: (err) => {
          console.error('Unable to approve request', err);
          this.errorMessage.set(err?.error?.message || 'Unable to approve request');
        }
      });
  }

  onReject() {
    const request = this.selectedRequest();
    if (!request?.id) return;

    this.loading.set(true);
    this.errorMessage.set('');
    this.requestsService
      .rejectRequest(request.id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.errorMessage.set('');
          this.loadRequests();
          this.refreshAssignments();
        },
        error: (err) => {
          console.error('Unable to reject request', err);
          this.errorMessage.set(err?.error?.message || 'Unable to reject request');
        }
      });
  }

  private loadRequests(selectedId?: number) {
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
        error: (err) => {
          console.error('Unable to reload requests', err);
          this.errorMessage.set(err?.error?.message || 'Unable to reload requests');
        }
      });
  }

  private refreshAssignments() {
    this.assignmentsService.getAssignments().subscribe({
      next: (data) => this.assignments.set(data),
      error: (err) => {
        console.error('Unable to reload assignments', err);
        this.errorMessage.set(err?.error?.message || 'Unable to reload assignments');
      }
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
        error: (err) => {
          console.error('Failed to load requests', err);
          this.errorMessage.set(err?.error?.message || 'Failed to load requests');
        }
      });

    this.doctorsService.getDoctors().subscribe({
      next: (doctors) => this.doctors.set(doctors),
      error: (err) => {
        console.error('Failed to load doctors', err);
        this.errorMessage.set(err?.error?.message || 'Failed to load doctors');
      }
    });

    this.assignmentsService.getAssignments().subscribe({
      next: (data) => this.assignments.set(data),
      error: (err) => {
        console.error('Failed to load assignments', err);
        this.errorMessage.set(err?.error?.message || 'Failed to load assignments');
      }
    });
  }
}
