import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Rocket, Building2, Landmark } from 'lucide-react';

const packages = [
  {
    name: 'Starter',
    icon: <Rocket className="w-8 h-8 text-secondary" />,
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
    icon: <Building2 className="w-8 h-8 text-secondary" />,
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
    icon: <Landmark className="w-8 h-8 text-secondary" />,
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

const PricingSection = () => {
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
    <section id="pricing" className="py-20 bg-muted">
      <div className="container-custom">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="section-title">Simple Packages, No Surprises</h2>
          <p className="section-subtitle mx-auto">
            Pick a starting point. We tailor every project to your exact needs — and you own everything we build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`animate-on-scroll relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                pkg.highlighted
                  ? 'bg-gradient-to-br from-primary to-[#0A3472] text-white border-primary shadow-lg scale-[1.02] md:scale-[1.03]'
                  : 'bg-white border-gray-100'
              }`}
              style={{ transitionDelay: `${pkg.delay}s` }}
            >
              {pkg.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-primary text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${pkg.highlighted ? 'bg-white/10' : 'bg-primary/5'}`}>
                  {pkg.icon}
                </div>
                <h3 className={`text-2xl font-bold ${pkg.highlighted ? 'text-white' : 'text-primary'}`}>
                  {pkg.name}
                </h3>
              </div>

              <p className={`text-sm mb-6 ${pkg.highlighted ? 'text-white/80' : 'text-gray-500'}`}>
                {pkg.tagline}
              </p>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${pkg.highlighted ? 'text-secondary' : 'text-primary'}`} />
                    <span className={`text-sm ${pkg.highlighted ? 'text-white/90' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`block text-center font-medium py-3 px-6 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                  pkg.highlighted
                    ? 'bg-white text-primary'
                    : 'bg-primary text-white'
                }`}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <p className="text-gray-500 text-sm">
            Not sure which one fits?{' '}
            <Link to="/contact" className="text-primary font-medium underline underline-offset-2 hover:text-secondary transition-colors">
              Tell us what you need and we will suggest the right package.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
