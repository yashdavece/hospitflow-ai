# 🚀 CareFlow Nexus - Quick Start Guide

Get your AI Hospital Management System up and running in 5 minutes!

## ⚡ Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## 🎮 First Time Usage

### Step 1: Login
1. Open `http://localhost:8080`
2. Use demo credentials:
   - **Email**: `admin@hospital.com`
   - **Password**: `admin123`
3. Click **Login**

### Step 2: Hospital Setup Wizard
On first login, you'll go through a 3-step setup:

#### **Step 1: Hospital Details**
- Hospital Name: `City General Hospital`
- Location: `Mumbai`
- Contact: `+91-22-12345678`
- Floors: `3`

#### **Step 2: Configure Resources**
- Beds: `30`
- Nurses: `10`
- Doctors: `8`
- ICU Beds: `5`

#### **Step 3: Review & Generate**
- Review your settings
- Click **🚀 Generate Hospital**
- Wait 2-3 seconds for generation
- Auto-redirect to dashboard

### Step 3: Explore the Dashboard

#### 📊 **Status Overview**
See at a glance:
- Total beds vs available beds
- Active nurses and doctors
- Active emergencies count
- System status

#### 🚨 **Trigger Emergency**
Test the emergency system:
1. Select emergency type (e.g., "Cardiac Emergency")
2. Enter patient name
3. Enter caller phone
4. Click **TRIGGER EMERGENCY**
5. Watch AI auto-assign bed, nurse, and doctor
6. See the emergency in the active list

#### 🏥 **3D Bed Map**
Explore the 3D visualization:
- **Switch Floors**: Click Floor 1, 2, or 3 buttons
- **Rotate View**: Click and drag
- **Zoom**: Scroll wheel
- **View Bed**: Click any bed to see details
- **Hover**: Hover over beds for quick info

**Color Legend:**
- ⬜ **White** = Available
- 🟥 **Red** = Occupied (has patient)
- 🟨 **Yellow** = Cleaning
- 🟦 **Blue** = ICU

#### 📋 **Resource Management**
View and manage resources:
- **Nurses Tab**: See all nurses, their status, assignments
- **Beds Tab**: List view of all beds with details
- **Doctors Tab**: See all doctors, their status, assignments

## 🎯 Testing Features

### Test Emergency Flow
```
1. Click "TRIGGER EMERGENCY"
2. Select: "Cardiac Emergency"
3. Patient: "John Doe"
4. Phone: "+91-9876543210"
5. Submit → See auto-assignment
6. Check active emergencies list
7. Click "Resolve" to close case
```

### Test 3D Navigation
```
1. Switch to Floor 2
2. Click on an occupied bed (red)
3. See patient details in modal
4. Try zooming and rotating
5. Hover over different beds
```

### Test Resource Tables
```
1. Click "Nurses" tab
2. See nurse with "busy" status
3. Check their assignment
4. Switch to "Doctors" tab
5. View doctor specializations
```

## 🎨 Customization

### Change Hospital Info
Edit setup values on first login, or clear localStorage:
```javascript
localStorage.clear()
// Refresh page to start setup again
```

### Mock Data Location
All demo data is in: `src/lib/mockData.ts`

### Design System
Colors and tokens: `src/index.css` and `tailwind.config.ts`

## 🔧 Common Issues

### Issue: 3D Map Not Loading
**Solution**: Check browser console for WebGL errors. Most modern browsers support WebGL.

### Issue: Can't Login
**Solution**: Any email/password works in demo mode. Check browser console for errors.

### Issue: Setup Complete but Redirects to Setup
**Solution**: Clear localStorage:
```javascript
localStorage.clear()
```

## 📱 Mobile Support

The dashboard is responsive but best viewed on desktop/tablet for the 3D visualization.

## 🚀 Next Steps

Once you've explored the MVP:

1. **Connect Backend**: Set up real API endpoints
2. **Add Authentication**: Implement proper JWT auth
3. **Real-time Updates**: Connect Socket.io to backend
4. **Add Features**: Analytics, scheduling, billing, etc.

## 💡 Tips

- **Performance**: The 3D map performs best with 50-100 beds per floor
- **Navigation**: Use keyboard shortcuts in 3D view (shift + drag to pan)
- **Emergencies**: Test multiple simultaneous emergencies to see the system in action
- **Resources**: Try changing nurse/doctor status to see dashboard updates

## 🎓 Learn More

- Check `README_PROJECT.md` for full documentation
- Explore component files in `src/components/`
- Review state management in `src/store/`
- Study 3D implementation in `src/components/BedMap3D.tsx`

---

**Need Help?** Open an issue in the repository or check the detailed README.

**Ready to Deploy?** See deployment section in main README.

Enjoy building with CareFlow Nexus! 🏥✨
