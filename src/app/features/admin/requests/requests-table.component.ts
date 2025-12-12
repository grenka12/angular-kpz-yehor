import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RequestsService } from '../../../core/services/requests.service';
import { RequestDto } from '../../../core/interfaces/request.dto';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-requests-table',
  standalone: false,
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.scss']
})
export class RequestsTableComponent implements OnInit {
  @Output() selected = new EventEmitter<RequestDto>();
  @Output() updated = new EventEmitter<RequestDto>();

  requests: RequestDto[] = [];
  loading = false;
  selectedId?: number;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly requestsService: RequestsService
  ) {}

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadRequests();
    }
  }

  loadRequests() {
    this.loading = true;
    this.requestsService.getRequests().subscribe({
      next: (requests) => {
        this.requests = requests;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  selectRequest(request: RequestDto) {
    this.selectedId = request.id;
    this.selected.emit(request);
  }

  refresh(request: RequestDto) {
    this.updated.emit(request);
    this.loadRequests();
  }

  private get isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
