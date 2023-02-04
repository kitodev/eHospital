export interface Patient {
  isChecked: boolean;
  patient_id: string;
  patient_name: string;
  mobile: string;
  doctor_id: string;
  doctor_name: string;
  gender: string;
  birthdate: Date;
  admission_date: Date;
  prescription : string;
}
