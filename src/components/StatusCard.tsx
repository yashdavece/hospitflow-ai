import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export function StatusCard({ title, value, icon: Icon, subtitle, variant = 'default' }: StatusCardProps) {
  const variantStyles = {
    default: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-destructive',
  };

  return (
    <Card className="p-6 shadow-card hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className={cn('p-3 rounded-lg bg-muted', variantStyles[variant])}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </Card>
  );
}
