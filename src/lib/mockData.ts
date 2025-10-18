import type { Bed, Nurse, Doctor, HospitalInfo, HospitalStats } from '@/types';

export const mockHospitalInfo: HospitalInfo = {
  id: 1,
  hospital_name: 'City General Hospital',
  location: 'Mumbai',
  contact_number: '+91-22-12345678',
  floors: 3,
  setup_complete: true,
};

export const mockBeds: Bed[] = Array.from({ length: 30 }, (_, i) => {
  const floor = Math.floor(i / 10) + 1;
  const roomNum = Math.floor((i % 10) / 2) + 1;
  const bedLetter = i % 2 === 0 ? 'A' : 'B';
  
  return {
    id: i + 1,
    bed_number: `${floor}0${roomNum}${bedLetter}`,
    room_number: `${floor}0${roomNum}`,
    floor,
    position_x: (i % 2) * 3 + ((i % 10) % 2) * 6 - 7,
    position_y: 0,
    position_z: Math.floor((i % 10) / 2) * 3.5 - 7,
    status: i % 5 === 0 ? 'occupied' : i % 7 === 0 ? 'cleaning' : i < 5 ? 'icu' : 'available',
    patient_name: i % 5 === 0 ? `Patient ${i + 1}` : undefined,
  };
});

export const mockNurses: Nurse[] = [
  {
    id: 1,
    nurse_id: 'N001',
    name: 'Sarah Johnson',
    specialization: 'ICU',
    status: 'available',
  },
  {
    id: 2,
    nurse_id: 'N002',
    name: 'Priya Sharma',
    specialization: 'General',
    status: 'busy',
    current_assignment: 'EMG-1234567890',
  },
  {
    id: 3,
    nurse_id: 'N003',
    name: 'Amit Kumar',
    specialization: 'Emergency',
    status: 'available',
  },
  {
    id: 4,
    nurse_id: 'N004',
    name: 'Emily Chen',
    specialization: 'Pediatric',
    status: 'available',
  },
  {
    id: 5,
    nurse_id: 'N005',
    name: 'Rajesh Patel',
    specialization: 'Surgical',
    status: 'busy',
    current_assignment: 'EMG-1234567891',
  },
  {
    id: 6,
    nurse_id: 'N006',
    name: 'Maria Garcia',
    specialization: 'ICU',
    status: 'available',
  },
  {
    id: 7,
    nurse_id: 'N007',
    name: 'David Lee',
    specialization: 'General',
    status: 'available',
  },
  {
    id: 8,
    nurse_id: 'N008',
    name: 'Aisha Khan',
    specialization: 'Emergency',
    status: 'available',
  },
  {
    id: 9,
    nurse_id: 'N009',
    name: 'John Smith',
    specialization: 'Cardiac',
    status: 'available',
  },
  {
    id: 10,
    nurse_id: 'N010',
    name: 'Fatima Ali',
    specialization: 'General',
    status: 'available',
  },
];

export const mockDoctors: Doctor[] = [
  {
    id: 1,
    doctor_id: 'D001',
    name: 'Dr. Ramesh Kumar',
    specialization: 'Cardiologist',
    status: 'busy',
    current_assignment: 'EMG-1234567890',
  },
  {
    id: 2,
    doctor_id: 'D002',
    name: 'Dr. Lisa Wang',
    specialization: 'Emergency Medicine',
    status: 'available',
  },
  {
    id: 3,
    doctor_id: 'D003',
    name: 'Dr. Ahmed Hassan',
    specialization: 'Neurologist',
    status: 'available',
  },
  {
    id: 4,
    doctor_id: 'D004',
    name: 'Dr. Jennifer Brown',
    specialization: 'Pediatrician',
    status: 'available',
  },
  {
    id: 5,
    doctor_id: 'D005',
    name: 'Dr. Vikram Singh',
    specialization: 'Surgeon',
    status: 'busy',
    current_assignment: 'EMG-1234567891',
  },
  {
    id: 6,
    doctor_id: 'D006',
    name: 'Dr. Rachel Cohen',
    specialization: 'Anesthesiologist',
    status: 'available',
  },
  {
    id: 7,
    doctor_id: 'D007',
    name: 'Dr. Carlos Rodriguez',
    specialization: 'Orthopedic',
    status: 'available',
  },
  {
    id: 8,
    doctor_id: 'D008',
    name: 'Dr. Nisha Gupta',
    specialization: 'General Physician',
    status: 'available',
  },
];

export const mockStats: HospitalStats = {
  total_beds: 30,
  available_beds: 12,
  total_nurses: 10,
  available_nurses: 7,
  total_doctors: 8,
  available_doctors: 6,
  active_emergencies: 2,
};

export const emergencyTypes = [
  'Cardiac Emergency',
  'Trauma',
  'Respiratory Failure',
  'Stroke',
  'Severe Bleeding',
  'Poisoning',
  'Burns',
  'Obstetric Emergency',
  'Seizure',
  'Allergic Reaction',
];
