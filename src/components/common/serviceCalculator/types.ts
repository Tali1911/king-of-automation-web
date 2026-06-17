
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
      name: 'Look & Feel',
      features: [
        { id: 'custom-design', name: 'Custom Design', description: 'A unique look that matches your brand' },
        { id: 'responsive', name: 'Works on Phones & Tablets', description: 'Looks great on any screen size' },
        { id: 'animations', name: 'Smooth Animations', description: 'Eye-catching movement and transitions' },
        { id: 'multilang', name: 'Multiple Languages', description: 'Reach customers in different countries' }
      ]
    },
    {
      name: 'Content You Can Update',
      features: [
        { id: 'cms', name: 'Easy Content Editor', description: 'Update text and images yourself — no coding needed' },
        { id: 'blog', name: 'Blog or News Section', description: 'Share company updates and articles' },
        { id: 'gallery', name: 'Photo & Video Galleries', description: 'Showcase your work with images and videos' },
        { id: 'faq', name: 'FAQ Page', description: 'Answer common customer questions automatically' }
      ]
    },
    {
      name: 'Sell Online',
      features: [
        { id: 'ecommerce', name: 'Online Store', description: 'Sell products directly from your website' },
        { id: 'payment', name: 'Accept Payments Online', description: 'Let customers pay by card or mobile money' },
        { id: 'cart', name: 'Shopping Cart', description: 'Customers can add items and check out easily' },
        { id: 'inventory', name: 'Stock Tracking', description: 'Know what you have left in real time' }
      ]
    },
    {
      name: 'Stay Connected With Visitors',
      features: [
        { id: 'contact-form', name: 'Contact Forms', description: 'Let people send you messages directly' },
        { id: 'newsletter', name: 'Email Signup', description: 'Collect emails to stay in touch' },
        { id: 'social', name: 'Social Media Links', description: 'Connect to Facebook, Instagram, LinkedIn, etc.' },
        { id: 'live-chat', name: 'Live Chat', description: 'Talk to visitors in real time on your site' },
        { id: 'testimonials', name: 'Customer Reviews', description: 'Show what happy clients say about you' },
        { id: 'booking', name: 'Appointment Booking', description: 'Let clients book meetings or services online' }
      ]
    },
    {
      name: 'Get Found on Google',
      features: [
        { id: 'seo', name: 'Google Search Setup', description: 'Help customers find you on Google' },
        { id: 'analytics', name: 'Visitor Tracking', description: 'See how many people visit and what they do' },
        { id: 'search', name: 'Site Search', description: 'Let visitors quickly find what they need on your site' }
      ]
    },
    {
      name: 'Member Areas',
      features: [
        { id: 'user-accounts', name: 'Login Area', description: 'Private pages for members or staff' },
        { id: 'user-profiles', name: 'User Profiles', description: 'Personal pages for each member' }
      ]
    }
  ],
  webapp: [
    {
      name: 'Login & Security',
      features: [
        { id: 'user-auth', name: 'Secure Login', description: 'Users sign in safely with passwords' },
        { id: 'multi-roles', name: 'Different User Levels', description: 'Admins, staff, and customers see different things' },
        { id: 'sso', name: 'Login With Google / Other Apps', description: 'Sign in using existing accounts like Gmail' },
        { id: '2fa', name: 'Extra Security (2FA)', description: 'Add a code sent to your phone for safety' }
      ]
    },
    {
      name: 'Store & Manage Files',
      features: [
        { id: 'database', name: 'Smart Data Storage', description: 'Keep records organised and easy to find' },
        { id: 'file-upload', name: 'Upload Files', description: 'Users can upload documents, images, or PDFs' },
        { id: 'data-export', name: 'Download & Import Data', description: 'Move data in and out easily (e.g. Excel)' },
        { id: 'backup', name: 'Automatic Backups', description: 'Never lose your data — saved automatically' }
      ]
    },
    {
      name: 'Connect With Other Tools',
      features: [
        { id: 'api', name: 'Link to Other Software', description: 'Talk to tools you already use (e.g. WhatsApp, email)' },
        { id: 'webhooks', name: 'Instant Updates', description: 'Get notified when something important happens' },
        { id: 'third-party', name: 'Plug In Other Services', description: 'Works with payment, SMS, or email providers' }
      ]
    },
    {
      name: 'Control Panel for You',
      features: [
        { id: 'dashboard', name: 'Admin Dashboard', description: 'One place to see everything happening' },
        { id: 'activity-log', name: 'Activity History', description: 'Track who did what and when' },
        { id: 'analytics-report', name: 'Reports & Insights', description: 'See how your business is performing' },
        { id: 'user-management', name: 'Manage Users', description: 'Add, remove, or edit users easily' }
      ]
    },
    {
      name: 'Automatic Messages & Alerts',
      features: [
        { id: 'realtime-notif', name: 'In-App Notifications', description: 'Pop-up alerts inside the app' },
        { id: 'email-notif', name: 'Auto Email Alerts', description: 'Emails sent automatically when things happen' },
        { id: 'sms-notif', name: 'SMS Text Alerts', description: 'Send important updates by text message' },
        { id: 'messaging', name: 'Built-In Chat', description: 'Users can message each other inside the app' }
      ]
    },
    {
      name: 'Payments & Billing',
      features: [
        { id: 'payment-process', name: 'Accept Online Payments', description: 'Let people pay inside the app' },
        { id: 'subscriptions', name: 'Monthly / Yearly Billing', description: 'Charge customers on a recurring schedule' },
        { id: 'invoicing', name: 'Auto-Create Invoices', description: 'Generate and send invoices automatically' }
      ]
    },
    {
      name: 'Advanced Tools',
      features: [
        { id: 'search-filter', name: 'Smart Search & Filters', description: 'Find anything fast, even in large data' },
        { id: 'scheduling', name: 'Calendar & Scheduling', description: 'Book appointments and manage events' },
        { id: 'pwa', name: 'Works Like a Phone App', description: 'Users can add it to their home screen' },
        { id: 'doc-gen', name: 'Auto-Create Documents', description: 'Make PDFs, reports, or certificates instantly' }
      ]
    }
  ],
  data: [
    {
      name: 'Gather Your Data',
      features: [
        { id: 'collection', name: 'Collect Data', description: 'Bring in data from many places at once' },
        { id: 'web-scraping', name: 'Pull Data From Websites', description: 'Automatically grab public info online' },
        { id: 'api-integration', name: 'Connect Data Sources', description: 'Link to tools like Google Sheets or CRMs' },
        { id: 'form-data', name: 'Capture Form Entries', description: 'Save answers from online forms' }
      ]
    },
    {
      name: 'Clean & Organise',
      features: [
        { id: 'processing', name: 'Process Raw Data', description: 'Turn messy info into something useful' },
        { id: 'cleaning', name: 'Fix Errors & Duplicates', description: 'Remove mistakes and repeated records' },
        { id: 'etl', name: 'Move Data Between Systems', description: 'Sync data across different platforms' },
        { id: 'warehousing', name: 'Central Data Hub', description: 'One place where all your data lives' }
      ]
    },
    {
      name: 'Find Insights',
      features: [
        { id: 'statistical', name: 'Deep Number Crunching', description: 'Understand patterns with statistics' },
        { id: 'predictive', name: 'Predict the Future', description: 'Forecast sales, demand, or trends' },
        { id: 'ml-models', name: 'Smart Predictions (AI)', description: 'Let AI spot opportunities for you' },
        { id: 'trend', name: 'Spot Trends Over Time', description: 'See what is growing or slowing down' },
        { id: 'comparative', name: 'Compare Performance', description: 'Stack up different products, teams, or periods' }
      ]
    },
    {
      name: 'Charts & Reports',
      features: [
        { id: 'visualization', name: 'Visual Dashboards', description: 'See your data as charts and graphs' },
        { id: 'dashboards', name: 'Live Updates', description: 'Numbers refresh automatically in real time' },
        { id: 'reporting', name: 'Auto Reports', description: 'Get weekly or monthly summaries emailed to you' },
        { id: 'scheduled', name: 'Scheduled Reports', description: 'Reports sent to your inbox automatically' },
        { id: 'custom-metrics', name: 'Track What Matters', description: 'Custom goals and KPIs for your business' }
      ]
    },
    {
      name: 'Export & Share',
      features: [
        { id: 'data-export', name: 'Download Reports', description: 'Export to Excel, PDF, or other formats' },
        { id: 'api-access', name: 'Share Data With Other Tools', description: 'Let other apps read your data safely' },
        { id: 'alerting', name: 'Smart Alerts', description: 'Get warned when something needs attention' }
      ]
    },
    {
      name: 'Speed & Reliability',
      features: [
        { id: 'monitoring', name: 'System Health Check', description: 'Make sure everything runs smoothly' },
        { id: 'optimization', name: 'Speed Up Processing', description: 'Get answers faster from large data sets' }
      ]
    }
  ]
};
