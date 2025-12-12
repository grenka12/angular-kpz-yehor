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

  onDoctorChange(value: string) {
    const num = Number(value);
    this.selectedDoctorId = isNaN(num) ? null : num;

    console.log("Doctor changed →", this.selectedDoctorId);
  }

  onApprove() {
    if (!this.request || this.selectedDoctorId === null) return;

    this.approve.emit({
      requestId: this.request.id,        // 🔥 правильний requestId
      doctorId: this.selectedDoctorId    // 🔥 правильний doctorId
    });
  }

  onReject() {
    if (!this.request) return;
    this.reject.emit(this.request.id);
  }
}
