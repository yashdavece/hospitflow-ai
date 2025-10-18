import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Nurse, Doctor, Bed } from '@/types';

interface ResourceTableProps {
  type: 'nurses' | 'doctors' | 'beds';
  data: Nurse[] | Doctor[] | Bed[];
}

export function ResourceTable({ type, data }: ResourceTableProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      available: 'default',
      busy: 'secondary',
      'off-duty': 'destructive',
      occupied: 'destructive',
      cleaning: 'secondary',
      icu: 'default',
    };
    
    return (
      <Badge variant={variants[status] || 'default'} className="capitalize">
        {status === 'available' ? '🟢 Available' : status === 'busy' ? '🟡 Busy' : status === 'off-duty' ? '⚫ Off-duty' : status}
      </Badge>
    );
  };

  if (type === 'nurses') {
    const nurses = data as Nurse[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nurses.map((nurse) => (
            <TableRow key={nurse.id}>
              <TableCell className="font-medium">{nurse.name}</TableCell>
              <TableCell>{nurse.nurse_id}</TableCell>
              <TableCell>{nurse.specialization}</TableCell>
              <TableCell>{getStatusBadge(nurse.status)}</TableCell>
              <TableCell className="text-muted-foreground">
                {nurse.current_assignment || '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (type === 'doctors') {
    const doctors = data as Doctor[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell className="font-medium">{doctor.name}</TableCell>
              <TableCell>{doctor.doctor_id}</TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>{getStatusBadge(doctor.status)}</TableCell>
              <TableCell className="text-muted-foreground">
                {doctor.current_assignment || '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  // Beds
  const beds = data as Bed[];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bed Number</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Floor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Patient</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {beds.map((bed) => (
          <TableRow key={bed.id}>
            <TableCell className="font-medium">{bed.bed_number}</TableCell>
            <TableCell>{bed.room_number}</TableCell>
            <TableCell>{bed.floor}</TableCell>
            <TableCell>{getStatusBadge(bed.status)}</TableCell>
            <TableCell className="text-muted-foreground">
              {bed.patient_name || '-'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
