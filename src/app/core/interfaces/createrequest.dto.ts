export interface CreateRequestDto {
  patientLastName: string;
  patientFirstName: string;
  patientPatronymic?: string;
  address: string;
  caseDescription: string;
  priority: 'Normal' | 'Urgent';
  requestedDate: string;
  requestedTime: string;
}
