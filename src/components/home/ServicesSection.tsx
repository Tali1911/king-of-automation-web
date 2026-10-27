import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, BarChart3, Globe } from 'lucide-react';
import { usePublicPageContent } from '@/hooks/usePageContent';

// Helper function to check if an element is in viewport
const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
  );
};

const ServicesSection = () => {
  const { getContent } = usePublicPageContent('home');

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');

      elements.forEach((element) => {
        if (isInViewport(element as HTMLElement)) {
          element.classList.add('show');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  const sectionTitle = getContent('services_title', 'What We Build For You');
  const sectionSubtitle = getContent('services_subtitle', 'Custom-built tools that work while you sleep — no monthly platform fees, no limits, fully yours.');

  const services = [
    {
      icon: <Globe className="h-11 w-11 text-[#33c3f0]" />,
      title: "Website Development",
      description: "A fast, beautiful website you can update yourself. Built to be found on Google and turn visitors into customers.",
      link: "/services/web-development",
      delay: 0
    },
    {
      icon: <Code className="h-11 w-11 text-[#33c3f0]" />,
      title: "Web Apps & Automation",
      description: "Custom systems that handle your emails, CRM, invoices, payments, and content — automatically. Replace expensive subscriptions with one tool built just for you.",
      link: "/services/automation",
      delay: 0.2
    },
    {
      icon: <BarChart3 className="h-11 w-11 text-[#33c3f0]" />,
      title: "Data Analysis",
      description: "Turn your spreadsheets and reports into clear answers, so you actually know what's working in your business.",
      link: "/services/data-analysis",
      comingSoon: true,
      delay: 0.4
    }
  ];

  return (
    <section id="services" className="relative py-24 overflow-hidden bg-[#040a14]">
      {/* Ambient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-60"
        style={{ background: 'rgba(10,36,99,0.4)' }}
      />
      <div className="container-custom relative">
        <div className="mb-16 text-center animate-on-scroll">
          <span className="eyebrow-badge mb-5">What We Do</span>
          <h2 className="section-title">{sectionTitle}</h2>
          <p className="section-subtitle mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card glow-border animate-on-scroll p-8"
              style={{ transitionDelay: `${service.delay}s` }}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: 'rgba(51,195,240,0.08)', border: '1px solid rgba(51,195,240,0.22)' }}>
                {service.icon}
              </div>
              <h3 className="font-display mb-3 text-xl font-bold text-white">{service.title}</h3>
              <p className="mb-6 text-[#9db2c9]">{service.description}</p>

              {service.comingSoon ? (
                <div className="inline-block rounded-lg px-4 py-2 text-sm font-medium text-[#8fa6bf]" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  Coming Soon
                </div>
              ) : (
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 font-medium text-[#33c3f0] transition-colors hover:text-[#7fdcff]"
                >
                  Learn More <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
