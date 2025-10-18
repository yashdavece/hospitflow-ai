# CareFlow Nexus - AI Hospital Management System

![CareFlow Nexus](https://img.shields.io/badge/Status-MVP-green) ![React](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## 🏥 Overview

CareFlow Nexus is a modern, AI-powered hospital management system featuring real-time 3D bed visualization, emergency management, and intelligent resource allocation. Built with React, TypeScript, and React Three Fiber for an immersive 3D experience.

## ✨ Features

### Core Features
- 🔐 **Secure Authentication** - Simple login with demo credentials
- 🏗️ **Hospital Setup Wizard** - Easy 3-step onboarding process
- 🎯 **3D Bed Visualization** - Interactive 3D map with real-time status
- 🚨 **Emergency Management** - Quick emergency trigger with AI auto-assignment
- 👥 **Resource Tracking** - Monitor nurses, doctors, and beds in real-time
- 📊 **Live Dashboard** - Comprehensive status overview
- 🔄 **Real-time Updates** - Socket.io integration for live data

### 3D Visualization Features
- Color-coded bed status (Available, Occupied, Cleaning, ICU)
- Multi-floor navigation
- Interactive bed selection with detailed modal
- Hover tooltips with bed information
- Smooth camera controls (orbit, zoom, pan)

## 🚀 Tech Stack

- **Frontend**: React 18.3 with TypeScript
- **3D Graphics**: React Three Fiber (@react-three/fiber) + Drei
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: Zustand
- **Real-time**: Socket.io Client
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner (toast)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎮 Demo Credentials

```
Email: admin@hospital.com
Password: admin123
```

## 📖 Usage Guide

### 1. Login
- Navigate to `/` (root)
- Use demo credentials or your own
- System checks if hospital setup is complete

### 2. Hospital Setup (First Time Only)
If not set up, you'll be redirected to the setup wizard:

**Step 1: Hospital Details**
- Hospital name
- Location/city
- Contact number
- Number of floors (1-10)

**Step 2: Configure Resources**
- Number of beds
- Number of nurses
- Number of doctors
- ICU beds

**Step 3: Review & Generate**
- Review all settings
- Generate hospital infrastructure
- Auto-redirect to dashboard

### 3. Dashboard

**Status Overview**
- Total beds
- Available beds
- Active nurses
- Active emergencies
- System status

**Emergency Trigger Panel**
- Select emergency type
- Enter patient name
- Enter caller phone
- Click "TRIGGER EMERGENCY"
- AI assigns bed, nurse, and doctor automatically

**3D Bed Map**
- View all beds on current floor
- Switch between floors
- Click beds for detailed information
- Color legend:
  - ⬜ White = Available
  - 🟥 Red = Occupied
  - 🟨 Yellow = Cleaning
  - 🟦 Blue = ICU

**Active Emergencies List**
- View all active cases
- Case details (ID, type, assigned resources, time)
- Resolve emergency button

**Resource Management Tabs**
- **Nurses Tab**: View all nurses, status, assignments
- **Beds Tab**: List view of all beds
- **Doctors Tab**: View all doctors, status, assignments

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn UI components
│   ├── BedMap3D.tsx     # 3D bed visualization
│   ├── EmergencyTrigger.tsx
│   ├── EmergencyCaseCard.tsx
│   ├── ResourceTable.tsx
│   ├── StatusCard.tsx
│   └── BedDetailsModal.tsx
├── pages/
│   ├── Login.tsx
│   ├── Setup.tsx
│   └── Dashboard.tsx
├── store/
│   └── hospitalStore.ts # Zustand state management
├── lib/
│   ├── api.ts           # API client
│   ├── socket.ts        # Socket.io setup
│   ├── mockData.ts      # Demo data
│   └── utils.ts
├── types/
│   └── index.ts         # TypeScript types
└── App.tsx              # Routes & providers
```

## 🎨 Design System

The app uses a semantic token system defined in `src/index.css` and `tailwind.config.ts`:

### Color Palette
- **Primary**: Indigo (#6366F1) - Main brand color
- **Secondary**: Purple (#8B5CF6) - Accent color
- **Success**: Green (#10B981) - Available resources
- **Warning**: Amber (#F59E0B) - Cleaning status
- **Error**: Red (#EF4444) - Emergencies, occupied beds
- **Accent**: Blue (#3B82F6) - ICU beds

### Key Design Tokens
- Gradients: `--gradient-primary`, `--gradient-secondary`
- Shadows: `--shadow-card`, `--shadow-lg`
- Bed colors: `--bed-available`, `--bed-occupied`, `--bed-cleaning`, `--bed-icu`

## 🔌 Backend Integration (Future)

The app is structured to easily connect to a backend:

### API Endpoints (Planned)
```
POST   /api/auth/login
GET    /api/auth/me

POST   /api/hospital/setup
GET    /api/hospital/info
GET    /api/hospital/stats

GET    /api/beds
GET    /api/beds/:id
POST   /api/beds/:id/release

GET    /api/nurses
GET    /api/doctors

POST   /api/emergency/trigger
GET    /api/emergency/active
POST   /api/emergency/:caseId/resolve

GET    /api/system/status
```

### Socket.io Events (Planned)
```javascript
// Listen for:
socket.on('bed-updated', callback)
socket.on('nurse-updated', callback)
socket.on('doctor-updated', callback)
socket.on('emergency-alert', callback)
socket.on('alert', callback)
```

### Environment Variables
Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🧪 Current State (MVP)

The current implementation uses **mock data** for demonstration:
- Mock login (any email/password works)
- Mock hospital setup
- Mock emergency assignments
- Static bed positions and data
- Simulated real-time updates

All the infrastructure is in place to easily connect to a real backend when ready.

## 🚀 Next Steps

To connect to a real backend:

1. **Backend Setup**
   - Set up Node.js/Express server
   - Add PostgreSQL database
   - Implement Socket.io server

2. **Update Environment**
   ```env
   VITE_API_URL=https://your-backend.com/api
   VITE_SOCKET_URL=https://your-backend.com
   ```

3. **Remove Mock Data**
   - Replace mock functions in components
   - Use real API calls via `src/lib/api.ts`

4. **Test Real-time**
   - Verify Socket.io connection
   - Test emergency triggers
   - Validate bed updates

## 📝 License

This project is part of a demonstration/portfolio project.

## 🤝 Contributing

This is an MVP demonstration project. For production use, consider:
- Adding comprehensive error handling
- Implementing proper authentication/authorization
- Adding data validation
- Setting up proper testing
- Implementing analytics
- Adding more advanced features (scheduling, billing, etc.)

## 📧 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using React, TypeScript, and React Three Fiber**
