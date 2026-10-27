import React, { useEffect } from 'react';
import { Repeat, Database, DollarSign, Globe2, Wrench, LineChart } from 'lucide-react';

const problems = [
  {
    icon: Repeat,
    title: 'Drowning in repetitive tasks',
    description: 'Copying data between apps, sending the same emails, chasing invoices — over and over.',
  },
  {
    icon: Database,
    title: 'Losing data across too many platforms',
    description: "Info scattered across spreadsheets, inboxes, and tools that don't talk to each other.",
  },
  {
    icon: DollarSign,
    title: 'Paying too much for software',
    description: 'Expensive monthly subscriptions for email, CRM, and automation you could own outright.',
  },
  {
    icon: Globe2,
    title: 'A website that\u2019s costing you customers',
    description: 'Slow, outdated, hard to update, and invisible on Google.',
  },
  {
    icon: Wrench,
    title: 'Stuck calling a developer for tiny changes',
    description: 'Every text tweak becomes a project. You need a site you can edit yourself.',
  },
  {
    icon: LineChart,
    title: "No clue what your numbers are telling you",
    description: 'Data sitting in files instead of guiding the decisions that grow your business.',
  },
];

const ProblemsSection = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85) {
          el.classList.add('show');
        }
      });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <section className="relative py-24 bg-deep">
      <div className="container-custom">
        <div className="mb-16 text-center animate-on-scroll">
          <span className="eyebrow-badge mb-5">The Problem</span>
          <h2 className="section-title">Sound Familiar?</h2>
          <p className="section-subtitle mx-auto">
            These are the headaches we erase, every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="glass-card animate-on-scroll p-7"
                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    background: 'rgba(51,195,240,0.08)',
                    border: '1px solid rgba(51,195,240,0.25)',
                    boxShadow: '0 0 20px rgba(51,195,240,0.12)',
                  }}
                >
                  <Icon className="h-6 w-6 text-[#33c3f0]" />
                </div>
                <h3 className="font-display mb-2.5 text-lg font-bold text-white">{p.title}</h3>
                <p className="text-sm leading-relaxed text-[#9db2c9]">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
