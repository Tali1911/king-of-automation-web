import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, RotateCcw } from 'lucide-react';

const socials = [
  { href: 'https://facebook.com', Icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com', Icon: Twitter, label: 'Twitter' },
  { href: 'https://linkedin.com', Icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com', Icon: Instagram, label: 'Instagram' },
];

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { href: '/rss.xml', label: 'RSS Feed', external: true },
  { to: '/contact', label: 'Contact' },
];

const serviceLinks = [
  { to: '/services/web-development', label: 'Web Development' },
  { to: '/services/automation', label: 'Automation Solutions' },
  { to: '/services/data-analysis', label: 'Data Analysis' },
];

const Footer = () => {
  const handleRestartTour = () => {
    // Clear the guide completion status from localStorage
    localStorage.removeItem('naffaro-guide-seen');
    // Reload the page to trigger the guide
    window.location.reload();
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#040a14] pb-8 pt-14 text-white overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'rgba(51,195,240,0.07)' }}
      />
      <div className="container-custom relative">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="font-display text-xl font-bold mb-2">NafArro Solutions</h3>
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-[#33c3f0]">
              King of Automation
            </p>
            <div className="flex space-x-3">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="glass-panel flex h-9 w-9 items-center justify-center rounded-lg text-[#c6d5e6] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#33c3f0]"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  {'to' in l ? (
                    <Link to={l.to} className="text-sm text-[#9db2c9] transition-colors hover:text-[#33c3f0]">
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#9db2c9] transition-colors hover:text-[#33c3f0]"
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-[#9db2c9] transition-colors hover:text-[#33c3f0]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-0.5 flex-shrink-0 text-[#33c3f0]" />
                <span className="text-sm text-[#9db2c9]">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 flex-shrink-0 text-[#33c3f0]" />
                <span className="text-sm text-[#9db2c9]">+254 701 443 446</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 flex-shrink-0 text-[#33c3f0]" />
                <a
                  href="mailto:info@nafarrosolutions.com"
                  className="text-sm text-[#9db2c9] transition-colors hover:text-[#33c3f0]"
                >
                  info@nafarrosolutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 border-t border-white/5 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-[#64798f]">
              &copy; {new Date().getFullYear()} NafArro Solutions. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <button
                onClick={handleRestartTour}
                className="flex items-center gap-1 text-sm text-[#64798f] transition-colors hover:text-[#33c3f0]"
              >
                <RotateCcw className="h-3 w-3" />
                Restart Tour
              </button>
              <Link to="/privacy-policy" className="text-sm text-[#64798f] transition-colors hover:text-[#33c3f0]">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-sm text-[#64798f] transition-colors hover:text-[#33c3f0]">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
