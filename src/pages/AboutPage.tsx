import React, { useEffect } from 'react';
import { CheckCircle, Clock, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import founderImage from '../assets/founder-naftali-koome.jpg';
import { usePublicPageContent } from '@/hooks/usePageContent';

const AboutPage = () => {
  const { getContent, content } = usePublicPageContent('about');

  // Animation on scroll functionality
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
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

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroTitle = getContent('hero_title', 'About NafArro Solutions');
  const heroSubtitle = getContent('hero_subtitle', "We're on a mission to transform businesses through intelligent automation and innovative technology solutions.");
  const storyTitle = getContent('story_title', 'Our Story');
  const storyContent = getContent('story_content', 'NafArro Solutions was founded with a singular vision: to help businesses leverage the power of automation to achieve greater efficiency and growth. What began as a small team of passionate developers has evolved into a comprehensive technology partner for businesses of all sizes.');
  const missionTitle = getContent('mission_title', 'Our Mission');
  const missionContent = getContent('mission_content', 'To empower businesses through innovative automation solutions that drive efficiency, reduce costs, and accelerate growth, making technology work for people rather than the other way around.');
  const visionTitle = getContent('vision_title', 'Our Vision');
  const visionContent = getContent('vision_content', 'To be recognized as the leading automation solutions provider, known for our technical excellence, innovation, and exceptional client service.');
  const founderName = getContent('founder_name', 'Naftali Koome');
  const founderTitle = getContent('founder_title', 'Founder & Lead Developer');
  const founderBio = getContent('founder_bio', 'With a BSc in Computer Science and from The Catholic University of Eastern Africa, Lang\'ata, Naftali brings over half a decade of hands-on experience in software development and business automation.');
  const founderImageUrl = content['founder_image'];

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

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "NafArro Solutions",
      "description": heroSubtitle,
      "foundingDate": "2023",
      "founders": [{
        "@type": "Person",
        "name": founderName,
        "jobTitle": founderTitle,
        "alumniOf": "The Catholic University of Eastern Africa",
        "knowsAbout": ["Computer Science", "Software Development", "Business Automation"]
      }],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KE"
      },
      "knowsAbout": ["Business Process Automation", "Web Development", "Data Analysis", "React Development", "Node.js", "Express", "MongoDB", "Supabase"]
    }
  };

  return (
    <>
      <SEO 
        title="About NafArro Solutions - Your Automation Experts | King of Automation" 
        description="Learn about NafArro Solutions, leading automation specialists transforming businesses through intelligent technology solutions. Discover our mission, values, and commitment to excellence." 
        keywords="about nafarro solutions, automation experts, company story, mission vision, core values, technology specialists, business automation company" 
        canonical={typeof window !== 'undefined' ? window.location.href : ''} 
        schemaData={aboutPageSchema} 
      />
      <div className="pt-20">
        {/* About Header */}
        <div className="bg-primary text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">{heroTitle}</h1>
            <p className="text-xl text-gray-300 max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {heroSubtitle}
            </p>
          </div>
        </div>

        {/* Company Story */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-on-scroll">
                <h2 className="text-3xl font-bold mb-6 text-primary">{storyTitle}</h2>
                <p className="text-gray-700 mb-4">
                  {storyContent}
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
                <h3 className="text-2xl font-bold mb-4">{missionTitle}</h3>
                <p className="text-gray-200 mb-4">
                  {missionContent}
                </p>
                <p className="text-gray-200">
                  We're committed to delivering high-quality, customized applications that solve real problems and create tangible value for our clients.
                </p>
              </div>
              
              <div className="bg-accent p-8 rounded-lg text-white animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
                <h3 className="text-2xl font-bold mb-4">{visionTitle}</h3>
                <p className="text-gray-200 mb-4">
                  {visionContent}
                </p>
                <p className="text-gray-200">
                  We envision a future where businesses of all sizes can harness the power of automation to thrive in an increasingly digital world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Meet Our Founder</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Driven by passion for technology and innovation, our founder leads the vision of transforming businesses through automation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 animate-on-scroll">
                <h3 className="text-2xl font-bold mb-4 text-primary">{founderName}</h3>
                <p className="text-lg text-accent mb-4 font-medium">{founderTitle}</p>
                
                <div className="space-y-4 text-gray-700">
                  <p>{founderBio || "With a BSc in Computer Science and from The Catholic University of Eastern Africa, Lang'ata, Naftali brings over half a decade of hands-on experience in software development and business automation."}</p>
                  
                  <p>
                    His expertise spans across full-stack development, database management, and enterprise-level automation solutions. Having worked on diverse projects ranging from church management systems to GPS tracking applications, Naftali understands the unique challenges businesses face in the digital age.
                  </p>
                  
                  <p>
                    Passionate about leveraging technology to solve real-world problems, Naftali founded NafArro Solutions with the vision of making advanced automation accessible to businesses of all sizes. His technical leadership and commitment to excellence drives the company's mission to be the "King of Automation."
                  </p>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-primary mb-2">Core Expertise:</h4>
                    <ul className="grid grid-cols-2 gap-2 text-sm">
                      <li>• React & TypeScript</li>
                      <li>• Node.js & Express</li>
                      <li>• Database Design</li>
                      <li>• API Development</li>
                      <li>• Process Automation</li>
                      <li>• Cloud Solutions</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 animate-on-scroll">
                <div className="relative">
                  <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={founderImageUrl || founderImage} 
                      alt={`${founderName}, Founder of NafArro Solutions`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-lg shadow-lg">
                    <p className="text-sm font-medium">5+ Years</p>
                    <p className="text-xs">Experience</p>
                  </div>
                </div>
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
              <Link to="/contact" className="btn-primary inline-block">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
