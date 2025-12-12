import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestDto } from '../../../core/interfaces/request.dto';
import { DoctorDto } from '../../../core/interfaces/doctor.dto';

@Component({
  selector: 'request-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnChanges {
  @Input() request: RequestDto | null = null;
  @Input() doctors: DoctorDto[] = [];
  @Output() approve = new EventEmitter<{ doctorId: number | null; requestId: number | null }>();
  @Output() reject = new EventEmitter<number | null>();

  selectedDoctorId: number | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['request']) {
      this.selectedDoctorId = null;
    }
  }

  onApprove() {
    console.log('Approve clicked', {
      requestId: this.request?.id,
      selectedDoctorId: this.selectedDoctorId
    });
    this.approve.emit({
      doctorId: this.selectedDoctorId,
      requestId: this.request?.id ?? null
    });
  }

  onReject() {
    console.log('Reject clicked', { requestId: this.request?.id });
    this.reject.emit(this.request?.id ?? null);
  }
}
