export interface RequestDto {
  patientLastName: string;
  patientFirstName: string;
  patientPatronymic: string;
  address: string;
  caseDescription: string;
  requestedDate?: string;
  requestedTime?: string;
  priority?: 'Normal' | 'Urgent';
  status?: 'Pending' | 'Approved' | 'Rejected';
  availableDoctors?: number[];
  id?: number;
}
