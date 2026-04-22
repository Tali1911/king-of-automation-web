
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <SEO
        title="Page Not Found | NafArro Solutions"
        description="The page you are looking for could not be found. Return to NafArro Solutions for automation, web development and data services."
        noindex
      />
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-primary animate-fade-in">404</h1>
        <p className="text-2xl text-gray-700 mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
          Oops! Page not found
        </p>
        <p className="text-gray-600 mb-12 max-w-md mx-auto animate-fade-in" style={{animationDelay: '0.5s'}}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center btn-primary animate-fade-in"
          style={{animationDelay: '0.7s'}}
        >
          <Home className="mr-2" size={18} />
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
