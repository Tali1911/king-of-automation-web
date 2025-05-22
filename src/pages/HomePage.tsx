
import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import TechStackSection from '../components/home/TechStackSection';
import ContactCTASection from '../components/home/ContactCTASection';

const HomePage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TechStackSection />
      <ContactCTASection />
    </div>
  );
};

export default HomePage;
