
import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import TechStackSection from '../components/home/TechStackSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ContactCTASection from '../components/home/ContactCTASection';
import FAQSection from '../components/common/FAQSection';
import ServiceBooking from '../components/common/ServiceBooking';
import RelatedPosts from '../components/common/RelatedPosts';
import SEO from '../components/SEO';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Helper function to check if an element is in viewport
    const isInViewport = (element: HTMLElement): boolean => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
      );
    };
    
    // Animation on scroll
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
    setTimeout(animateOnScroll, 100);

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NafArro Solutions",
    "alternateName": "King of Automation",
    "description": "Leading automation specialists providing website development, web applications, and data analysis services",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "logo": typeof window !== 'undefined' ? `${window.location.origin}/lovable-uploads/554dc44c-5e9c-440a-8476-ae732b9fd973.png` : '',
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Automation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Development",
            "description": "Custom website development with modern technologies"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Web Application Development",
            "description": "Custom web applications for business automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Data Analysis & Automation",
            "description": "Data collection, processing and automated reporting solutions"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEO 
        title="Business Process Automation | NafArro Solutions"
        description="NafArro Solutions builds custom websites, web apps & data automation for growing businesses. React, Node.js, Supabase experts based in Kenya."
        keywords="business process automation, web development Kenya, web applications, data analysis, React developer, Node.js, Supabase, custom software, Nairobi automation"
        schemaData={homePageSchema}
      />
      <div>
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <TechStackSection />
        <TestimonialsSection />
        <ServiceBooking />
        <RelatedPosts title="Latest from Our Blog" limit={3} />
        <FAQSection />
        <ContactCTASection />
      </div>
    </>
  );
};

export default HomePage;
