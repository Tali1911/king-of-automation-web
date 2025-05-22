
import React from 'react';
import { ServiceType } from './types';

interface ServiceTypeSelectorProps {
  serviceType: ServiceType;
  onSelectServiceType: (type: ServiceType) => void;
}

const ServiceTypeSelector = ({ 
  serviceType, 
  onSelectServiceType 
}: ServiceTypeSelectorProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-1">Service Type</h3>
      <div className="flex flex-wrap gap-1">
        <button 
          className={`px-2 py-1 rounded-md text-xs ${serviceType === 'website' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => onSelectServiceType('website')}
        >
          Website Development
        </button>
        <button 
          className={`px-2 py-1 rounded-md text-xs ${serviceType === 'webapp' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => onSelectServiceType('webapp')}
        >
          Web Application
        </button>
        <button 
          className={`px-2 py-1 rounded-md text-xs ${serviceType === 'data' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => onSelectServiceType('data')}
        >
          Data Analysis
        </button>
      </div>
    </div>
  );
};

export default ServiceTypeSelector;
