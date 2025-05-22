
import React, { useEffect } from 'react';
import { CheckCircle, Clock, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  // Animation on scroll functionality
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

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreValues = [
    {
      icon: <CheckCircle size={40} className="text-secondary" />,
      title: "Quality",
      description: "We never compromise on the quality of our solutions, ensuring reliable, efficient, and secure applications."
    },
    {
      icon: <Clock size={40} className="text-secondary" />,
      title: "Timeliness",
      description: "We understand the value of time and are committed to delivering projects on or before deadlines."
    },
    {
      icon: <Users size={40} className="text-secondary" />,
      title: "Collaboration",
      description: "We work closely with our clients, encouraging open communication and feedback throughout the process."
    },
    {
      icon: <Award size={40} className="text-secondary" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our work, from code quality to client satisfaction."
    }
  ];

  return (
    <div className="pt-20">
      {/* About Header */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">About NafArro Solutions</h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We're on a mission to transform businesses through intelligent automation and innovative technology solutions.
          </p>
        </div>
      </div>

      {/* Company Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold mb-6 text-primary">Our Story</h2>
              <p className="text-gray-700 mb-4">
                NafArro Solutions was founded with a singular vision: to help businesses leverage the power of automation to achieve greater efficiency and growth. What began as a small team of passionate developers has evolved into a comprehensive technology partner for businesses of all sizes.
              </p>
              <p className="text-gray-700 mb-4">
                Our journey started when we recognized a common challenge across industries – businesses were spending valuable time on repetitive tasks that could be automated. We saw an opportunity to make a difference by creating custom solutions that would free up human resources for more creative and strategic work.
              </p>
              <p className="text-gray-700">
                Today, we continue to innovate and expand our service offerings, always staying true to our core mission of being the "King of Automation" and delivering exceptional value to our clients.
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-xl animate-on-scroll">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="Team collaboration" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-muted">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we interact with our clients and partners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-md flex items-start space-x-5 animate-on-scroll"
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="flex-shrink-0 p-3 bg-primary/5 rounded-lg">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-primary p-8 rounded-lg text-white animate-on-scroll">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-200 mb-4">
                To empower businesses through innovative automation solutions that drive efficiency, reduce costs, and accelerate growth, making technology work for people rather than the other way around.
              </p>
              <p className="text-gray-200">
                We're committed to delivering high-quality, customized applications that solve real problems and create tangible value for our clients.
              </p>
            </div>
            
            <div className="bg-accent p-8 rounded-lg text-white animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-200 mb-4">
                To be recognized as the leading automation solutions provider, known for our technical excellence, innovation, and exceptional client service.
              </p>
              <p className="text-gray-200">
                We envision a future where businesses of all sizes can harness the power of automation to thrive in an increasingly digital world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container-custom">
          <div className="text-center animate-on-scroll">
            <h2 className="text-3xl font-bold mb-6 text-primary">Ready to Work With Us?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how our automation solutions can help your business reach new heights of efficiency and productivity.
            </p>
            <Link 
              to="/contact" 
              className="btn-primary inline-block"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
