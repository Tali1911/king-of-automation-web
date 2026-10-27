import React, { useEffect } from 'react';
import { Check, Rocket, Building2, Landmark } from 'lucide-react';

interface PricingSectionProps {
  onRequestQuote?: (pkg: 'Starter' | 'Growth' | 'Enterprise' | 'Not sure yet') => void;
}

const packages = [
  {
    name: 'Starter',
    icon: <Rocket className="h-7 w-7 text-[#33c3f0]" />,
    tagline: 'Get online fast',
    features: [
      'Custom website (up to 5 pages)',
      'Mobile-friendly design',
      'Basic SEO setup',
      'Simple contact form',
      'Google Maps integration',
      'Social media links',
    ],
    cta: 'Request a Quote',
    highlighted: false,
    delay: 0,
  },
  {
    name: 'Growth',
    icon: <Building2 className="h-7 w-7 text-[#33c3f0]" />,
    tagline: 'Automate the busywork',
    features: [
      'Everything in Starter',
      'CMS to edit content yourself',
      'Email automation setup',
      'Lead capture forms & CRM',
      'Payment gateway integration',
      'Blog or news section',
      '3 months support included',
    ],
    cta: 'Request a Quote',
    highlighted: true,
    delay: 0.15,
  },
  {
    name: 'Enterprise',
    icon: <Landmark className="h-7 w-7 text-[#33c3f0]" />,
    tagline: 'Full business systems',
    features: [
      'Everything in Growth',
      'Custom web app or dashboard',
      'Full CRM automation',
      'Accounting & invoicing sync',
      'Data analysis & reporting',
      'Multi-user access levels',
      '6 months priority support',
    ],
    cta: 'Request a Quote',
    highlighted: false,
    delay: 0.3,
  },
];

const PricingSection = ({ onRequestQuote }: PricingSectionProps = {}) => {
  useEffect(() => {
    const animateOnScroll = () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85) {
          el.classList.add('show');
        }
      });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <section id="pricing" className="relative py-24 overflow-hidden bg-[#040a14]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl opacity-50"
        style={{ background: 'rgba(10,36,99,0.45)' }}
      />
      <div className="container-custom relative">
        <div className="mb-16 text-center animate-on-scroll">
          <span className="eyebrow-badge mb-5">Packages</span>
          <h2 className="section-title">Simple Packages, No Surprises</h2>
          <p className="section-subtitle mx-auto">
            Pick a starting point. We tailor every project to your exact needs — and you own everything we build.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`animate-on-scroll glow-border relative rounded-2xl p-8 transition-all duration-300 ${
                pkg.highlighted
                  ? 'md:scale-[1.03]'
                  : 'glass-card'
              }`}
              style={
                pkg.highlighted
                  ? {
                      background: 'linear-gradient(150deg, rgba(10,36,99,0.85), rgba(5,15,30,0.92))',
                      boxShadow: '0 30px 90px -40px rgba(51,195,240,0.4)',
                    }
                  : { transitionDelay: `${pkg.delay}s` }
              }
            >
              {pkg.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#05101f]"
                  style={{ background: 'linear-gradient(100deg, #33c3f0, #7fdcff)', boxShadow: '0 0 20px rgba(51,195,240,0.5)' }}
                >
                  Most Popular
                </div>
              )}

              <div className="mb-2 flex items-center gap-3">
                <div
                  className="rounded-xl p-2.5"
                  style={{ background: 'rgba(51,195,240,0.08)', border: '1px solid rgba(51,195,240,0.22)' }}
                >
                  {pkg.icon}
                </div>
                <h3 className="font-display text-2xl font-bold text-white">{pkg.name}</h3>
              </div>

              <p className="mb-6 text-sm text-[#8fa6bf]">{pkg.tagline}</p>

              <ul className="mb-8 space-y-3">
                {pkg.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#33c3f0]" />
                    <span className="text-sm text-[#c6d5e6]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onRequestQuote?.(pkg.name as 'Starter' | 'Growth' | 'Enterprise')}
                className={`block w-full rounded-lg py-3 text-center font-medium transition-all hover:-translate-y-0.5 ${
                  pkg.highlighted
                    ? 'text-[#05101f]'
                    : 'glass-panel text-white hover:text-[#33c3f0]'
                }`}
                style={
                  pkg.highlighted
                    ? { background: 'linear-gradient(100deg, #33c3f0, #7fdcff)', boxShadow: '0 0 26px rgba(51,195,240,0.35)' }
                    : undefined
                }
              >
                {pkg.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <p className="text-sm text-[#8fa6bf]">
            Not sure which one fits?{' '}
            <button
              type="button"
              onClick={() => onRequestQuote?.('Not sure yet')}
              className="font-medium text-[#33c3f0] underline underline-offset-4 transition-colors hover:text-[#7fdcff]"
            >
              Tell us what you need and we will suggest the right package.
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
