import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DoctorDto } from '../../core/interfaces/doctor.dto';
import { DoctorsService } from '../../core/services/doctors.service';
import { RequestDto } from '../../core/interfaces/request.dto';
import { RequestsTableComponent } from './requests/requests-table.component';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  standalone: false,
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  @ViewChild(RequestsTableComponent) requestsTable?: RequestsTableComponent;

  activeTab: 'requests' | 'assignments' = 'requests';
  selectedRequest: RequestDto | null = null;
  doctors: DoctorDto[] = [];

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly doctorsService: DoctorsService
  ) {}

  ngOnInit(): void {
    if (this.isBrowser) {
      this.doctorsService.getDoctors().subscribe((doctors) => (this.doctors = doctors));
    }
  }

  onRequestSelected(request: RequestDto) {
    this.selectedRequest = request;
  }

  onRequestUpdated(request: RequestDto) {
    this.selectedRequest = request;
    this.requestsTable?.loadRequests();
  }

  private get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
