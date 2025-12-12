import { AssignmentDto } from '../../core/interfaces/assignment.dto';
import { DoctorDto } from '../../core/interfaces/doctor.dto';
import { MedicalCardDto } from '../../core/interfaces/medical-card.dto';
import { PatientDto } from '../../core/interfaces/patient.dto';
import { RequestDto } from '../../core/interfaces/request.dto';
import { RequestFormValue } from '../interfaces/request-form-value.interface';

export const toRequestDto = (formValue: RequestFormValue): RequestDto => ({
  patientFirstName: formValue.patientFirstName,
  patientLastName: formValue.patientLastName,
  patientPatronymic: formValue.patientPatronymic,
  address: formValue.address,
  caseDescription: formValue.caseDescription,
  requestedDate: formValue.requestedDate,
  requestedTime: formValue.requestedTime,
  priority: formValue.priority,
  availableDoctors: formValue.availableDoctors
});

export const toDoctorDto = (payload: DoctorDto): DoctorDto => ({ ...payload });
export const toPatientDto = (payload: PatientDto): PatientDto => ({ ...payload });
export const toAssignmentDto = (payload: AssignmentDto): AssignmentDto => ({ ...payload });
export const toMedicalCardDto = (payload: MedicalCardDto): MedicalCardDto => ({ ...payload });
