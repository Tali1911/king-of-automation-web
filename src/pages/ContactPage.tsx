import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SEO from '../components/SEO';
import ConsultationBooking from '../components/common/ConsultationBooking';
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Subject: ${formData.subject}\n\n` +
      `Message:\n${formData.message}`
    );
    
    // Open default mail client
    window.location.href = `mailto:naftali@nafarrosolutions.com?subject=${subject}&body=${body}`;
  };
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "NafArro Solutions",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+254-701-443-446",
          "contactType": "Customer Service",
          "email": "info@nafarrosolutions.com",
          "availableLanguage": "English"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nairobi,Kenya",
        "addressLocality": "Innovation City",
        "postalCode": "98765",
        "addressCountry": "US"
      }
    }
  };

  return (
    <>
      <SEO 
        title="Contact NafArro Solutions - Get Your Automation Project Started Today"
        description="Contact NafArro Solutions for website development, web application automation, and data analysis services. Get expert consultation and free quotes for your automation project."
        keywords="contact nafarro solutions, automation consultation, website development quote, web application development, data analysis consultation, business automation experts"
        canonical={typeof window !== 'undefined' ? window.location.href : ''}
        schemaData={contactPageSchema}
      />
      <div className="pt-20">
      {/* Contact Header */}
      <div className="bg-primary text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            Have questions or ready to get started? Reach out to our team for expert assistance.
          </p>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 animate-fade-in-right" style={{
          animationDelay: '0.3s'
        }}>
            <h2 className="text-2xl font-bold mb-6 text-primary">Get in Touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Phone className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone</h3>
                  <p className="text-gray-600">+254 701 443 446</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                 <div>
                   <h3 className="font-semibold text-lg mb-1">Email</h3>
                   <a href="mailto:naftali@nafarrosolutions.com" className="text-gray-600 hover:text-primary transition-colors">naftali@nafarrosolutions.com</a>
                 </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Office</h3>
                  <p className="text-gray-600">Nairobi,Kenya</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-4 text-primary">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Tabbed Forms */}
          <div className="lg:col-span-2 animate-fade-in-left" style={{
          animationDelay: '0.4s'
        }}>
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="consultation">Book Consultation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="contact">
                <h2 className="text-2xl font-bold mb-6 text-primary">Send a Message</h2>
                
                {submitSuccess && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 animate-fade-in">
                    Thank you for your message! We'll get back to you shortly.
                  </div>}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select name="subject" id="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required>
                        <option value="">Select a subject</option>
                        <option value="Website Development">Website Development</option>
                        <option value="Web Application">Web Application</option>
                        <option value="Data Analysis">Data Analysis</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required></textarea>
                  </div>
                  
                  <div>
                    <button type="submit" disabled={isSubmitting} className={`flex items-center justify-center bg-primary text-white py-3 px-6 rounded-md transition-all ${isSubmitting ? 'opacity-70' : 'hover:bg-primary/90 hover:shadow-lg'}`}>
                      {isSubmitting ? 'Sending...' : <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>}
                    </button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="consultation" className="mt-6">
                <ConsultationBooking />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
export default ContactPage;