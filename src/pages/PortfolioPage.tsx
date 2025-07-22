
import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const PortfolioPage = () => {
  const [filter, setFilter] = useState<string>('all');
  
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

  const portfolioItems = [
    {
      id: 1,
      title: "E-Commerce Automation Platform", 
      category: "automation",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      description: "An automated inventory management and order processing system that reduced manual work by 80% for a leading online retailer.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      results: "80% reduction in manual work, 45% faster order processing"
    },
    {
      id: 2,
      title: "Corporate Branding Website",
      category: "website", 
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      description: "A responsive, modern website for a financial services firm that increased lead generation by 45% within the first quarter.",
      technologies: ["React", "Tailwind CSS", "Next.js"],
      results: "45% increase in lead generation, 60% better user engagement"
    },
    {
      id: 3,
      title: "HR Management System",
      category: "automation",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80", 
      description: "A comprehensive HR platform automating employee onboarding, time tracking, and performance reviews for a company with 500+ employees.",
      technologies: ["Django", "React", "PostgreSQL", "Redis"],
      results: "90% faster onboarding process, 100% compliance rate"
    },
    {
      id: 4,
      title: "Restaurant Ordering System",
      category: "automation",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      description: "A digital menu and ordering system that streamlined operations for a restaurant chain, reducing order time by 35%.",
      technologies: ["React Native", "Node.js", "Express", "MongoDB"],
      results: "35% reduction in order time, 25% increase in customer satisfaction"
    },
    {
      id: 5,
      title: "Photography Portfolio",
      category: "website",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80",
      description: "A visually stunning portfolio website for a professional photographer showcasing their work with advanced filtering and gallery features.",
      technologies: ["React", "Gatsby", "GraphQL", "Netlify CMS"],
      results: "200% increase in client inquiries, featured in design showcases"
    },
    {
      id: 6,
      title: "Manufacturing Process Automation", 
      category: "automation",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1720&q=80",
      description: "An IoT-connected system that automated quality control processes, reducing defects by 65% for a manufacturing plant.",
      technologies: ["Django", "Python", "IoT Sensors", "PostgreSQL"],
      results: "65% reduction in defects, $500K annual cost savings"
    }
  ];

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <div className="pt-20">
      {/* Portfolio Header */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Our Portfolio</h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Explore our successful projects and see how we've helped businesses transform through technology and automation.
          </p>
        </div>
      </div>

      {/* Portfolio Filters */}
      <section className="py-12 bg-muted">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Projects ({portfolioItems.length})
            </button>
            <button
              onClick={() => setFilter('website')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                filter === 'website' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Websites ({portfolioItems.filter(item => item.category === 'website').length})
            </button>
            <button
              onClick={() => setFilter('automation')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                filter === 'automation' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Automation ({portfolioItems.filter(item => item.category === 'automation').length})
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id}
                className="group bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl animate-on-scroll"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-3">
                      <button className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      item.category === 'website' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.category === 'website' ? 'Website' : 'Automation'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  {item.results && (
                    <div className="mb-4 p-3 bg-green-50 rounded-lg">
                      <p className="text-green-800 text-sm font-medium">Results: {item.results}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container-custom">
          <div className="text-center animate-on-scroll">
            <h2 className="text-3xl font-bold mb-6 text-primary">Let's Build Something Amazing Together</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to join our growing list of satisfied clients? Contact us today to discuss your project.
            </p>
            <a 
              href="/contact" 
              className="btn-primary inline-block"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
