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
  @Input() selectedRequestId: number | undefined;
  @Output() selectRequest = new EventEmitter<RequestDto>();

  trackById(_index: number, item: RequestDto) {
    return item.id;
  }

  onRowClick(request: RequestDto) {
    this.selectRequest.emit(request);
  }
}
