
import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ProblemsSection from '../components/home/ProblemsSection';
import PricingSection from '../components/home/PricingSection';
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

  const organizationSchema = {
    "@type": "Organization",
    "@id": "https://nafarrosolutions.com/#organization",
    "name": "NafArro Solutions",
    "alternateName": "King of Automation",
    "description": "Leading automation specialists providing website development, web applications, and data analysis services",
    "url": "https://nafarrosolutions.com/",
    "logo": "https://nafarrosolutions.com/lovable-uploads/554dc44c-5e9c-440a-8476-ae732b9fd973.png",
    "address": { "@type": "PostalAddress", "addressLocality": "Nairobi", "addressCountry": "KE" },
    "contactPoint": { "@type": "ContactPoint", "contactType": "Customer Service", "email": "info@nafarrosolutions.com" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Automation Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development", "description": "Custom website development with modern technologies" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Application Development", "description": "Custom web applications for business automation" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Data Analysis & Automation", "description": "Data collection, processing and automated reporting solutions" } }
      ]
    }
  };

  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How long does a typical project take?", "acceptedAnswer": { "@type": "Answer", "text": "Project timelines vary depending on complexity. Simple websites typically take 2-4 weeks, while complex automation systems can take 2-6 months. We provide detailed timelines during our initial consultation." } },
      { "@type": "Question", "name": "Do you provide ongoing support and maintenance?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! We offer comprehensive support packages including regular updates, security monitoring, backup services, and technical support. We're here to ensure your systems continue running smoothly." } },
      { "@type": "Question", "name": "What technologies do you specialize in?", "acceptedAnswer": { "@type": "Answer", "text": "We work with modern technologies including React, Node.js, Python, Django, PostgreSQL, MongoDB, and various cloud platforms. We choose the best technology stack for each project's specific needs." } },
      { "@type": "Question", "name": "Can you help migrate our existing systems?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! We have extensive experience in system migrations, data transfers, and modernizing legacy applications. We ensure minimal downtime and data integrity throughout the process." } },
      { "@type": "Question", "name": "How do you handle project communication?", "acceptedAnswer": { "@type": "Answer", "text": "We believe in transparent communication. You'll have regular updates through your preferred channels (email, Slack, project management tools), weekly progress reports, and scheduled check-in meetings." } },
      { "@type": "Question", "name": "What's included in your automation services?", "acceptedAnswer": { "@type": "Answer", "text": "Our automation services include process analysis, custom software development, system integration, training, documentation, and ongoing optimization. We handle everything from simple workflows to complex enterprise solutions." } }
    ]
  };

  const homePageSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, faqSchema]
  };

  return (
    <>
      <SEO 
        title="Put Your Business on Auto-Pilot | NafArro Solutions"
        description="Custom websites and automation tools that handle emails, CRM, invoices, and content for you. Built fast. Honest pricing. Yours forever."
        keywords="business automation, CRM automation, email automation, custom CMS, replace expensive software, web development, web applications, data analysis"
        schemaData={homePageSchema}
      />
      <div>
        <HeroSection />
        <ProblemsSection />
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
