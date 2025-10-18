import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const getMe = async () => {
  const { data } = await api.get('/auth/me');
  return data;
};

// Hospital Setup
export const setupHospital = async (setupData: any) => {
  const { data } = await api.post('/hospital/setup', setupData);
  return data;
};

export const getHospitalInfo = async () => {
  const { data } = await api.get('/hospital/info');
  return data;
};

export const getHospitalStats = async () => {
  const { data } = await api.get('/hospital/stats');
  return data;
};

// Resources
export const getBeds = async () => {
  const { data } = await api.get('/beds');
  return data;
};

export const getBedById = async (id: number) => {
  const { data } = await api.get(`/beds/${id}`);
  return data;
};

export const releaseBed = async (id: number) => {
  const { data } = await api.post(`/beds/${id}/release`);
  return data;
};

export const getNurses = async () => {
  const { data } = await api.get('/nurses');
  return data;
};

export const getDoctors = async () => {
  const { data } = await api.get('/doctors');
  return data;
};

// Emergency
export const triggerEmergency = async (emergencyData: any) => {
  const { data } = await api.post('/emergency/trigger', emergencyData);
  return data;
};

export const getActiveEmergencies = async () => {
  const { data } = await api.get('/emergency/active');
  return data;
};

export const resolveEmergency = async (caseId: string) => {
  const { data } = await api.post(`/emergency/${caseId}/resolve`);
  return data;
};

// System
export const getSystemStatus = async () => {
  const { data } = await api.get('/system/status');
  return data;
};

export default api;
