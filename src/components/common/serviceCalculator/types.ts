
export type ServiceType = 'website' | 'webapp' | 'data';

export type Feature = {
  id: string;
  name: string;
  description: string;
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
        { id: 'custom-design', name: 'Custom Design', description: 'Tailored design that fits your brand' },
        { id: 'responsive', name: 'Responsive Design', description: 'Works on all devices' },
        { id: 'animations', name: 'Custom Animations', description: 'Engaging visual effects' },
        { id: 'multilang', name: 'Multi-language Support', description: 'Reach global audiences' }
      ]
    },
    {
      name: 'Content Management',
      features: [
        { id: 'cms', name: 'CMS Integration', description: 'Easily update your content' },
        { id: 'blog', name: 'Blog/News Section', description: 'Share updates and articles' },
        { id: 'gallery', name: 'Photo/Video Galleries', description: 'Showcase visual content' },
        { id: 'faq', name: 'FAQ Section', description: 'Answer common questions' }
      ]
    },
    {
      name: 'E-commerce',
      features: [
        { id: 'ecommerce', name: 'E-commerce Functionality', description: 'Sell products online' },
        { id: 'payment', name: 'Payment Gateway', description: 'Accept online payments' },
        { id: 'cart', name: 'Shopping Cart', description: 'Product management system' },
        { id: 'inventory', name: 'Inventory Management', description: 'Track stock levels' }
      ]
    },
    {
      name: 'User Engagement',
      features: [
        { id: 'contact-form', name: 'Contact Forms', description: 'Let visitors reach you' },
        { id: 'newsletter', name: 'Newsletter Integration', description: 'Build your email list' },
        { id: 'social', name: 'Social Media Integration', description: 'Connect social platforms' },
        { id: 'live-chat', name: 'Live Chat Widget', description: 'Real-time customer support' },
        { id: 'testimonials', name: 'Testimonials Section', description: 'Display customer reviews' },
        { id: 'booking', name: 'Booking System', description: 'Schedule appointments' }
      ]
    },
    {
      name: 'Marketing & SEO',
      features: [
        { id: 'seo', name: 'SEO Optimization', description: 'Improve search rankings' },
        { id: 'analytics', name: 'Analytics Integration', description: 'Track visitor behavior' },
        { id: 'search', name: 'Search Functionality', description: 'Help users find content' }
      ]
    },
    {
      name: 'User Features',
      features: [
        { id: 'user-accounts', name: 'User Accounts/Login', description: 'Member area access' },
        { id: 'user-profiles', name: 'User Profiles', description: 'Personalized user pages' }
      ]
    }
  ],
  webapp: [
    {
      name: 'Authentication & Security',
      features: [
        { id: 'user-auth', name: 'User Authentication', description: 'Secure login system' },
        { id: 'multi-roles', name: 'Multi-user Roles', description: 'Different permission levels' },
        { id: 'sso', name: 'Single Sign-On (SSO)', description: 'Third-party login integration' },
        { id: '2fa', name: 'Two-Factor Authentication', description: 'Extra security layer' }
      ]
    },
    {
      name: 'Database & Storage',
      features: [
        { id: 'database', name: 'Database Integration', description: 'Store and manage data' },
        { id: 'file-upload', name: 'File Upload/Management', description: 'Handle user files' },
        { id: 'data-export', name: 'Data Export/Import', description: 'Bulk data operations' },
        { id: 'backup', name: 'Automated Backups', description: 'Data protection' }
      ]
    },
    {
      name: 'API & Integrations',
      features: [
        { id: 'api', name: 'API Development', description: 'Connect with other systems' },
        { id: 'webhooks', name: 'Webhooks', description: 'Real-time event notifications' },
        { id: 'third-party', name: 'Third-party Integrations', description: 'Connect external services' }
      ]
    },
    {
      name: 'Admin & Management',
      features: [
        { id: 'dashboard', name: 'Admin Dashboard', description: 'Monitor and manage application' },
        { id: 'activity-log', name: 'Activity Logging', description: 'Track user actions' },
        { id: 'analytics-report', name: 'Reporting & Analytics', description: 'Business insights' },
        { id: 'user-management', name: 'User Management Panel', description: 'Manage users and permissions' }
      ]
    },
    {
      name: 'Notifications & Communication',
      features: [
        { id: 'realtime-notif', name: 'Real-time Notifications', description: 'Instant in-app alerts' },
        { id: 'email-notif', name: 'Email Notifications', description: 'Automated email alerts' },
        { id: 'sms-notif', name: 'SMS Notifications', description: 'Text message alerts' },
        { id: 'messaging', name: 'Messaging/Chat', description: 'User-to-user communication' }
      ]
    },
    {
      name: 'Payments & Subscriptions',
      features: [
        { id: 'payment-process', name: 'Payment Processing', description: 'Accept payments' },
        { id: 'subscriptions', name: 'Subscription Management', description: 'Recurring billing' },
        { id: 'invoicing', name: 'Automated Invoicing', description: 'Generate invoices' }
      ]
    },
    {
      name: 'Advanced Features',
      features: [
        { id: 'search-filter', name: 'Advanced Search/Filtering', description: 'Complex data queries' },
        { id: 'scheduling', name: 'Scheduling/Calendar', description: 'Event management' },
        { id: 'pwa', name: 'Mobile App (PWA)', description: 'Progressive web app' },
        { id: 'doc-gen', name: 'Document Generation', description: 'Create PDFs and reports' }
      ]
    }
  ],
  data: [
    {
      name: 'Data Collection',
      features: [
        { id: 'collection', name: 'Data Collection', description: 'Gather data from various sources' },
        { id: 'web-scraping', name: 'Web Scraping', description: 'Extract web data' },
        { id: 'api-integration', name: 'API Integration', description: 'Connect data sources' },
        { id: 'form-data', name: 'Form Data Collection', description: 'Capture user inputs' }
      ]
    },
    {
      name: 'Data Processing',
      features: [
        { id: 'processing', name: 'Data Processing', description: 'Clean and transform data' },
        { id: 'cleaning', name: 'Data Cleaning/Validation', description: 'Ensure data quality' },
        { id: 'etl', name: 'ETL Pipelines', description: 'Extract, transform, load workflows' },
        { id: 'warehousing', name: 'Data Warehousing', description: 'Centralized data storage' }
      ]
    },
    {
      name: 'Analysis & Insights',
      features: [
        { id: 'statistical', name: 'Statistical Analysis', description: 'Advanced statistics' },
        { id: 'predictive', name: 'Predictive Analytics', description: 'Forecast future trends' },
        { id: 'ml-models', name: 'Machine Learning Models', description: 'AI-powered insights' },
        { id: 'trend', name: 'Trend Analysis', description: 'Identify patterns over time' },
        { id: 'comparative', name: 'Comparative Analysis', description: 'Compare datasets' }
      ]
    },
    {
      name: 'Visualization & Reporting',
      features: [
        { id: 'visualization', name: 'Data Visualization', description: 'Create insightful charts' },
        { id: 'dashboards', name: 'Real-time Dashboards', description: 'Live data monitoring' },
        { id: 'reporting', name: 'Automated Reporting', description: 'Generate periodic reports' },
        { id: 'scheduled', name: 'Scheduled Reports', description: 'Automated report delivery' },
        { id: 'custom-metrics', name: 'Custom Metrics', description: 'Define KPIs' }
      ]
    },
    {
      name: 'Export & Integration',
      features: [
        { id: 'data-export', name: 'Data Export', description: 'Multiple export formats' },
        { id: 'api-access', name: 'API Access', description: 'Programmatic data access' },
        { id: 'alerting', name: 'Alerting System', description: 'Automated alerts' }
      ]
    },
    {
      name: 'Performance & Monitoring',
      features: [
        { id: 'monitoring', name: 'Performance Monitoring', description: 'Track system health' },
        { id: 'optimization', name: 'Query Optimization', description: 'Faster data processing' }
      ]
    }
  ]
};
