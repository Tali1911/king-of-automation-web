import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
  { to: '/consultation', label: 'Consultation' },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = (to: string) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-300 ${
      location.pathname === to ? 'text-[#33c3f0]' : 'text-[#c6d5e6] hover:text-white'
    } after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-[#33c3f0] after:transition-all after:duration-300 ${
      location.pathname === to ? 'after:w-full after:shadow-[0_0_8px_rgba(51,195,240,0.8)]' : 'after:w-0 hover:after:w-full'
    }`;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled || isMenuOpen
          ? 'py-2 glass-panel shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group" aria-label="NafArro Solutions home">
          <img
            src="/lovable-uploads/554dc44c-5e9c-440a-8476-ae732b9fd973.png"
            alt="NafArro Solutions Logo"
            className="h-11 w-11 transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110"
          />
          <span className="hidden sm:block font-display text-sm font-semibold tracking-widest uppercase text-white">
            NafArro
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={linkClass(l.to)}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-[#05101f] transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(100deg, #33c3f0, #7fdcff)',
              boxShadow: '0 0 24px rgba(51,195,240,0.35)',
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white glass-panel rounded-lg p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel animate-fade-in border-t border-white/5">
          <div className="container-custom py-6 flex flex-col gap-5">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-base font-medium ${linkClass(l.to)} animate-fade-in`}
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-2 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-[#05101f]"
              style={{ background: 'linear-gradient(100deg, #33c3f0, #7fdcff)' }}
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
