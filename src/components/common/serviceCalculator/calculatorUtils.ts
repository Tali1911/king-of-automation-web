
import { ServiceType, basePrice, serviceFeatures } from './types';

export const calculateTotal = (
  serviceType: ServiceType, 
  selectedFeatures: string[], 
  isUrgent: boolean
): string => {
  let featuresTotal = 0;
  const currentCategories = serviceFeatures[serviceType];
  
  selectedFeatures.forEach(featureId => {
    const feature = currentCategories
      .flatMap(cat => cat.features)
      .find(f => f.id === featureId);
    if (feature) {
      featuresTotal += feature.basePrice;
    }
  });
  
  const urgencyMultiplier = isUrgent ? 1.4 : 1;
  const total = (basePrice[serviceType] + featuresTotal) * urgencyMultiplier;
  return total.toFixed(0);
};
