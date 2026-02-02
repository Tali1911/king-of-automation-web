import React, { useEffect } from 'react';
import { Check, Clock, Code, Users } from 'lucide-react';
import { usePublicPageContent } from '@/hooks/usePageContent';

const WhyChooseUsSection = () => {
  const { getContent } = usePublicPageContent('home');

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

  const sectionTitle = getContent('why_choose_title', 'Why Choose Us');
  const sectionSubtitle = getContent('why_choose_subtitle', "We're committed to excellence, innovation, and your success");

  const reasons = [
    {
      icon: <Code size={40} className="text-secondary" />,
      title: "Expert Development",
      description: "Our team comprises skilled developers with expertise in React, Node.js/Express, and Django.",
      delay: 0
    },
    {
      icon: <Users size={40} className="text-secondary" />,
      title: "Client-Focused Approach",
      description: "We prioritize your specific needs to deliver customized solutions that align with your goals.",
      delay: 0.2
    },
    {
      icon: <Check size={40} className="text-secondary" />,
      title: "Quality Assurance",
      description: "Rigorous testing ensures your applications are reliable, secure, and perform optimally.",
      delay: 0.4
    },
    {
      icon: <Clock size={40} className="text-secondary" />,
      title: "Timely Delivery",
      description: "We understand the value of your time and are committed to delivering projects on schedule.",
      delay: 0.6
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="section-title">{sectionTitle}</h2>
          <p className="section-subtitle mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="flex items-start space-x-5 animate-on-scroll"
              style={{transitionDelay: `${reason.delay}s`}}
            >
              <div className="flex-shrink-0 p-3 bg-primary/5 rounded-lg">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-primary">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
