import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RequestDto } from '../../../core/interfaces/request.dto';
@Component({
  selector: 'requests-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.scss']
})
export class RequestsTableComponent {
  @Input() requests: RequestDto[] = [];
  @Input() selectedRequestId?: number;
  @Output() selectRequest = new EventEmitter<RequestDto>();

  onRowClick(request: RequestDto) {
    this.selectRequest.emit(request);
  }

  trackById(_: number, item: RequestDto) {
    return item.id;
  }
}

