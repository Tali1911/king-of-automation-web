
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
      className="fixed bottom-6 left-6 z-40 w-80 md:w-96 shadow-xl rounded-xl max-h-[calc(100vh-100px)] overflow-auto"
    >
      <CollapsibleTrigger className="bg-primary text-primary-foreground p-3 rounded-t-xl w-full flex justify-between items-center hover:opacity-90 transition-opacity">
        <span className="font-medium text-sm">Service Cost Calculator</span>
        <span className="text-xs bg-background text-foreground px-2 py-1 rounded-full">
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

          <CardHeader className="pt-6 pb-3 px-4">
            <CardTitle className="text-lg">Estimate Your Project Cost</CardTitle>
            <CardDescription className="text-xs">
              Select service type and features. We'll get back to you with a detailed quote.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 px-4 py-2">
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
          
          <CardFooter className="flex-col p-4">
            <div className="w-full py-3 border-t border-b flex justify-between items-center">
              <span className="text-sm">Estimated Total:</span>
              <span className="text-xl font-bold">
                ${calculateTotal(serviceType, selectedFeatures, isUrgent)}
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This is an estimate. We'll review your selections and send you a detailed quote.
            </p>
            
            <button 
              className="w-full mt-3 bg-primary text-primary-foreground py-2 rounded-md text-center text-sm font-medium hover:opacity-90 transition-opacity"
              onClick={() => {
                // TODO: Integrate with login and quote request system
                alert('Quote request feature coming soon! For now, please contact us directly.');
              }}
            >
              Request Detailed Quote
            </button>
          </CardFooter>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ServiceCalculator;
