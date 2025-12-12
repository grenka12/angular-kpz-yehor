export interface RequestDto {
  id: number;
  patientLastName: string;
  patientFirstName: string;
  patientPatronymic?: string;
  address: string;
  caseDescription: string;
  priority?: string;
  status?: string;
  requestedDate?: string;
  requestedTime?: string;
}
