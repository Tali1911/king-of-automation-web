
import React, { useEffect } from 'react';
import BlogHero from '../components/blog/BlogHero';
import FeaturedPosts from '../components/blog/FeaturedPosts';
import BlogCategories from '../components/blog/BlogCategories';
import NewsletterSignup from '../components/blog/NewsletterSignup';
import RecentPosts from '../components/blog/RecentPosts';

const BlogPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <BlogHero />
      <FeaturedPosts />
      <BlogCategories />
      <RecentPosts />
      <NewsletterSignup />
    </div>
  );
};

export default BlogPage;
