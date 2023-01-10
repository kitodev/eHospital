export interface Payments {
  bill_id: number;
  bill_no: number;
  patient_name: string;
  doctor_id: string;
  docotor_name: string;
  date: Date;
  charges: number;
  tax: number;
  discount: number;
  total: number;
}
