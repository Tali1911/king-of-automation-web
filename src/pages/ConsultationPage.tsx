import React, { useEffect } from 'react';
import SEO from '@/components/SEO';
import ConsultationBooking from '@/components/common/ConsultationBooking';
import { CheckCircle, Clock, Users, Award } from 'lucide-react';

const ConsultationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Expert Guidance',
      description: 'Get personalized advice from automation specialists with 5+ years of experience'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Book consultations at your convenience with same-day availability'
    },
    {
      icon: Users,
      title: 'Tailored Solutions',
      description: 'Receive custom automation strategies designed for your specific business needs'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Learn from successful automation implementations across various industries'
    }
  ];

  const consultationSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Business Automation Consultation",
    "description": "Professional consultation services for business automation and digital transformation",
    "provider": {
      "@type": "Organization",
      "name": "Automation Solutions",
      "url": "https://your-domain.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "50",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "50",
        "priceCurrency": "USD",
        "unitText": "per hour"
      }
    },
    "serviceType": "Business Consultation",
    "category": "Automation Services"
  };

  return (
    <>
      <SEO 
        title="Book a Consultation - Expert Automation Advice"
        description="Schedule a consultation with our automation experts. Get personalized guidance on business automation solutions. $50/hour professional consultation services."
        keywords="consultation, automation expert, business consultation, automation advice, digital transformation"
        canonical="/consultation"
        schemaData={consultationSchema}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Expert Automation Consultation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get professional guidance on automating your business processes. Our experts will help you identify opportunities, 
              plan your automation strategy, and accelerate your digital transformation.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-background">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Consultation?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-16">
          <div className="container-custom">
            <ConsultationBooking />
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 bg-muted/50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">What to Expect</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-background p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Assessment</h3>
                  <p className="text-muted-foreground">
                    We'll analyze your current processes and identify automation opportunities
                  </p>
                </div>
                <div className="bg-background p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Strategy</h3>
                  <p className="text-muted-foreground">
                    Develop a customized automation roadmap tailored to your business goals
                  </p>
                </div>
                <div className="bg-background p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-primary">Next Steps</h3>
                  <p className="text-muted-foreground">
                    Get clear action items and recommendations for implementing automation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ConsultationPage;