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

  formatRequestedSlot(request: RequestDto) {
    const dateTime = this.extractDateTime(request);
    return [dateTime.date, dateTime.time].filter(Boolean).join(' ');
  }

  private extractDateTime(request: RequestDto) {
    const dateFromIso = this.splitDateTime(request.requestedDate);
    const time = request.requestedTime || dateFromIso.time;

    return {
      date: dateFromIso.date,
      time
    };
  }

  private splitDateTime(value?: string) {
    if (!value) {
      return { date: '', time: '' };
    }

    const [datePart, timePart] = value.split('T');
    const cleanTime = timePart ? timePart.replace('Z', '').slice(0, 5) : '';

    return { date: datePart || value, time: cleanTime };
  }

  trackById(_: number, item: RequestDto) {
    return item.id;
  }
}

