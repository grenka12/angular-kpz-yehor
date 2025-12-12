export interface RequestDto {
  id?: number;
  patientLastName: string;
  patientFirstName: string;
  patientPatronymic?: string;
  address: string;
  caseDescription: string;
  requestedDate?: string;
  requestedTime?: string;
  priority?: 'Normal' | 'Urgent';
  status?: 'Pending' | 'Approved' | 'Rejected';
  doctorId?: number;
}
