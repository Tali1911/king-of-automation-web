
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
    <section className="py-20 bg-primary text-white">
      <div className="container-custom">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Our Tech Stack</h2>
          <p className="text-xl md:text-2xl font-medium mb-12 text-gray-300 max-w-2xl mx-auto">
            Leveraging modern technologies to create powerful, scalable solutions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-lg text-center animate-on-scroll"
              style={{transitionDelay: `${tech.delay}s`}}
            >
              <img 
                src={tech.image} 
                alt={tech.name} 
                className="h-16 w-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
              <p className="text-gray-300">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
