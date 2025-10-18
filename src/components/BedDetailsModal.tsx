import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bed as BedIcon, User, Users } from 'lucide-react';
import type { Bed } from '@/types';

interface BedDetailsModalProps {
  bed: Bed | null;
  isOpen: boolean;
  onClose: () => void;
  onRelease?: (bedId: number) => void;
}

export function BedDetailsModal({ bed, isOpen, onClose, onRelease }: BedDetailsModalProps) {
  if (!bed) return null;

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      available: 'bg-success text-success-foreground',
      occupied: 'bg-destructive text-destructive-foreground',
      cleaning: 'bg-warning text-warning-foreground',
      icu: 'bg-accent text-accent-foreground',
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BedIcon className="w-5 h-5" />
            Bed {bed.bed_number}
          </DialogTitle>
          <DialogDescription>
            Room {bed.room_number} • Floor {bed.floor}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span>
            <Badge className={`${getStatusColor(bed.status)} capitalize`}>
              {bed.status}
            </Badge>
          </div>
          
          {bed.patient_name && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <User className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Patient</p>
                <p className="text-sm text-muted-foreground">{bed.patient_name}</p>
              </div>
            </div>
          )}
          
          {bed.assigned_nurse_id && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Assigned Nurse</p>
                <p className="text-sm text-muted-foreground">ID: {bed.assigned_nurse_id}</p>
              </div>
            </div>
          )}
          
          {bed.assigned_doctor_id && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Assigned Doctor</p>
                <p className="text-sm text-muted-foreground">ID: {bed.assigned_doctor_id}</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-muted text-sm">
            <div>
              <p className="text-muted-foreground">Position X</p>
              <p className="font-medium">{bed.position_x.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Position Z</p>
              <p className="font-medium">{bed.position_z.toFixed(1)}</p>
            </div>
          </div>
          
          {bed.status === 'occupied' && onRelease && (
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                onRelease(bed.id);
                onClose();
              }}
            >
              Release Bed
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
