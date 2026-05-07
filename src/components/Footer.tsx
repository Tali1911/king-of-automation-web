import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const handleRestartTour = () => {
    // Clear the guide completion status from localStorage
    localStorage.removeItem('naffaro-guide-seen');
    // Reload the page to trigger the guide
    window.location.reload();
  };
  return <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">NafArro Solutions</h3>
            <p className="mb-4 text-gray-300">King of Automation</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-secondary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="hover:text-secondary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-secondary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-secondary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-secondary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  className="text-gray-300 hover:text-secondary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RSS Feed
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/web-development" className="text-gray-300 hover:text-secondary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services/automation" className="text-gray-300 hover:text-secondary transition-colors">
                  Automation Solutions
                </Link>
              </li>
              <li>
                <Link to="/services/data-analysis" className="text-gray-300 hover:text-secondary transition-colors">
                  Data Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300"> Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">+254 701 443 446</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <a href="mailto:info@nafarrosolutions.com" className="text-gray-300 hover:text-secondary transition-colors">
                  info@nafarrosolutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm mb-2 md:mb-0">
              &copy; {new Date().getFullYear()} NafArro Solutions. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRestartTour}
                className="text-gray-400 text-sm hover:text-secondary transition-colors h-auto py-1 px-2"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Restart Tour
              </Button>
              <Link to="/privacy-policy" className="text-gray-400 text-sm hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 text-sm hover:text-secondary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;