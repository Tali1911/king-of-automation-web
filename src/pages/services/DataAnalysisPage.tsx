import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import SEO from '../../components/SEO';

const DataAnalysisPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dataAnalysisSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Data Analysis Services",
    "provider": {
      "@type": "Organization",
      "name": "NafArro Solutions"
    },
    "description": "Business intelligence and data analysis services to unlock insights and drive strategic decision-making",
    "offers": {
      "@type": "Offer",
      "description": "Custom data analysis, business intelligence solutions, and predictive analytics services"
    }
  };

  return (
    <>
      <SEO 
        title="Data Analysis Services | NafArro Solutions"
        description="Unlock insights from your data with our business intelligence and data analysis services. Drive strategic decision-making with custom analytics solutions."
        keywords="data analysis, business intelligence, predictive analytics, data visualization, business insights, data science"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schemaData={dataAnalysisSchema}
      />
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-secondary text-white py-16">
          <div className="container-custom">
            <div className="flex items-center mb-6">
              <div className="bg-white/20 p-4 rounded-lg mr-6">
                <BarChart3 size={48} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in">Data Analysis</h1>
                <p className="text-xl text-gray-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  & Business Intelligence
                </p>
              </div>
            </div>
            <div className="bg-yellow-500 text-yellow-900 px-6 py-3 rounded-lg inline-flex items-center mb-4">
              <Clock className="mr-2" size={20} />
              <span className="font-medium">Coming Soon - Join the Waitlist!</span>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Unlock the power of your data to drive strategic decision-making, identify trends, and optimize business operations.
            </p>
          </div>
        </div>

        {/* Service Overview */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Transform Data into Actionable Insights</h2>
                <p className="text-gray-700 mb-6">
                  In today's data-driven world, businesses that leverage their data effectively gain a significant 
                  competitive advantage. Our upcoming data analysis services will help you turn raw data into 
                  strategic insights that drive growth and efficiency.
                </p>
                <div className="space-y-4">
                  {[
                    "Identify hidden patterns and trends in your business data",
                    "Make data-driven decisions with confidence",
                    "Predict future outcomes and market trends",
                    "Optimize operations and reduce costs",
                    "Improve customer satisfaction and retention"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <TrendingUp className="text-secondary mr-3 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-secondary to-accent p-8 rounded-lg text-white">
                <h3 className="text-xl font-bold mb-4">What We'll Offer</h3>
                <ul className="space-y-3">
                  {[
                    "Business Intelligence Dashboards",
                    "Predictive Analytics Models",
                    "Data Visualization & Reporting",
                    "Statistical Analysis & Insights",
                    "Automated Data Processing",
                    "Custom Analytics Solutions",
                    "Strategic Recommendations"
                  ].map((service, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-white mr-3 mt-2 flex-shrink-0"></div>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Types */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Types of Analysis We'll Provide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Descriptive Analytics",
                  desc: "Understand what happened in your business",
                  examples: ["Sales performance reports", "Customer behavior analysis", "Operational metrics"]
                },
                {
                  title: "Predictive Analytics", 
                  desc: "Forecast what might happen next",
                  examples: ["Sales forecasting", "Customer churn prediction", "Demand planning"]
                },
                {
                  title: "Prescriptive Analytics",
                  desc: "Determine what actions to take",
                  examples: ["Optimization strategies", "Resource allocation", "Strategic recommendations"]
                }
              ].map((type, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-secondary mb-3">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.desc}</p>
                  <ul className="space-y-2">
                    {type.examples.map((example, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-secondary mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">Industries We'll Serve</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: "🏪", name: "Retail & E-commerce" },
                { icon: "🏥", name: "Healthcare" },
                { icon: "🏦", name: "Financial Services" },
                { icon: "🏭", name: "Manufacturing" },
                { icon: "📚", name: "Education" },
                { icon: "🚚", name: "Logistics" },
                { icon: "🏨", name: "Hospitality" },
                { icon: "🌐", name: "Technology" }
              ].map((industry, index) => (
                <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-2">{industry.icon}</div>
                  <p className="text-sm font-medium text-gray-700">{industry.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section className="py-16 bg-secondary text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Be the First to Know When We Launch</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our waitlist to get early access to our data analysis services and receive a special launch discount.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-white text-secondary px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-flex items-center justify-center"
              >
                Join Waitlist
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/services" 
                className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-secondary transition-colors inline-flex items-center justify-center"
              >
                View Other Services
              </Link>
            </div>
            
            <div className="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-lg font-bold mb-3">Early Bird Benefits</h3>
              <ul className="text-left space-y-2">
                <li>• 25% discount on first project</li>
                <li>• Free initial data assessment</li>
                <li>• Priority support and onboarding</li>
                <li>• Exclusive access to beta features</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DataAnalysisPage;