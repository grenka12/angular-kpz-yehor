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
  requestedDate: normalizeRequestedDate(formValue.requestedDate, formValue.requestedTime),
  requestedTime: formValue.requestedTime,
  priority: formValue.priority ?? "Normal"
});


const normalizeRequestedDate = (dateValue: string, timeValue: string) => {
  if (!dateValue) {
    return "";
  }

  const [hours = "00", minutes = "00"] = (timeValue || "").split(":");
  const [datePart] = dateValue.split("T");
  const [, month = "01", day = "01"] = (datePart || "").split("-");

  const normalizedMonth = month.padStart(2, "0");
  const normalizedDay = (day?.split("T")[0] || "01").padStart(2, "0");

  return `2025-${normalizedMonth}-${normalizedDay}T${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00.000Z`;
};


export const toDoctorDto = (payload: DoctorDto): DoctorDto => ({ ...payload });
export const toPatientDto = (payload: PatientDto): PatientDto => ({ ...payload });
export const toAssignmentDto = (payload: AssignmentDto): AssignmentDto => ({ ...payload });
export const toMedicalCardDto = (payload: MedicalCardDto): MedicalCardDto => ({ ...payload });
