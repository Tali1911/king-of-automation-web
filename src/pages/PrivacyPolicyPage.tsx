import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const PrivacyPolicyPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const privacyPolicySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - NafArro Solutions",
    "description": "Privacy Policy and data protection information for NafArro Solutions automation services."
  };

  return (
    <>
      <SEO 
        title="Privacy Policy | NafArro Solutions"
        description="Learn about our privacy policy and how NafArro Solutions protects your personal information and data."
        keywords="privacy policy, data protection, GDPR compliance, data security"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schemaData={privacyPolicySchema}
      />
      <div className="pt-20">
        {/* Header */}
        <div className="bg-primary text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Privacy Policy</h1>
            <p className="text-xl text-gray-300 max-w-3xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
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
                  <h2 className="text-2xl font-bold text-primary mb-4">Information We Collect</h2>
                  <p className="text-gray-700 mb-4">
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Contact us through our website forms</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Schedule consultations</li>
                    <li>Request quotes for our services</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">How We Use Your Information</h2>
                  <p className="text-gray-700 mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you updates about our services (with your consent)</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">Information Sharing</h2>
                  <p className="text-gray-700 mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties except:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>With your explicit consent</li>
                    <li>To comply with legal requirements</li>
                    <li>To protect our rights and safety</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">Data Security</h2>
                  <p className="text-gray-700">
                    We implement appropriate security measures to protect your personal information against unauthorized access, 
                    alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
                    storage is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">Your Rights</h2>
                  <p className="text-gray-700 mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt-out of marketing communications</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
                  <p className="text-gray-700">
                    If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicyPage;