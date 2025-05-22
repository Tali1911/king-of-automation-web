
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
      <h3 className="text-sm font-medium mb-2">Service Type</h3>
      <div className="flex flex-wrap gap-2">
        <button 
          className={`px-3 py-1 rounded-md text-sm ${serviceType === 'website' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => onSelectServiceType('website')}
        >
          Website Development
        </button>
        <button 
          className={`px-3 py-1 rounded-md text-sm ${serviceType === 'webapp' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => onSelectServiceType('webapp')}
        >
          Web Application
        </button>
        <button 
          className={`px-3 py-1 rounded-md text-sm ${serviceType === 'data' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          onClick={() => onSelectServiceType('data')}
        >
          Data Analysis
        </button>
      </div>
    </div>
  );
};

export default ServiceTypeSelector;
