
export type ServiceType = 'website' | 'webapp' | 'data';

export type Feature = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
};

export type FeatureCategory = {
  name: string;
  features: Feature[];
};

export const serviceFeatures: Record<ServiceType, FeatureCategory[]> = {
  website: [
    {
      name: 'Design & Layout',
      features: [
        { id: 'custom-design', name: 'Custom Design', description: 'Tailored design that fits your brand', basePrice: 800 },
        { id: 'responsive', name: 'Responsive Design', description: 'Works on all devices', basePrice: 500 },
        { id: 'animations', name: 'Custom Animations', description: 'Engaging visual effects', basePrice: 600 },
        { id: 'multilang', name: 'Multi-language Support', description: 'Reach global audiences', basePrice: 900 }
      ]
    },
    {
      name: 'Content Management',
      features: [
        { id: 'cms', name: 'CMS Integration', description: 'Easily update your content', basePrice: 700 },
        { id: 'blog', name: 'Blog/News Section', description: 'Share updates and articles', basePrice: 500 },
        { id: 'gallery', name: 'Photo/Video Galleries', description: 'Showcase visual content', basePrice: 400 },
        { id: 'faq', name: 'FAQ Section', description: 'Answer common questions', basePrice: 300 }
      ]
    },
    {
      name: 'E-commerce',
      features: [
        { id: 'ecommerce', name: 'E-commerce Functionality', description: 'Sell products online', basePrice: 1500 },
        { id: 'payment', name: 'Payment Gateway', description: 'Accept online payments', basePrice: 800 },
        { id: 'cart', name: 'Shopping Cart', description: 'Product management system', basePrice: 700 },
        { id: 'inventory', name: 'Inventory Management', description: 'Track stock levels', basePrice: 900 }
      ]
    },
    {
      name: 'User Engagement',
      features: [
        { id: 'contact-form', name: 'Contact Forms', description: 'Let visitors reach you', basePrice: 300 },
        { id: 'newsletter', name: 'Newsletter Integration', description: 'Build your email list', basePrice: 400 },
        { id: 'social', name: 'Social Media Integration', description: 'Connect social platforms', basePrice: 350 },
        { id: 'live-chat', name: 'Live Chat Widget', description: 'Real-time customer support', basePrice: 600 },
        { id: 'testimonials', name: 'Testimonials Section', description: 'Display customer reviews', basePrice: 300 },
        { id: 'booking', name: 'Booking System', description: 'Schedule appointments', basePrice: 1000 }
      ]
    },
    {
      name: 'Marketing & SEO',
      features: [
        { id: 'seo', name: 'SEO Optimization', description: 'Improve search rankings', basePrice: 400 },
        { id: 'analytics', name: 'Analytics Integration', description: 'Track visitor behavior', basePrice: 350 },
        { id: 'search', name: 'Search Functionality', description: 'Help users find content', basePrice: 500 }
      ]
    },
    {
      name: 'User Features',
      features: [
        { id: 'user-accounts', name: 'User Accounts/Login', description: 'Member area access', basePrice: 800 },
        { id: 'user-profiles', name: 'User Profiles', description: 'Personalized user pages', basePrice: 600 }
      ]
    }
  ],
  webapp: [
    {
      name: 'Authentication & Security',
      features: [
        { id: 'user-auth', name: 'User Authentication', description: 'Secure login system', basePrice: 900 },
        { id: 'multi-roles', name: 'Multi-user Roles', description: 'Different permission levels', basePrice: 700 },
        { id: 'sso', name: 'Single Sign-On (SSO)', description: 'Third-party login integration', basePrice: 1100 },
        { id: '2fa', name: 'Two-Factor Authentication', description: 'Extra security layer', basePrice: 800 }
      ]
    },
    {
      name: 'Database & Storage',
      features: [
        { id: 'database', name: 'Database Integration', description: 'Store and manage data', basePrice: 1200 },
        { id: 'file-upload', name: 'File Upload/Management', description: 'Handle user files', basePrice: 800 },
        { id: 'data-export', name: 'Data Export/Import', description: 'Bulk data operations', basePrice: 700 },
        { id: 'backup', name: 'Automated Backups', description: 'Data protection', basePrice: 600 }
      ]
    },
    {
      name: 'API & Integrations',
      features: [
        { id: 'api', name: 'API Development', description: 'Connect with other systems', basePrice: 1500 },
        { id: 'webhooks', name: 'Webhooks', description: 'Real-time event notifications', basePrice: 800 },
        { id: 'third-party', name: 'Third-party Integrations', description: 'Connect external services', basePrice: 1000 }
      ]
    },
    {
      name: 'Admin & Management',
      features: [
        { id: 'dashboard', name: 'Admin Dashboard', description: 'Monitor and manage application', basePrice: 1000 },
        { id: 'activity-log', name: 'Activity Logging', description: 'Track user actions', basePrice: 600 },
        { id: 'analytics-report', name: 'Reporting & Analytics', description: 'Business insights', basePrice: 900 },
        { id: 'user-management', name: 'User Management Panel', description: 'Manage users and permissions', basePrice: 800 }
      ]
    },
    {
      name: 'Notifications & Communication',
      features: [
        { id: 'realtime-notif', name: 'Real-time Notifications', description: 'Instant in-app alerts', basePrice: 700 },
        { id: 'email-notif', name: 'Email Notifications', description: 'Automated email alerts', basePrice: 500 },
        { id: 'sms-notif', name: 'SMS Notifications', description: 'Text message alerts', basePrice: 600 },
        { id: 'messaging', name: 'Messaging/Chat', description: 'User-to-user communication', basePrice: 1200 }
      ]
    },
    {
      name: 'Payments & Subscriptions',
      features: [
        { id: 'payment-process', name: 'Payment Processing', description: 'Accept payments', basePrice: 1000 },
        { id: 'subscriptions', name: 'Subscription Management', description: 'Recurring billing', basePrice: 1100 },
        { id: 'invoicing', name: 'Automated Invoicing', description: 'Generate invoices', basePrice: 700 }
      ]
    },
    {
      name: 'Advanced Features',
      features: [
        { id: 'search-filter', name: 'Advanced Search/Filtering', description: 'Complex data queries', basePrice: 900 },
        { id: 'scheduling', name: 'Scheduling/Calendar', description: 'Event management', basePrice: 1000 },
        { id: 'pwa', name: 'Mobile App (PWA)', description: 'Progressive web app', basePrice: 1300 },
        { id: 'doc-gen', name: 'Document Generation', description: 'Create PDFs and reports', basePrice: 800 }
      ]
    }
  ],
  data: [
    {
      name: 'Data Collection',
      features: [
        { id: 'collection', name: 'Data Collection', description: 'Gather data from various sources', basePrice: 600 },
        { id: 'web-scraping', name: 'Web Scraping', description: 'Extract web data', basePrice: 900 },
        { id: 'api-integration', name: 'API Integration', description: 'Connect data sources', basePrice: 800 },
        { id: 'form-data', name: 'Form Data Collection', description: 'Capture user inputs', basePrice: 500 }
      ]
    },
    {
      name: 'Data Processing',
      features: [
        { id: 'processing', name: 'Data Processing', description: 'Clean and transform data', basePrice: 800 },
        { id: 'cleaning', name: 'Data Cleaning/Validation', description: 'Ensure data quality', basePrice: 700 },
        { id: 'etl', name: 'ETL Pipelines', description: 'Extract, transform, load workflows', basePrice: 1200 },
        { id: 'warehousing', name: 'Data Warehousing', description: 'Centralized data storage', basePrice: 1500 }
      ]
    },
    {
      name: 'Analysis & Insights',
      features: [
        { id: 'statistical', name: 'Statistical Analysis', description: 'Advanced statistics', basePrice: 1000 },
        { id: 'predictive', name: 'Predictive Analytics', description: 'Forecast future trends', basePrice: 1800 },
        { id: 'ml-models', name: 'Machine Learning Models', description: 'AI-powered insights', basePrice: 2000 },
        { id: 'trend', name: 'Trend Analysis', description: 'Identify patterns over time', basePrice: 900 },
        { id: 'comparative', name: 'Comparative Analysis', description: 'Compare datasets', basePrice: 800 }
      ]
    },
    {
      name: 'Visualization & Reporting',
      features: [
        { id: 'visualization', name: 'Data Visualization', description: 'Create insightful charts', basePrice: 700 },
        { id: 'dashboards', name: 'Real-time Dashboards', description: 'Live data monitoring', basePrice: 1100 },
        { id: 'reporting', name: 'Automated Reporting', description: 'Generate periodic reports', basePrice: 900 },
        { id: 'scheduled', name: 'Scheduled Reports', description: 'Automated report delivery', basePrice: 600 },
        { id: 'custom-metrics', name: 'Custom Metrics', description: 'Define KPIs', basePrice: 800 }
      ]
    },
    {
      name: 'Export & Integration',
      features: [
        { id: 'data-export', name: 'Data Export', description: 'Multiple export formats', basePrice: 500 },
        { id: 'api-access', name: 'API Access', description: 'Programmatic data access', basePrice: 900 },
        { id: 'alerting', name: 'Alerting System', description: 'Automated alerts', basePrice: 700 }
      ]
    },
    {
      name: 'Performance & Monitoring',
      features: [
        { id: 'monitoring', name: 'Performance Monitoring', description: 'Track system health', basePrice: 800 },
        { id: 'optimization', name: 'Query Optimization', description: 'Faster data processing', basePrice: 900 }
      ]
    }
  ]
};

export const basePrice: Record<ServiceType, number> = {
  website: 1000,
  webapp: 2500,
  data: 1800
};
