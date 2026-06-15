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
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="section-title">Sound Familiar?</h2>
          <p className="section-subtitle mx-auto">
            These are the headaches we erase, every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="animate-on-scroll p-6 rounded-xl border border-gray-100 bg-muted/30 hover:bg-muted/60 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
