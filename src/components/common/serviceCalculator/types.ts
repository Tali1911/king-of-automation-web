
export type ServiceType = 'website' | 'webapp' | 'data';

export type Feature = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
};

export const serviceFeatures: Record<ServiceType, Feature[]> = {
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

export const basePrice: Record<ServiceType, number> = {
  website: 1000,
  webapp: 2500,
  data: 1800
};
