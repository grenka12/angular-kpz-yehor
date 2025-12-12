import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
export class RequestDetailsComponent {

  @Input() request: RequestDto | null = null;
  @Input() doctors: DoctorDto[] = [];

  @Output() approve = new EventEmitter<{ doctorId: number; requestId: number }>();
  @Output() reject = new EventEmitter<number>();

  selectedDoctorId: number | null = null;

  get patientName(): string {
    if (!this.request) return '';

    return [
      this.request.patientLastName,
      this.request.patientFirstName,
      this.request.patientPatronymic
    ].filter(Boolean).join(' ');
  }

  get isPending(): boolean {
    return (this.request?.status || 'Pending') === 'Pending';
  }

  get statusLabel(): string {
    return this.request?.status || 'Pending';
  }

  get requestedDateTime(): string {
    if (!this.request?.requestedDate && !this.request?.requestedTime) {
      return 'Not scheduled';
    }

    return [this.request?.requestedDate, this.request?.requestedTime].filter(Boolean).join(' ');
  }

  onDoctorChange(value: string) {
    const num = Number(value);
    this.selectedDoctorId = isNaN(num) ? null : num;
  }

  onApprove() {
    if (!this.request || this.selectedDoctorId === null || !this.isPending) return;

    this.approve.emit({
      requestId: this.request.id,        // 🔥 правильний requestId
      doctorId: this.selectedDoctorId    // 🔥 правильний doctorId
    });
  }

  onReject() {
    if (!this.request || !this.isPending) return;
    this.reject.emit(this.request.id);
  }
}
