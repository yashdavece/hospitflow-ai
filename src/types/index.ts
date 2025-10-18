export interface Bed {
  id: number;
  bed_number: string;
  room_number: string;
  floor: number;
  position_x: number;
  position_y: number;
  position_z: number;
  status: 'available' | 'occupied' | 'cleaning' | 'icu';
  patient_name?: string;
  assigned_nurse_id?: number;
  assigned_doctor_id?: number;
}

export interface Nurse {
  id: number;
  nurse_id: string;
  name: string;
  specialization: string;
  status: 'available' | 'busy' | 'off-duty';
  current_assignment?: string;
}

export interface Doctor {
  id: number;
  doctor_id: string;
  name: string;
  specialization: string;
  status: 'available' | 'busy' | 'off-duty';
  current_assignment?: string;
}

export interface Emergency {
  case_id: string;
  case_type: string;
  patient_name: string;
  caller_phone: string;
  assigned_bed?: string;
  assigned_nurse?: string;
  assigned_doctor?: string;
  status: 'active' | 'resolved';
  created_at: string;
}

export interface HospitalInfo {
  id: number;
  hospital_name: string;
  location: string;
  contact_number: string;
  floors: number;
  setup_complete: boolean;
}

export interface HospitalStats {
  total_beds: number;
  available_beds: number;
  total_nurses: number;
  available_nurses: number;
  total_doctors: number;
  available_doctors: number;
  active_emergencies: number;
}
