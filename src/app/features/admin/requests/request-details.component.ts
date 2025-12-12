import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() approve = new EventEmitter<number | null>();
  @Output() reject = new EventEmitter<void>();

  selectedDoctorId: number | null = null;

  onApprove() {
    this.approve.emit(this.selectedDoctorId);
  }
}
