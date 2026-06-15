import React, { useEffect } from 'react';
import { Zap, Wallet, Settings, HeartHandshake } from 'lucide-react';
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

  const sectionTitle = getContent('why_choose_title', 'Why Founders Choose NafArro');
  const sectionSubtitle = getContent('why_choose_subtitle', 'Bold work, honest pricing, and speed you can feel.');

  const reasons = [
    {
      icon: <Zap size={40} className="text-secondary" />,
      title: "Built Fast",
      description: "Most projects go live in weeks, not months. We move at the speed of your business.",
      delay: 0
    },
    {
      icon: <Wallet size={40} className="text-secondary" />,
      title: "Honest Pricing",
      description: "Pay once, own forever. No surprise monthly fees, no per-user pricing, no platform lock-in.",
      delay: 0.2
    },
    {
      icon: <Settings size={40} className="text-secondary" />,
      title: "You Stay In Control",
      description: "Every site comes with a simple admin panel so you can edit text, images, and content yourself — no developer needed.",
      delay: 0.4
    },
    {
      icon: <HeartHandshake size={40} className="text-secondary" />,
      title: "A Real Partner",
      description: "Direct line to the team that built it. No tickets, no call centers, just people who care about your success.",
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

        {/* Who We Help band */}
        <div className="mt-16 animate-on-scroll">
          <div className="rounded-2xl bg-gradient-to-br from-primary to-[#0A3472] p-8 md:p-12 text-center text-white shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              From solo founders to growing enterprises — anywhere in the world.
            </h3>
            <p className="text-gray-200/90 max-w-2xl mx-auto mb-6">
              If your business runs on repetitive work, we can automate it. No industry too small, no idea too big.
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {['Solo Entrepreneurs', 'SMEs', 'Enterprises', 'Remote-friendly', 'Global Delivery'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
