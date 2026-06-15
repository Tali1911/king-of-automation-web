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
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: "Website Development",
      description: "A fast, beautiful website you can update yourself. Built to be found on Google and turn visitors into customers.",
      link: "/services/web-development",
      delay: 0
    },
    {
      icon: <Code className="w-12 h-12 text-primary" />,
      title: "Web Apps & Automation",
      description: "Custom systems that handle your emails, CRM, invoices, payments, and content — automatically. Replace expensive subscriptions with one tool built just for you.",
      link: "/services/automation",
      delay: 0.2
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      title: "Data Analysis",
      description: "Turn your spreadsheets and reports into clear answers, so you actually know what's working in your business.",
      link: "/services/data-analysis",
      comingSoon: true,
      delay: 0.4
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container-custom">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="section-title">{sectionTitle}</h2>
          <p className="section-subtitle mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="service-card animate-on-scroll"
              style={{transitionDelay: `${service.delay}s`}}
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-primary">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              {service.comingSoon ? (
                <div className="inline-block bg-gray-200 text-gray-600 px-4 py-2 rounded font-medium">
                  Coming Soon
                </div>
              ) : (
                <Link 
                  to={service.link} 
                  className="text-primary font-medium hover:text-secondary transition-colors"
                >
                  Learn More →
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
