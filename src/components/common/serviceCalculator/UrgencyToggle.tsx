
import React from 'react';
import { Switch } from '@/components/ui/switch';

interface UrgencyToggleProps {
  isUrgent: boolean;
  onToggleUrgency: (value: boolean) => void;
}

const UrgencyToggle = ({ isUrgent, onToggleUrgency }: UrgencyToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium">Urgent Priority</h3>
        <p className="text-xs text-muted-foreground">40% faster delivery time</p>
      </div>
      <Switch 
        checked={isUrgent}
        onCheckedChange={onToggleUrgency}
      />
    </div>
  );
};

export default UrgencyToggle;
