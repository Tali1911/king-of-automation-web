
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { FeatureCategory, ServiceType } from './types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface FeaturesListProps {
  serviceType: ServiceType;
  selectedFeatures: string[];
  serviceFeatures: Record<ServiceType, FeatureCategory[]>;
  onFeatureToggle: (featureId: string) => void;
}

const FeaturesList = ({ 
  serviceType, 
  selectedFeatures, 
  serviceFeatures,
  onFeatureToggle 
}: FeaturesListProps) => {
  const allFeatures = serviceFeatures[serviceType].flatMap(cat => cat.features);
  const totalFeatures = allFeatures.length;
  const percentComplete = Math.min(
    100, 
    selectedFeatures.length > 0 ? 
      (selectedFeatures.length / totalFeatures) * 100 : 
      0
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-medium">Select Features</h3>
        <span className="text-xs text-muted-foreground">
          {selectedFeatures.length}/{totalFeatures} selected
        </span>
      </div>
      <Progress value={percentComplete} className="h-1 mb-3" />
      
      <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
        {serviceFeatures[serviceType].map((category, idx) => (
          <Collapsible key={idx} defaultOpen={idx === 0} className="border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-accent/50 transition-colors rounded-lg">
              <span className="text-xs font-semibold">{category.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {category.features.filter(f => selectedFeatures.includes(f.id)).length}/{category.features.length}
                </span>
                <ChevronDown className="h-3 w-3 transition-transform ui-expanded:rotate-180" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-2 pb-2 space-y-2">
              {category.features.map((feature) => (
                <div key={feature.id} className="flex space-x-2 py-1">
                  <Checkbox 
                    id={feature.id} 
                    checked={selectedFeatures.includes(feature.id)} 
                    onCheckedChange={() => onFeatureToggle(feature.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-grow">
                    <label 
                      htmlFor={feature.id} 
                      className="text-xs font-medium cursor-pointer"
                    >
                      {feature.name}
                    </label>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                  <div className="text-xs font-medium whitespace-nowrap text-primary">
                    ${feature.basePrice}
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default FeaturesList;
