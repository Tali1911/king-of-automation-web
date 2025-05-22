
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { X } from 'lucide-react';

type ServiceType = 'website' | 'webapp' | 'data';
type Feature = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
};

const ServiceCalculator = () => {
  const [serviceType, setServiceType] = useState<ServiceType>('website');
  const [isUrgent, setIsUrgent] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const serviceFeatures: Record<ServiceType, Feature[]> = {
    website: [
      { id: 'design', name: 'Custom Design', description: 'Tailored design that fits your brand', basePrice: 800 },
      { id: 'responsive', name: 'Responsive Design', description: 'Works on all devices', basePrice: 500 },
      { id: 'cms', name: 'CMS Integration', description: 'Easily update your content', basePrice: 700 },
      { id: 'seo', name: 'SEO Optimization', description: 'Improve your search ranking', basePrice: 400 }
    ],
    webapp: [
      { id: 'user-auth', name: 'User Authentication', description: 'Secure login system', basePrice: 900 },
      { id: 'database', name: 'Database Integration', description: 'Store and manage data', basePrice: 1200 },
      { id: 'api', name: 'API Development', description: 'Connect with other systems', basePrice: 1500 },
      { id: 'dashboard', name: 'Admin Dashboard', description: 'Monitor and manage your application', basePrice: 1000 }
    ],
    data: [
      { id: 'collection', name: 'Data Collection', description: 'Gather data from various sources', basePrice: 600 },
      { id: 'processing', name: 'Data Processing', description: 'Clean and transform data', basePrice: 800 },
      { id: 'visualization', name: 'Data Visualization', description: 'Create insightful charts and graphs', basePrice: 700 },
      { id: 'reporting', name: 'Automated Reporting', description: 'Generate periodic reports', basePrice: 900 }
    ]
  };

  const basePrice: Record<ServiceType, number> = {
    website: 1000,
    webapp: 2500,
    data: 1800
  };

  const urgencyMultiplier = isUrgent ? 1.4 : 1;

  const calculateTotal = () => {
    let featuresTotal = 0;
    const currentFeatures = serviceFeatures[serviceType];
    
    selectedFeatures.forEach(featureId => {
      const feature = currentFeatures.find(f => f.id === featureId);
      if (feature) {
        featuresTotal += feature.basePrice;
      }
    });
    
    const total = (basePrice[serviceType] + featuresTotal) * urgencyMultiplier;
    return total.toFixed(0);
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

  const percentComplete = Math.min(
    100, 
    selectedFeatures.length > 0 ? 
      (selectedFeatures.length / serviceFeatures[serviceType].length) * 100 : 
      0
  );

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
            <div>
              <h3 className="text-sm font-medium mb-2">Service Type</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${serviceType === 'website' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => {
                    setServiceType('website');
                    setSelectedFeatures([]);
                  }}
                >
                  Website Development
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${serviceType === 'webapp' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => {
                    setServiceType('webapp');
                    setSelectedFeatures([]);
                  }}
                >
                  Web Application
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${serviceType === 'data' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => {
                    setServiceType('data');
                    setSelectedFeatures([]);
                  }}
                >
                  Data Analysis
                </button>
              </div>
            </div>
            
            {/* Features */}
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
                      onCheckedChange={() => handleFeatureToggle(feature.id)}
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
            
            {/* Priority Option */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Urgent Priority</h3>
                <p className="text-xs text-muted-foreground">40% faster delivery time</p>
              </div>
              <Switch 
                checked={isUrgent}
                onCheckedChange={setIsUrgent}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex-col">
            <div className="w-full py-4 border-t border-b flex justify-between items-center">
              <span>Estimated Total:</span>
              <span className="text-2xl font-bold">${calculateTotal()}</span>
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
