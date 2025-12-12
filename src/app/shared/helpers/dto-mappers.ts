import { AssignmentDto } from '../../core/interfaces/assignment.dto';
import { DoctorDto } from '../../core/interfaces/doctor.dto';
import { RequestDto } from '../../core/interfaces/request.dto';

export interface RequestFormValue {
  patientFirstName: string;
  patientLastName: string;
  patientPatronymic?: string;
  address: string;
  caseDescription: string;
  requestedDate?: string;
  requestedTime?: string;
  priority?: 'Normal' | 'Urgent';
  doctorId?: number;
}

export const mapRequestFormToDto = (formValue: RequestFormValue): RequestDto => ({
  patientFirstName: formValue.patientFirstName,
  patientLastName: formValue.patientLastName,
  patientPatronymic: formValue.patientPatronymic,
  address: formValue.address,
  caseDescription: formValue.caseDescription,
  requestedDate: formValue.requestedDate,
  requestedTime: formValue.requestedTime,
  priority: formValue.priority,
  doctorId: formValue.doctorId
});

export const formatDoctorName = (doctor: DoctorDto) =>
  [doctor.lastName, doctor.firstName, doctor.patronymic].filter(Boolean).join(' ');

export const buildAssignmentPayload = (doctorId: number, requestId: number): AssignmentDto => ({
  doctorId,
  requestId
});
