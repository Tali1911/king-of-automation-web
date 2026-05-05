import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, BarChart3, Globe, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { usePublicPageContent } from '@/hooks/usePageContent';

const ServicesPage = () => {
  const { getContent } = usePublicPageContent('services');

  // Animation on scroll functionality
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8) {
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

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroTitle = getContent('hero_title', 'Our Services');
  const heroSubtitle = getContent('hero_subtitle', 'We provide end-to-end technology solutions tailored to your specific business needs, focusing on automation, efficiency, and growth.');
  const webDevTitle = getContent('web_dev_title', 'Website Development for Branding');
  const webDevDescription = getContent('web_dev_description', 'We create custom, responsive websites that reflect your brand identity and engage your audience. Our websites are designed to convert visitors into customers through intuitive navigation and compelling content.');
  const automationTitle = getContent('automation_title', 'Web Applications for Automation');
  const automationDescription = getContent('automation_description', 'Transform manual processes into efficient automated workflows with our custom web applications. We identify inefficiencies in your operations and create tailored solutions to streamline your business processes.');
  const dataTitle = getContent('data_title', 'Data Analysis Services');
  const dataDescription = getContent('data_description', 'Unlock insights from your data to drive strategic decision-making. Our upcoming data analysis services will help you harness the power of your information to identify trends, forecast outcomes, and optimize operations.');

  const services = [
    {
      icon: <Globe size={48} className="text-white" />,
      title: webDevTitle,
      description: webDevDescription,
      features: [
        "Custom design and development",
        "Mobile-responsive layouts",
        "SEO optimization",
        "Content management systems",
        "Performance optimization",
        "Analytics integration"
      ],
      link: "/services/web-development",
      bgColor: "bg-primary"
    },
    {
      icon: <Code size={48} className="text-white" />,
      title: automationTitle,
      description: automationDescription,
      features: [
        "Custom workflow automation",
        "Process optimization",
        "Integration with existing systems",
        "Real-time dashboards",
        "User-friendly interfaces",
        "Secure data management"
      ],
      link: "/services/automation",
      bgColor: "bg-accent"
    },
    {
      icon: <BarChart3 size={48} className="text-white" />,
      title: dataTitle,
      description: dataDescription,
      features: [
        "Business intelligence solutions",
        "Custom data models",
        "Predictive analytics",
        "Data visualization",
        "Automated reporting",
        "Strategic recommendations"
      ],
      link: "/services/data-analysis",
      bgColor: "bg-secondary",
      comingSoon: true
    }
  ];

  const servicesPageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "Organization", 
      "name": "NafArro Solutions"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Automation Services",
      "itemListElement": services.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        }
      }))
    }
  };

  return (
    <>
      <SEO 
        title="Our Services - Website Development, Web Apps & Data Analysis | NafArro Solutions"
        description="NafArro Solutions services: custom website development, web app automation and data analysis for growing businesses."
        keywords="website development services, web application automation, data analysis services, custom web development, business process automation, React development, Node.js services"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schemaData={servicesPageSchema}
      />
      <div className="pt-20">
        {/* Services Header */}
        <div className="bg-primary text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">{heroTitle}</h1>
            <p className="text-xl text-gray-300 max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {heroSubtitle}
            </p>
          </div>
        </div>

        {/* Services Detail */}
        <section className="py-16">
          <div className="container-custom">
            <div className="space-y-20">
              {services.map((service, index) => (
                <div key={index} className="animate-on-scroll" style={{ transitionDelay: `${index * 0.2}s` }}>
                  <div className={`rounded-lg overflow-hidden shadow-lg ${service.comingSoon ? 'relative' : ''}`}>
                    {service.comingSoon && (
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-1 rounded-full font-medium z-10">
                        Coming Soon
                      </div>
                    )}
                    
                    <div className={`${service.bgColor} p-8 text-white`}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center mb-6 md:mb-0">
                          <div className="bg-white/20 p-4 rounded-lg mr-6">
                            {service.icon}
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold">{service.title}</h2>
                        </div>
                        
                        {!service.comingSoon && (
                          <Link 
                            to={service.link} 
                            className="inline-flex items-center bg-white text-primary px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                          >
                            Learn More
                            <ArrowRight size={18} className="ml-2" />
                          </Link>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-8 bg-white">
                      <p className="text-gray-700 mb-8 text-lg">
                        {service.description}
                      </p>
                      
                      <h3 className="text-xl font-bold mb-4 text-primary">Key Features</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="mr-3 mt-1">
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {service.comingSoon ? (
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                          <p className="text-yellow-800">
                            This service is coming soon! Contact us to join the waitlist and be notified when it's available.
                          </p>
                        </div>
                      ) : (
                        <Link 
                          to="/contact" 
                          className="inline-flex items-center text-primary hover:text-secondary transition-colors"
                        >
                          Request a quote
                          <ArrowRight size={16} className="ml-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Process</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We follow a systematic approach to ensure the success of every project
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "01", title: "Discovery", desc: "We learn about your business, goals, and challenges" },
                { number: "02", title: "Planning", desc: "We develop a strategic roadmap for your solution" },
                { number: "03", title: "Development", desc: "We build your solution using modern technologies" },
                { number: "04", title: "Launch & Support", desc: "We deploy your solution and provide ongoing support" }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-md animate-on-scroll"
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  <div className="text-secondary font-bold text-2xl mb-3">{step.number}</div>
                  <h3 className="text-xl font-bold mb-2 text-primary">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="bg-primary rounded-lg p-8 md:p-12 text-white text-center animate-on-scroll">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Automate Your Business?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss your project and discover how we can help transform your business with our automation solutions.
              </p>
              <Link 
                to="/contact" 
                className="bg-white text-primary px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-block"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;
