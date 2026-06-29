import React from 'react';
import { ServiceType, serviceFeatures } from './types';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import PackageRecommendation from './PackageRecommendation';

interface SelectionPreviewProps {
  selectedServiceTypes: ServiceType[];
  selectedFeatures: string[];
  onRemoveFeature: (featureId: string) => void;
}

const serviceTypeLabels: Record<ServiceType, string> = {
  website: 'A New Website',
  webapp: 'A Business Tool / App',
  data: 'Help With My Data'
};

const SelectionPreview = ({ 
  selectedServiceTypes, 
  selectedFeatures,
  onRemoveFeature 
}: SelectionPreviewProps) => {
  
  const getFeaturesByServiceType = (serviceType: ServiceType) => {
    return serviceFeatures[serviceType]
      .flatMap(category => category.features)
      .filter(feature => selectedFeatures.includes(feature.id));
  };

  if (selectedFeatures.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">Nothing picked yet</p>
        <p className="text-xs mt-1">Go back and tick what you need</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedServiceTypes.map(serviceType => {
        const features = getFeaturesByServiceType(serviceType);
        if (features.length === 0) return null;
        
        return (
          <div key={serviceType} className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold">{serviceTypeLabels[serviceType]}</h4>
              <Badge variant="secondary" className="text-xs">
                {features.length} {features.length === 1 ? 'item' : 'items'}
              </Badge>
            </div>
            <ul className="space-y-1.5">
              {features.map(feature => (
                <li key={feature.id} className="flex items-start justify-between group">
                  <span className="text-xs">• {feature.name}</span>
                  <button
                    onClick={() => onRemoveFeature(feature.id)}
                    className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove ${feature.name}`}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default SelectionPreview;