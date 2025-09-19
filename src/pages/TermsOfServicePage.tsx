import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const TermsOfServicePage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - NafArro Solutions",
    "description": "Terms of Service and conditions for using NafArro Solutions automation services."
  };

  return (
    <>
      <SEO 
        title="Terms of Service | NafArro Solutions"
        description="Terms of Service and conditions for using NafArro Solutions automation and web development services."
        keywords="terms of service, service agreement, conditions, legal terms"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schemaData={termsSchema}
      />
      <div className="pt-20">
        {/* Header */}
        <div className="bg-primary text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Terms of Service</h1>
            <p className="text-xl text-gray-300 max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              These terms outline the conditions for using our services and working with NafArro Solutions.
            </p>
          </div>
        </div>

        {/* Content */}
        <section className="py-16">
          <div className="container-custom max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">Service Agreement</h2>
                  <p className="text-gray-700 mb-4">
                    By engaging NafArro Solutions for web development, automation, or data analysis services, 
                    you agree to these terms and conditions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">Project Scope and Deliverables</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>All project requirements will be clearly defined in a separate project agreement</li>
                    <li>Changes to project scope may result in additional costs and timeline adjustments</li>
                    <li>Deliverables will be provided according to agreed timelines</li>
                    <li>Client approval is required at designated project milestones</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">Payment Terms</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Payment schedules will be outlined in individual project agreements</li>
                    <li>A deposit may be required before project commencement</li>
                    <li>Final payment is due upon project completion and delivery</li>
                    <li>Late payments may incur additional fees</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">Intellectual Property</h2>
                  <p className="text-gray-700 mb-4">
                    Upon full payment, clients receive ownership of custom-developed solutions. However:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>NafArro Solutions retains rights to general methodologies and techniques</li>
                    <li>Third-party components remain subject to their respective licenses</li>
                    <li>Source code is provided for custom developments</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">Support and Maintenance</h2>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Basic support is provided for 30 days after project delivery</li>
                    <li>Extended support and maintenance agreements are available separately</li>
                    <li>Bug fixes for our code are provided at no additional cost during the support period</li>
                    <li>Feature enhancements and modifications may incur additional charges</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">Limitation of Liability</h2>
                  <p className="text-gray-700">
                    NafArro Solutions liability is limited to the total amount paid for services. We are not 
                    responsible for indirect damages, lost profits, or consequential damages arising from 
                    the use of our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">Termination</h2>
                  <p className="text-gray-700 mb-4">
                    Either party may terminate the service agreement with written notice:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Client is responsible for payment of completed work</li>
                    <li>Deliverables completed to date will be provided</li>
                    <li>Refunds are subject to the terms in individual project agreements</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">Contact Information</h2>
                  <p className="text-gray-700">
                    For questions about these terms, please contact us:
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg mt-4">
                    <p className="text-gray-700">
                      <strong>Email:</strong> ruciukoome@gmail.com<br />
                      <strong>Address:</strong> Nairobi, Kenya
                    </p>
                  </div>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link 
                  to="/" 
                  className="inline-flex items-center text-primary hover:text-secondary transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsOfServicePage;