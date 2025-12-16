export interface RequestFormValue {
  patientFirstName: string;
  patientLastName: string;
  patientPatronymic: string;
  address: string;
  caseDescription: string;
  requestedDate: string;
  requestedTime: string;
  priority: 'Normal' | 'Urgent';
}
