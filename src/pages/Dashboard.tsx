import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Hospital, Users, Heart, LogOut, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusCard } from '@/components/StatusCard';
import { EmergencyTrigger } from '@/components/EmergencyTrigger';
import { EmergencyCaseCard } from '@/components/EmergencyCaseCard';
import { ResourceTable } from '@/components/ResourceTable';
import BedMap3D from '@/components/BedMap3D';
import { BedDetailsModal } from '@/components/BedDetailsModal';
import { useHospitalStore } from '@/store/hospitalStore';
import { mockBeds, mockNurses, mockDoctors, mockStats, mockHospitalInfo } from '@/lib/mockData';
import { connectSocket } from '@/lib/socket';
import { toast } from 'sonner';
import type { Emergency } from '@/types';

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    hospitalInfo,
    stats,
    beds,
    nurses,
    doctors,
    emergencies,
    selectedBed,
    currentFloor,
    setHospitalInfo,
    setStats,
    setBeds,
    setNurses,
    setDoctors,
    setEmergencies,
    setSelectedBed,
    setCurrentFloor,
    addEmergency,
    removeEmergency,
  } = useHospitalStore();

  const [showBedModal, setShowBedModal] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Load mock data
    setHospitalInfo(mockHospitalInfo);
    setStats(mockStats);
    setBeds(mockBeds);
    setNurses(mockNurses);
    setDoctors(mockDoctors);
    setEmergencies([]);

    // Connect to socket (will work once backend is ready)
    connectSocket();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleBedClick = (bed: any) => {
    setSelectedBed(bed);
    setShowBedModal(true);
  };

  const handleEmergencyTriggered = (emergency: Emergency) => {
    addEmergency(emergency);
  };

  const handleResolveEmergency = (caseId: string) => {
    removeEmergency(caseId);
    toast.success('Emergency resolved successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">CareFlow Nexus</h1>
                <p className="text-sm text-muted-foreground">
                  {hospitalInfo?.hospital_name || 'Loading...'}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Status Overview */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Status Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatusCard
              title="Total Beds"
              value={stats?.total_beds || 0}
              icon={Hospital}
              subtitle="Hospital capacity"
            />
            <StatusCard
              title="Available Beds"
              value={stats?.available_beds || 0}
              icon={Hospital}
              variant="success"
              subtitle="Ready for patients"
            />
            <StatusCard
              title="Nurses"
              value={`${stats?.available_nurses || 0}/${stats?.total_nurses || 0}`}
              icon={Users}
              subtitle="Active staff"
            />
            <StatusCard
              title="Active Emergencies"
              value={emergencies.length}
              icon={Heart}
              variant={emergencies.length > 0 ? 'error' : 'default'}
              subtitle="Urgent cases"
            />
            <StatusCard
              title="System Status"
              value="🟢 Online"
              icon={Activity}
              variant="success"
              subtitle="All systems operational"
            />
          </div>
        </section>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Emergency & Active Cases */}
          <div className="space-y-6">
            <EmergencyTrigger onEmergencyTriggered={handleEmergencyTriggered} />

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                Active Emergencies ({emergencies.length})
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {emergencies.length === 0 ? (
                  <div className="text-center p-8 bg-muted/50 rounded-lg">
                    <Info className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No active emergencies</p>
                  </div>
                ) : (
                  emergencies.map((emergency) => (
                    <EmergencyCaseCard
                      key={emergency.case_id}
                      emergency={emergency}
                      onResolve={handleResolveEmergency}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - 3D Bed Map */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">3D Bed Map</h3>
                <div className="flex gap-2">
                  {Array.from({ length: hospitalInfo?.floors || 3 }, (_, i) => i + 1).map(
                    (floor) => (
                      <Button
                        key={floor}
                        size="sm"
                        variant={currentFloor === floor ? 'default' : 'outline'}
                        onClick={() => setCurrentFloor(floor)}
                      >
                        Floor {floor}
                      </Button>
                    )
                  )}
                </div>
              </div>

              <BedMap3D
                beds={beds}
                currentFloor={currentFloor}
                onBedClick={handleBedClick}
                selectedBed={selectedBed}
              />

              {/* Legend */}
              <div className="flex flex-wrap gap-4 justify-center p-4 bg-card rounded-lg shadow-card">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-white border-2 border-muted" />
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-destructive" />
                  <span className="text-sm">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-warning" />
                  <span className="text-sm">Cleaning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-accent" />
                  <span className="text-sm">ICU</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Management Tabs */}
        <section className="bg-card rounded-lg shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Resource Management</h2>
          <Tabs defaultValue="nurses">
            <TabsList className="mb-4">
              <TabsTrigger value="nurses">👩‍⚕️ Nurses</TabsTrigger>
              <TabsTrigger value="beds">🏥 Beds</TabsTrigger>
              <TabsTrigger value="doctors">👨‍⚕️ Doctors</TabsTrigger>
            </TabsList>

            <TabsContent value="nurses">
              <ResourceTable type="nurses" data={nurses} />
            </TabsContent>

            <TabsContent value="beds">
              <ResourceTable type="beds" data={beds} />
            </TabsContent>

            <TabsContent value="doctors">
              <ResourceTable type="doctors" data={doctors} />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Bed Details Modal */}
      <BedDetailsModal
        bed={selectedBed}
        isOpen={showBedModal}
        onClose={() => setShowBedModal(false)}
      />
    </div>
  );
}
