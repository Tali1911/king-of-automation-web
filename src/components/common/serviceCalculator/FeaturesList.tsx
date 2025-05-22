
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Feature, ServiceType } from './types';

interface FeaturesListProps {
  serviceType: ServiceType;
  selectedFeatures: string[];
  serviceFeatures: Record<ServiceType, Feature[]>;
  onFeatureToggle: (featureId: string) => void;
}

const FeaturesList = ({ 
  serviceType, 
  selectedFeatures, 
  serviceFeatures,
  onFeatureToggle 
}: FeaturesListProps) => {
  const percentComplete = Math.min(
    100, 
    selectedFeatures.length > 0 ? 
      (selectedFeatures.length / serviceFeatures[serviceType].length) * 100 : 
      0
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">Select Features</h3>
        <span className="text-xs text-muted-foreground">
          {selectedFeatures.length}/{serviceFeatures[serviceType].length} selected
        </span>
      </div>
      <Progress value={percentComplete} className="h-1 mb-4" />
      
      <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
        {serviceFeatures[serviceType].map((feature) => (
          <div key={feature.id} className="flex space-x-3">
            <Checkbox 
              id={feature.id} 
              checked={selectedFeatures.includes(feature.id)} 
              onCheckedChange={() => onFeatureToggle(feature.id)}
            />
            <div>
              <label 
                htmlFor={feature.id} 
                className="text-sm font-medium cursor-pointer"
              >
                {feature.name}
              </label>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
            <div className="ml-auto text-sm font-medium">
              ${feature.basePrice}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesList;
