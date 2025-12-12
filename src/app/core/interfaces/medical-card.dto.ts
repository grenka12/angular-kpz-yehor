export interface MedicalCardDto {
  id?: number;
  patientId: number;
  bloodType: string;
  allergies: string;
  chronicConditions: string;
  notes: string;
}
