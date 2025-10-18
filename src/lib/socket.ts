import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
    });
  }
  return socket;
};

export const connectSocket = () => {
  const socket = getSocket();
  
  if (socket.connected) return;
  
  socket.connect();
  
  socket.on('connect', () => {
    console.log('✅ Socket connected');
    toast.success('Connected to hospital system');
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected');
    toast.error('Connection lost');
  });

  socket.on('bed-updated', (data) => {
    console.log('🏥 Bed updated:', data);
    toast.info(`Bed ${data.bed_number} updated`);
    window.dispatchEvent(new CustomEvent('bed-updated', { detail: data }));
  });

  socket.on('nurse-updated', (data) => {
    console.log('👩‍⚕️ Nurse updated:', data);
    toast.info(`Nurse ${data.name} updated`);
    window.dispatchEvent(new CustomEvent('nurse-updated', { detail: data }));
  });

  socket.on('doctor-updated', (data) => {
    console.log('👨‍⚕️ Doctor updated:', data);
    toast.info(`Doctor ${data.name} updated`);
    window.dispatchEvent(new CustomEvent('doctor-updated', { detail: data }));
  });

  socket.on('emergency-alert', (data) => {
    console.log('🚨 Emergency alert:', data);
    toast.error(`🚨 EMERGENCY: ${data.case_type}`, {
      duration: 10000,
      description: `Case: ${data.case_id}`,
    });
    window.dispatchEvent(new CustomEvent('emergency-alert', { detail: data }));
  });

  socket.on('alert', (data) => {
    toast.info(data.message, {
      description: new Date(data.timestamp).toLocaleTimeString(),
    });
  });
  
  return socket;
};

export const disconnectSocket = () => {
  const socket = getSocket();
  if (socket.connected) {
    socket.disconnect();
  }
};
