
import React, { useEffect } from 'react';

const TechStackSection = () => {
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
    // Initial check
    animateOnScroll();

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  const technologies = [
    {
      name: "React",
      description: "Building interactive user interfaces",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      delay: 0
    },
    {
      name: "Node.js",
      description: "Powering server-side applications",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      delay: 0.2
    },
    {
      name: "Express",
      description: "Creating robust API endpoints",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      delay: 0.4
    },
    {
      name: "MongoDB",
      description: "Flexible NoSQL database solution",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      delay: 0.6
    },
    {
      name: "Supabase",
      description: "Backend-as-a-Service platform",
      image: "https://supabase.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsupabase-logo-icon.6ce8a6f8.svg&w=64&q=75",
      delay: 0.8
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full blur-3xl opacity-50"
        style={{ background: 'rgba(10,36,99,0.5)' }}
      />
      <div className="container-custom relative">
        <div className="mb-16 text-center animate-on-scroll">
          <span className="eyebrow-badge mb-5">Under the Hood</span>
          <h2 className="section-title">Our Tech Stack</h2>
          <p className="section-subtitle mx-auto">
            Leveraging modern technologies to create powerful, scalable solutions
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="glass-card glow-border group p-8 text-center animate-on-scroll"
              style={{ transitionDelay: `${tech.delay}s` }}
            >
              <img
                src={tech.image}
                alt={tech.name}
                className="mx-auto mb-5 h-16 w-16 transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_14px_rgba(51,195,240,0.6)]"
              />
              <h3 className="font-display mb-2 text-lg font-bold text-white">{tech.name}</h3>
              <p className="text-sm text-[#9db2c9]">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
