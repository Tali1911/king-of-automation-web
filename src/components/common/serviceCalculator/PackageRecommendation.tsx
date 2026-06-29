import React from 'react';
import { Sparkles, Rocket, Building2, Landmark } from 'lucide-react';
import { ServiceType } from './types';

interface PackageRecommendationProps {
  selectedServiceTypes: ServiceType[];
  selectedFeatures: string[];
}

type Tier = 'Starter' | 'Growth' | 'Enterprise';

const GROWTH_SIGNALS = [
  'cms', 'blog', 'ecommerce', 'payment', 'cart', 'newsletter',
  'booking', 'live-chat', 'seo', 'analytics',
];

const ENTERPRISE_SIGNALS = [
  'user-auth', 'multi-roles', 'sso', '2fa', 'database', 'api',
  'webhooks', 'third-party', 'dashboard', 'analytics-report',
  'subscriptions', 'invoicing', 'ml-models', 'predictive', 'etl',
  'warehousing', 'doc-gen', 'user-management',
];

const tierMeta: Record<Tier, { icon: React.ReactNode; tagline: string; reason: string }> = {
  Starter: {
    icon: <Rocket className="w-5 h-5" />,
    tagline: 'Get online fast',
    reason: 'Your picks fit a focused website launch.',
  },
  Growth: {
    icon: <Building2 className="w-5 h-5" />,
    tagline: 'Automate the busywork',
    reason: 'You picked items that need a CMS, payments, or marketing automation.',
  },
  Enterprise: {
    icon: <Landmark className="w-5 h-5" />,
    tagline: 'Full business systems',
    reason: 'You picked advanced features like custom apps, integrations, or data tools.',
  },
};

export const recommendPackage = (
  serviceTypes: ServiceType[],
  features: string[],
): Tier => {
  const hasWebapp = serviceTypes.includes('webapp');
  const hasData = serviceTypes.includes('data');
  const enterpriseHits = features.filter(f => ENTERPRISE_SIGNALS.includes(f)).length;
  const growthHits = features.filter(f => GROWTH_SIGNALS.includes(f)).length;

  if (hasWebapp || hasData || enterpriseHits >= 2 || features.length > 10) {
    return 'Enterprise';
  }
  if (growthHits >= 2 || features.length > 5) {
    return 'Growth';
  }
  return 'Starter';
};

const PackageRecommendation = ({
  selectedServiceTypes,
  selectedFeatures,
}: PackageRecommendationProps) => {
  if (selectedFeatures.length === 0) return null;

  const tier = recommendPackage(selectedServiceTypes, selectedFeatures);
  const meta = tierMeta[tier];

  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          Suggested Package
        </span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-primary">{meta.icon}</span>
        <span className="text-sm font-bold text-primary">{tier}</span>
        <span className="text-xs text-muted-foreground">— {meta.tagline}</span>
      </div>
      <p className="text-xs text-muted-foreground">{meta.reason}</p>
    </div>
  );
};

export default PackageRecommendation;
