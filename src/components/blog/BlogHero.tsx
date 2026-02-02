import React from 'react';
import { usePublicPageContent } from '@/hooks/usePageContent';

const BlogHero = () => {
  const { getContent } = usePublicPageContent('blog');
  
  const heroTitle = getContent('hero_title', 'Blog & Resources');
  const heroSubtitle = getContent('hero_subtitle', 'Insights, tutorials, and industry trends in automation, web development, and data analysis');

  return (
    <section className="bg-gradient-to-br from-primary to-accent py-20 text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">{heroTitle}</h1>
          <p className="text-xl mb-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
            {heroSubtitle}
          </p>
          <div className="relative max-w-xl mx-auto animate-fade-in" style={{animationDelay: '0.4s'}}>
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full py-3 px-6 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder:text-white/70"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-primary rounded-full p-2 hover:bg-opacity-90 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
