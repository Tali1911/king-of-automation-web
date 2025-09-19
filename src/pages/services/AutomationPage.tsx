import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '../../components/SEO';

const AutomationPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const automationSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Web Applications for Automation",
    "provider": {
      "@type": "Organization",
      "name": "NafArro Solutions"
    },
    "description": "Custom web applications that automate business processes and improve operational efficiency",
    "offers": {
      "@type": "Offer",
      "description": "Business process automation through custom web applications and workflow optimization"
    }
  };

  return (
    <>
      <SEO 
        title="Web Applications for Automation | NafArro Solutions"
        description="Transform manual processes into efficient automated workflows with custom web applications. Streamline your business operations and boost productivity."
        keywords="business automation, web applications, workflow automation, process optimization, custom software development, business efficiency"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schemaData={automationSchema}
      />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-accent text-white py-16">
          <div className="container-custom">
            <div className="flex items-center mb-6">
              <div className="bg-white/20 p-4 rounded-lg mr-6">
                <Code size={48} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in">Web Applications</h1>
                <p className="text-xl text-gray-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  for Business Automation
                </p>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Transform manual processes into efficient automated workflows that save time, reduce errors, and boost productivity.
            </p>
          </div>
        </div>

        {/* Problem & Solution */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-red-50 p-8 rounded-lg border-l-4 border-red-500">
                <h2 className="text-2xl font-bold text-red-700 mb-4">The Problem with Manual Processes</h2>
                <ul className="space-y-3">
                  {[
                    "Time-consuming repetitive tasks",
                    "Human errors and inconsistencies",
                    "Difficulty tracking progress",
                    "Poor data organization",
                    "Limited scalability",
                    "Inefficient resource allocation"
                  ].map((problem, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-red-700">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-500">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Our Automation Solutions</h2>
                <ul className="space-y-3">
                  {[
                    "Automated workflow systems",
                    "Real-time data processing",
                    "Intelligent reporting dashboards",
                    "Seamless system integrations",
                    "Scalable cloud solutions",
                    "User-friendly interfaces"
                  ].map((solution, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-green-700">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Automation Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Customer Management",
                  desc: "Automate customer onboarding, support tickets, and relationship management",
                  features: ["CRM integration", "Automated emails", "Lead tracking"]
                },
                {
                  title: "Inventory Management",
                  desc: "Track stock levels, automate reordering, and manage supplier relationships",
                  features: ["Real-time tracking", "Auto-reordering", "Supplier portals"]
                },
                {
                  title: "Financial Processing",
                  desc: "Automate invoicing, expense tracking, and financial reporting",
                  features: ["Invoice generation", "Expense reports", "Financial dashboards"]
                },
                {
                  title: "HR Management",
                  desc: "Streamline employee onboarding, leave management, and performance tracking",
                  features: ["Employee portals", "Leave tracking", "Performance metrics"]
                },
                {
                  title: "Project Management",
                  desc: "Automate task assignment, progress tracking, and team collaboration",
                  features: ["Task automation", "Progress tracking", "Team collaboration"]
                },
                {
                  title: "Quality Control",
                  desc: "Implement automated testing, compliance tracking, and quality assurance",
                  features: ["Automated testing", "Compliance tracking", "Quality metrics"]
                }
              ].map((useCase, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-primary mb-3">{useCase.title}</h3>
                  <p className="text-gray-600 mb-4">{useCase.desc}</p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Zap className="text-accent mr-2" size={16} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Benefits of Automation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "⚡", title: "80% Faster", desc: "Process completion time" },
                { icon: "💰", title: "50% Cost Savings", desc: "Operational efficiency" },
                { icon: "🎯", title: "99% Accuracy", desc: "Reduced human errors" },
                { icon: "📈", title: "2x Growth", desc: "Business scalability" }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Automate Your Business?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's identify your inefficiencies and create custom automation solutions that transform your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-white text-accent px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-flex items-center justify-center"
              >
                Schedule Free Consultation
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/portfolio" 
                className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-accent transition-colors inline-flex items-center justify-center"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AutomationPage;