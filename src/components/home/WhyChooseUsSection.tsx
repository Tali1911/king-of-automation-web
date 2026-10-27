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
      icon: <Zap size={34} className="text-[#33c3f0]" />,
      title: "Built Fast",
      description: "Most projects go live in weeks, not months. We move at the speed of your business.",
      delay: 0
    },
    {
      icon: <Wallet size={34} className="text-[#33c3f0]" />,
      title: "Honest Pricing",
      description: "Pay once, own forever. No surprise monthly fees, no per-user pricing, no platform lock-in.",
      delay: 0.2
    },
    {
      icon: <Settings size={34} className="text-[#33c3f0]" />,
      title: "You Stay In Control",
      description: "Every site comes with a simple admin panel so you can edit text, images, and content yourself — no developer needed.",
      delay: 0.4
    },
    {
      icon: <HeartHandshake size={34} className="text-[#33c3f0]" />,
      title: "A Real Partner",
      description: "Direct line to the team that built it. No tickets, no call centers, just people who care about your success.",
      delay: 0.6
    }
  ];

  return (
    <section className="relative py-24 bg-deep">
      <div className="container-custom">
        <div className="mb-16 text-center animate-on-scroll">
          <span className="eyebrow-badge mb-5">Why Us</span>
          <h2 className="section-title">{sectionTitle}</h2>
          <p className="section-subtitle mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="glass-card flex items-start gap-5 p-7 animate-on-scroll"
              style={{ transitionDelay: `${reason.delay}s` }}
            >
              <div
                className="flex-shrink-0 rounded-xl p-3.5"
                style={{ background: 'rgba(51,195,240,0.08)', border: '1px solid rgba(51,195,240,0.22)' }}
              >
                {reason.icon}
              </div>
              <div>
                <h3 className="font-display mb-2 text-xl font-bold text-white">{reason.title}</h3>
                <p className="text-[#9db2c9]">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Who We Help band */}
        <div className="mt-16 animate-on-scroll">
          <div
            className="glow-border relative overflow-hidden rounded-2xl p-10 text-center md:p-14"
            style={{
              background: 'linear-gradient(135deg, rgba(10,36,99,0.75), rgba(5,15,30,0.85))',
              boxShadow: '0 30px 80px -40px rgba(51,195,240,0.25)',
            }}
          >
            <div aria-hidden="true" className="noise-overlay absolute inset-0" />
            <div
              aria-hidden="true"
              className="absolute -top-16 left-1/2 h-40 w-96 -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: 'rgba(51,195,240,0.12)' }}
            />
            <h3 className="font-display relative mb-4 text-2xl font-bold text-white md:text-3xl">
              From solo founders to growing enterprises — anywhere in the world.
            </h3>
            <p className="relative mx-auto mb-8 max-w-2xl text-[#a9bcd1]">
              If your business runs on repetitive work, we can automate it. No industry too small, no idea too big.
            </p>
            <div className="relative flex flex-wrap justify-center gap-2 md:gap-3">
              {['Solo Entrepreneurs', 'SMEs', 'Enterprises', 'Remote-friendly', 'Global Delivery'].map((tag) => (
                <span
                  key={tag}
                  className="glass-panel rounded-full px-4 py-2 text-sm font-medium text-[#c6d5e6]"
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
