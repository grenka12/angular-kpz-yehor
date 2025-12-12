import { AssignmentDto } from '../../core/interfaces/assignment.dto';
import { DoctorDto } from '../../core/interfaces/doctor.dto';
import { MedicalCardDto } from '../../core/interfaces/medical-card.dto';
import { PatientDto } from '../../core/interfaces/patient.dto';
import { RequestDto } from '../../core/interfaces/request.dto';
import { CreateRequestDto } from '../../core/interfaces/createrequest.dto';

import { RequestFormValue } from '../interfaces/request-form-value.interface';

export const toCreateRequestDto = (formValue: RequestFormValue): CreateRequestDto => ({
  patientFirstName: formValue.patientFirstName,
  patientLastName: formValue.patientLastName,
  patientPatronymic: formValue.patientPatronymic,
  address: formValue.address,
  caseDescription: formValue.caseDescription,
  requestedDate: formValue.requestedDate,
  requestedTime: formValue.requestedTime,
  priority: formValue.priority ?? "Normal"
});


export const toDoctorDto = (payload: DoctorDto): DoctorDto => ({ ...payload });
export const toPatientDto = (payload: PatientDto): PatientDto => ({ ...payload });
export const toAssignmentDto = (payload: AssignmentDto): AssignmentDto => ({ ...payload });
export const toMedicalCardDto = (payload: MedicalCardDto): MedicalCardDto => ({ ...payload });
