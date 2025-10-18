import { create } from 'zustand';
import type { Bed, Nurse, Doctor, Emergency, HospitalInfo, HospitalStats } from '@/types';

interface HospitalState {
  hospitalInfo: HospitalInfo | null;
  stats: HospitalStats | null;
  beds: Bed[];
  nurses: Nurse[];
  doctors: Doctor[];
  emergencies: Emergency[];
  selectedBed: Bed | null;
  currentFloor: number;
  isLoading: boolean;
  
  setHospitalInfo: (info: HospitalInfo) => void;
  setStats: (stats: HospitalStats) => void;
  setBeds: (beds: Bed[]) => void;
  setNurses: (nurses: Nurse[]) => void;
  setDoctors: (doctors: Doctor[]) => void;
  setEmergencies: (emergencies: Emergency[]) => void;
  setSelectedBed: (bed: Bed | null) => void;
  setCurrentFloor: (floor: number) => void;
  setIsLoading: (loading: boolean) => void;
  
  updateBed: (bedId: number, updates: Partial<Bed>) => void;
  updateNurse: (nurseId: number, updates: Partial<Nurse>) => void;
  updateDoctor: (doctorId: number, updates: Partial<Doctor>) => void;
  addEmergency: (emergency: Emergency) => void;
  removeEmergency: (caseId: string) => void;
}

export const useHospitalStore = create<HospitalState>((set) => ({
  hospitalInfo: null,
  stats: null,
  beds: [],
  nurses: [],
  doctors: [],
  emergencies: [],
  selectedBed: null,
  currentFloor: 1,
  isLoading: false,
  
  setHospitalInfo: (info) => set({ hospitalInfo: info }),
  setStats: (stats) => set({ stats }),
  setBeds: (beds) => set({ beds }),
  setNurses: (nurses) => set({ nurses }),
  setDoctors: (doctors) => set({ doctors }),
  setEmergencies: (emergencies) => set({ emergencies }),
  setSelectedBed: (bed) => set({ selectedBed: bed }),
  setCurrentFloor: (floor) => set({ currentFloor: floor }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  updateBed: (bedId, updates) => set((state) => ({
    beds: state.beds.map(b => b.id === bedId ? { ...b, ...updates } : b)
  })),
  
  updateNurse: (nurseId, updates) => set((state) => ({
    nurses: state.nurses.map(n => n.id === nurseId ? { ...n, ...updates } : n)
  })),
  
  updateDoctor: (doctorId, updates) => set((state) => ({
    doctors: state.doctors.map(d => d.id === doctorId ? { ...d, ...updates } : d)
  })),
  
  addEmergency: (emergency) => set((state) => ({
    emergencies: [emergency, ...state.emergencies]
  })),
  
  removeEmergency: (caseId) => set((state) => ({
    emergencies: state.emergencies.filter(e => e.case_id !== caseId)
  })),
}));
