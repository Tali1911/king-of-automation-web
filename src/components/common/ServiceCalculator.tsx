
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { X } from 'lucide-react';
import { ServiceType } from './serviceCalculator/types';
import { serviceFeatures } from './serviceCalculator/types';
import FeaturesList from './serviceCalculator/FeaturesList';
import ServiceTypeSelector from './serviceCalculator/ServiceTypeSelector';
import UrgencyToggle from './serviceCalculator/UrgencyToggle';
import { calculateTotal } from './serviceCalculator/calculatorUtils';

const ServiceCalculator = () => {
  const [serviceType, setServiceType] = useState<ServiceType>('website');
  const [isUrgent, setIsUrgent] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleServiceTypeChange = (type: ServiceType) => {
    setServiceType(type);
    setSelectedFeatures([]);
  };

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="fixed bottom-6 left-6 z-40 w-80 md:w-96 shadow-xl rounded-xl"
    >
      <CollapsibleTrigger className="bg-primary text-white p-3 rounded-t-xl w-full flex justify-between items-center">
        <span className="font-medium">Service Cost Calculator</span>
        <span className="text-xs bg-white text-primary px-2 py-1 rounded-full">
          {isOpen ? "Close" : "Open"}
        </span>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <Card className="border-t-0 rounded-t-none relative">
          <button 
            onClick={handleClose}
            className="absolute right-2 top-2 p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close calculator"
          >
            <X className="h-4 w-4" />
          </button>

          <CardHeader className="pt-8">
            <CardTitle>Estimate Your Project Cost</CardTitle>
            <CardDescription>
              Select service type and features to get an estimate
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Service Type Selection */}
            <ServiceTypeSelector 
              serviceType={serviceType} 
              onSelectServiceType={handleServiceTypeChange} 
            />
            
            {/* Features */}
            <FeaturesList 
              serviceType={serviceType}
              selectedFeatures={selectedFeatures}
              serviceFeatures={serviceFeatures}
              onFeatureToggle={handleFeatureToggle}
            />
            
            {/* Priority Option */}
            <UrgencyToggle 
              isUrgent={isUrgent}
              onToggleUrgency={setIsUrgent}
            />
          </CardContent>
          
          <CardFooter className="flex-col">
            <div className="w-full py-4 border-t border-b flex justify-between items-center">
              <span>Estimated Total:</span>
              <span className="text-2xl font-bold">
                ${calculateTotal(serviceType, selectedFeatures, isUrgent)}
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground mt-3 text-center">
              This is just an estimate. Contact us for a detailed quote.
            </p>
            
            <a 
              href="/contact"
              className="w-full mt-4 bg-primary text-white py-2 rounded-md text-center font-medium hover:bg-primary/90 transition-colors"
            >
              Request Detailed Quote
            </a>
          </CardFooter>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ServiceCalculator;
