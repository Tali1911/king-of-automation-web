
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, BarChart3, Globe } from 'lucide-react';

// Helper function to check if an element is in viewport
const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
  );
};

const ServicesSection = () => {
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
    // Initial check
    animateOnScroll();

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  const services = [
    {
      icon: <Globe className="w-12 h-12 text-primary" />,
      title: "Website Development",
      description: "Custom designed and developed websites that reflect your brand identity and engage your audience.",
      link: "/services/web-development",
      delay: 0
    },
    {
      icon: <Code className="w-12 h-12 text-primary" />,
      title: "Web Applications",
      description: "Transforming manual processes into efficient automated workflows with custom web applications.",
      link: "/services/automation",
      delay: 0.2
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      title: "Data Analysis",
      description: "Unlock insights from your data to drive strategic decision-making and business growth.",
      link: "/services/data-analysis",
      comingSoon: true,
      delay: 0.4
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container-custom">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle mx-auto">
            We provide end-to-end solutions to help businesses leverage technology for growth
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
