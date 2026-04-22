import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO';
import RelatedServices from '../../components/common/RelatedServices';
import RelatedPosts from '../../components/common/RelatedPosts';

const WebDevelopmentPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const webDevSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Website Development for Branding",
    "provider": {
      "@type": "Organization",
      "name": "NafArro Solutions"
    },
    "description": "Custom website development services for branding and business growth",
    "offers": {
      "@type": "Offer",
      "description": "Professional website development with custom design, mobile responsiveness, and SEO optimization"
    }
  };

  return (
    <>
      <SEO 
        title="Website Development for Branding | NafArro Solutions"
        description="Professional website development services that reflect your brand identity and engage your audience. Custom design, mobile-responsive, SEO optimized websites."
        keywords="website development, custom web design, brand website, responsive design, SEO optimization, web development Kenya"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schemaData={webDevSchema}
      />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="container-custom">
            <div className="flex items-center mb-6">
              <div className="bg-white/20 p-4 rounded-lg mr-6">
                <Globe size={48} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in">Website Development</h1>
                <p className="text-xl text-gray-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  for Branding & Business Growth
                </p>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Transform your online presence with custom websites that reflect your brand identity and convert visitors into customers.
            </p>
          </div>
        </div>

        {/* Service Overview */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Why Your Website Matters</h2>
                <p className="text-gray-700 mb-6">
                  Your website is often the first impression potential customers have of your business. 
                  We create custom, responsive websites that not only look stunning but also drive results 
                  through strategic design and user experience optimization.
                </p>
                <ul className="space-y-3">
                  {[
                    "First impressions matter - 94% are design-related",
                    "75% of users judge credibility based on website design",
                    "Mobile traffic accounts for over 50% of web traffic",
                    "Good UX can increase conversion rates by 200%"
                  ].map((stat, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{stat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-4">What You Get</h3>
                <ul className="space-y-3">
                  {[
                    "Custom design tailored to your brand",
                    "Mobile-responsive across all devices",
                    "SEO optimization for better visibility",
                    "Fast loading times and performance",
                    "Content management system (CMS)",
                    "Analytics integration",
                    "30 days of post-launch support"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Technologies We Use</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: "React", desc: "Modern UI framework" },
                { name: "TypeScript", desc: "Type-safe development" },
                { name: "Tailwind CSS", desc: "Utility-first styling" },
                { name: "Next.js", desc: "Full-stack framework" }
              ].map((tech, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h3 className="font-bold text-primary mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discovery", desc: "We understand your brand, goals, and target audience" },
                { step: "02", title: "Design", desc: "Create wireframes and visual designs that reflect your brand" },
                { step: "03", title: "Development", desc: "Build your website using modern, scalable technologies" },
                { step: "04", title: "Launch", desc: "Deploy your website and provide training and support" }
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{phase.title}</h3>
                  <p className="text-gray-600">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream Website?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's create a website that truly represents your brand and drives business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-white text-primary px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-flex items-center justify-center"
              >
                Get Started
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/portfolio" 
                className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>
        <RelatedServices currentPath="/services/web-development" />
        <RelatedPosts title="Web Development Insights" />
      </div>
    </>
  );
};

export default WebDevelopmentPage;