
import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import TechStackSection from '../components/home/TechStackSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ContactCTASection from '../components/home/ContactCTASection';
import FAQSection from '../components/common/FAQSection';
import ServiceBooking from '../components/common/ServiceBooking';
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

  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TechStackSection />
      <TestimonialsSection />
      <ServiceBooking />
      <FAQSection />
      <ContactCTASection />
    </div>
  );
};

export default HomePage;
