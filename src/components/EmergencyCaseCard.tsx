import { AlertCircle, Clock, User, Bed, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Emergency } from '@/types';

interface EmergencyCaseCardProps {
  emergency: Emergency;
  onResolve: (caseId: string) => void;
}

export function EmergencyCaseCard({ emergency, onResolve }: EmergencyCaseCardProps) {
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / 1000 / 60);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} hours ago`;
  };

  return (
    <Card className="p-4 border-l-4 border-destructive shadow-card">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-destructive/10">
          <AlertCircle className="w-5 h-5 text-destructive" />
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm">{emergency.case_id}</h4>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {getTimeAgo(emergency.created_at)}
            </span>
          </div>
          
          <p className="text-sm font-semibold text-destructive">{emergency.case_type}</p>
          
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-3 h-3" />
              <span>{emergency.patient_name}</span>
            </div>
            
            {emergency.assigned_bed && (
              <div className="flex items-center gap-2">
                <Bed className="w-3 h-3" />
                <span>Bed: {emergency.assigned_bed}</span>
              </div>
            )}
            
            {emergency.assigned_nurse && (
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3" />
                <span>{emergency.assigned_nurse}</span>
              </div>
            )}
            
            {emergency.assigned_doctor && (
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3" />
                <span>{emergency.assigned_doctor}</span>
              </div>
            )}
          </div>
          
          <Button
            size="sm"
            variant="outline"
            className="w-full mt-2"
            onClick={() => onResolve(emergency.case_id)}
          >
            Resolve
          </Button>
        </div>
      </div>
    </Card>
  );
}
