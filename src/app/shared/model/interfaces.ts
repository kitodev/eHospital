export interface Appointments {
  appointment_id : string;
  appointment_name : string;
  name: string;
  email: string;
  mobile : string;
  doctor_id : string;
  doctor_name : string;
  visit_time: Date;
  injury: string;
}

export interface Doctor {
  id: string;
  name: string;
  mobile: string;
  email: string;
  qualification: string;
  gender: string;
  department: string;
  birthdate: Date
}

export interface Documents {
  id: string;
  name: string;
  created: Date;
}

export interface Packagelist {
  id: string;
  description: string;
  discount: number;
  package_name: string;
  status: boolean;
}

export interface Invoice {
  id: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
}

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

export interface UserProfile {
  fullName: string;
  about: string;
  address: string;
  phone: number;
  email: string;
  newpassword: string;
  renewpassword: string;
}
