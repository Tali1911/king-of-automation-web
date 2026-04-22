
import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import BlogHero from '../components/blog/BlogHero';
import FeaturedPosts from '../components/blog/FeaturedPosts';
import BlogCategories from '../components/blog/BlogCategories';
import NewsletterSignup from '../components/blog/NewsletterSignup';
import RecentPosts from '../components/blog/RecentPosts';
import RelatedServices from '../components/common/RelatedServices';

const BlogPage = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Automation & Web Dev Blog | NafArro Solutions"
        description="Insights on business process automation, web development, data analysis and custom software from the NafArro Solutions team."
        keywords="automation blog, web development articles, data analysis tips, React Node.js tutorials, business automation Kenya"
      />
      <BlogHero />
      <FeaturedPosts />
      <BlogCategories />
      <RecentPosts />
      <RelatedServices title="Our Services" />
      <NewsletterSignup />
    </div>
  );
};

export default BlogPage;
