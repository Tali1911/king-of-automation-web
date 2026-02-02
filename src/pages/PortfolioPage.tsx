import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import creditManagementScreenshot from '../assets/credit-management-screenshot.png';
import churchManagementScreenshot from '../assets/church-management-screenshot.png';
import actionPointScreenshot from '../assets/action-point-screenshot.png';
import cedarempowerhandsScreenshot from '../assets/cedarempowerhands-screenshot.png';
import gpsTrackerScreenshot from '../assets/gps-tracker-screenshot.png';
import { usePublicPageContent } from '@/hooks/usePageContent';

const PortfolioPage = () => {
  const { getContent } = usePublicPageContent('portfolio');
  const [filter, setFilter] = useState<string>('all');
  
  const heroTitle = getContent('hero_title', 'Our Portfolio');
  const heroSubtitle = getContent('hero_subtitle', "Explore our successful projects and see how we've helped businesses transform through technology and automation.");
  const ctaTitle = getContent('cta_title', "Let's Build Something Amazing Together");
  const ctaDescription = getContent('cta_description', 'Ready to join our growing list of satisfied clients? Contact us today to discuss your project.');

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
      title: 'Credit Management System',
      category: "automation",
      image: creditManagementScreenshot,
      description: 'Web-based case management improving collection efficiency and analytics.',
      technologies: ['React', 'TypeScript', 'Supabase', 'Tailwind', 'Vite'],
      results: "Improved collection efficiency and comprehensive analytics",
      liveUrl: 'https://cmsyst.netlify.app/',
      githubUrl: 'https://github.com/Tali1911/collection-management-system'
    },
    {
      id: 2,
      title: 'Church Management System',
      category: "automation",
      image: churchManagementScreenshot,
      description: 'Automating and managing church resources and departments on one platform.',
      technologies: ['React', 'TypeScript', 'Supabase', 'Tailwind', 'Vite'],
      results: "Centralized management of church operations and resources",
      liveUrl: 'https://tot123.netlify.app/',
      githubUrl: 'https://github.com/Tali1911/Complete_Church_MS'
    },
    {
      id: 3,
      title: 'Action Point Follow-up',
      category: "automation",
      image: actionPointScreenshot,
      description: 'Action item tracking with advanced filtering and email notifications.',
      technologies: ['React', 'Node', 'JWT', 'PostgreSQL', 'Sendgrid'],
      results: "Streamlined action item tracking with automated notifications",
      liveUrl: 'https://actionpoints.netlify.app/auth',
      githubUrl: 'https://github.com/Tali1911/Agenda_action_point'
    },
    {
      id: 4,
      title: 'cedarempowerhands.org',
      category: "website",
      image: cedarempowerhandsScreenshot,
      description: "Website empowering Kenya's Youth through skills and sustainability.",
      technologies: ['React', 'TypeScript', 'Tailwind', 'Vite'],
      results: "Platform for youth empowerment and sustainability initiatives",
      liveUrl: 'https://cedarempowerhands.org/',
      githubUrl: 'https://github.com/Tali1911/cedar-empower-reach'
    },
    {
      id: 5,
      title: 'GPS Community Bond',
      category: "automation",
      image: gpsTrackerScreenshot,
      description: 'GPS tracking app for walks with social features and detailed analytics.',
      technologies: ['React', 'TypeScript', 'Supabase', 'Tailwind', 'Leaflet.js', 'geo.json'],
      results: "Community engagement through GPS tracking and social features",
      liveUrl: 'https://walktracking.netlify.app/',
      githubUrl: 'https://github.com/Tali1911/Prayerwalk_Tracker'
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">{heroTitle}</h1>
          <p className="text-xl text-gray-300 max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {heroSubtitle}
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
                      {item.liveUrl && (
                        <a 
                          href={item.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {item.githubUrl && (
                        <a 
                          href={item.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
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
            <h2 className="text-3xl font-bold mb-6 text-primary">{ctaTitle}</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {ctaDescription}
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
