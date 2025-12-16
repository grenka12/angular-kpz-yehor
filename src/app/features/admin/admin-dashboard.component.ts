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
  imports: [
    CommonModule,
    LoaderComponent,
    RequestsTableComponent,
    RequestDetailsComponent,
    AssignmentsTableComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  // 🔥 ТВОЇ СИГНАЛИ
  requests = signal<RequestDto[]>([]);
  assignments = signal<AssignmentDto[]>([]);
  doctors = signal<DoctorDto[]>([]);
  selectedRequest = signal<RequestDto | null>(null);

  // 🔥 ВАЖЛИВО — САМЕ ЦЕГО ПОЛЯ У ТЕБЕ НЕМА
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

  onSelectRequest(req: RequestDto) {
    console.log('Selected request →', req);
    this.selectedRequest.set(req);
  }

  onApprove(event: { doctorId: number; requestId: number }) {

    if (!event.requestId) {
      this.errorMessage.set('No requestId passed!');
      return;
    }

    if (!event.doctorId) {
      this.errorMessage.set('No doctor selected!');
      return;
    }

    console.log('APPROVE → requestId =', event.requestId, ' doctorId =', event.doctorId);

    this.requestsService.approveRequest(event.requestId, event.doctorId).subscribe({
      next: () => {
        this.loadRequests(event.requestId);
        this.refreshAssignments();
      },
      error: (err) => this.errorMessage.set(err.error?.message || 'Error approving')
    });
  }


  onReject(requestId: number) {
    if (!requestId) {
      this.errorMessage.set('Спочатку оберіть заявку перед відхиленням.');
      return;
    }

    this.loading.set(true);
    this.requestsService.rejectRequest(requestId)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.errorMessage.set('');
          this.loadRequests();
          this.refreshAssignments();
        },
        error: () => {
          this.errorMessage.set('Unable to reject request');
        }
      });
  }

  private loadRequests(selectedId?: number) {
    this.requestsService.getRequests()
      .subscribe({
        next: (requests) => {
          this.requests.set(this.sortRequestsByStatus(requests));
          if (selectedId) {
            const found = requests.find((r) => r.id === selectedId) || null;
            this.selectedRequest.set(found);
          }
        },
        error: (err) => {
          this.errorMessage.set(err?.error?.message || 'Unable to reload requests');
        }
      });
  }

  private refreshAssignments() {
    this.assignmentsService.getAssignments()
      .subscribe({
        next: (data) => this.assignments.set(data),
        error: (err) => {
          this.errorMessage.set(err?.error?.message || 'Unable to reload assignments');
        }
      });
  }

  private loadData() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.requestsService.getRequests()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (requests) => this.requests.set(this.sortRequestsByStatus(requests)),
        error: (err) => {
          this.errorMessage.set(err?.error?.message || 'Failed to load requests');
        }
      });

    this.doctorsService.getDoctors()
      .subscribe({
        next: (doctors) => this.doctors.set(doctors),
        error: (err) => {
          this.errorMessage.set(err?.error?.message || 'Failed to load doctors');
        }
      });

      this.doctorsService.getDoctors().subscribe({
  next: (doctors) => {
    console.log("RAW DOCTORS FROM BACKEND →", doctors);
    this.doctors.set(doctors);
  }
});

        

      this.assignmentsService.getAssignments()
      .subscribe({
        next: (data) => this.assignments.set(data),
        error: (err) => {
          this.errorMessage.set(err?.error?.message || 'Failed to load assignments');
        }
      });
  }

  private sortRequestsByStatus(requests: RequestDto[]) {
    const order = ['Pending', 'pending', 'Approved', 'approved', 'Rejected', 'rejected'];

    return [...requests].sort((a, b) => {
      const aStatus = a.status || 'Pending';
      const bStatus = b.status || 'Pending';

      const aIndex = order.indexOf(aStatus);
      const bIndex = order.indexOf(bStatus);

      const normalizedA = aIndex === -1 ? order.length : aIndex;
      const normalizedB = bIndex === -1 ? order.length : bIndex;

      if (normalizedA !== normalizedB) {
        return normalizedA - normalizedB;
      }

      return (a.id || 0) - (b.id || 0);
    });
  }
}
