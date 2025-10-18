import { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { emergencyTypes } from '@/lib/mockData';

interface EmergencyTriggerProps {
  onEmergencyTriggered: (data: any) => void;
}

export function EmergencyTrigger({ onEmergencyTriggered }: EmergencyTriggerProps) {
  const [emergencyType, setEmergencyType] = useState('');
  const [patientName, setPatientName] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emergencyType || !patientName || !callerPhone) {
      toast.error('Please fill all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const emergencyData = {
        case_id: `EMG-${Date.now()}`,
        case_type: emergencyType,
        patient_name: patientName,
        caller_phone: callerPhone,
        status: 'active',
        created_at: new Date().toISOString(),
        assigned_bed: '201A',
        assigned_nurse: 'Sarah Johnson',
        assigned_doctor: 'Dr. Ramesh Kumar',
      };
      
      onEmergencyTriggered(emergencyData);
      
      toast.success('Emergency triggered successfully!', {
        description: `Assigned: Bed ${emergencyData.assigned_bed}, ${emergencyData.assigned_nurse}, ${emergencyData.assigned_doctor}`,
      });
      
      // Reset form
      setEmergencyType('');
      setPatientName('');
      setCallerPhone('');
    } catch (error) {
      toast.error('Failed to trigger emergency');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-destructive" />
        <h3 className="text-lg font-semibold">Emergency Trigger</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="emergency-type">Emergency Type</Label>
          <Select value={emergencyType} onValueChange={setEmergencyType}>
            <SelectTrigger id="emergency-type" className="bg-popover">
              <SelectValue placeholder="Select emergency type" />
            </SelectTrigger>
            <SelectContent className="bg-popover z-50">
              {emergencyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="patient-name">Patient Name</Label>
          <Input
            id="patient-name"
            type="text"
            placeholder="Enter patient name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="bg-popover"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="caller-phone">Caller Phone</Label>
          <Input
            id="caller-phone"
            type="tel"
            placeholder="+91-9876543210"
            value={callerPhone}
            onChange={(e) => setCallerPhone(e.target.value)}
            className="bg-popover"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold py-6 text-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 mr-2" />
              TRIGGER EMERGENCY
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
