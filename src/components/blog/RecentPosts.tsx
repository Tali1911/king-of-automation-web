
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const RecentPosts = () => {
  const recentPosts = [
    {
      id: 4,
      title: "5 Ways Automation Can Reduce Operational Costs",
      excerpt: "Discover how implementing automation in key areas can significantly cut your business expenses.",
      category: "Industry Insights",
      date: "April 28, 2025",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "Building Your First Automated Workflow with Node.js",
      excerpt: "A technical tutorial on creating efficient automated workflows using Node.js and Express.",
      category: "Tutorials",
      date: "April 22, 2025",
      readTime: "10 min read"
    },
    {
      id: 6,
      title: "The Role of AI in Modern Business Automation",
      excerpt: "Exploring how artificial intelligence is enhancing automation capabilities for businesses of all sizes.",
      category: "Industry Insights",
      date: "April 18, 2025",
      readTime: "7 min read"
    },
    {
      id: 7,
      title: "User Experience Best Practices for Business Applications",
      excerpt: "Key principles to ensure your automated business applications provide excellent user experience.",
      category: "Web Development",
      date: "April 15, 2025",
      readTime: "5 min read"
    },
    {
      id: 8,
      title: "Visualizing Data: Creating Effective Dashboards",
      excerpt: "Learn how to design informative and user-friendly dashboards for your business data.",
      category: "Data Analysis",
      date: "April 10, 2025",
      readTime: "6 min read"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold">Recent Articles</h2>
          <Link to="/blog/all" className="text-primary hover:text-secondary transition-colors">
            View all articles →
          </Link>
        </div>
        
        <div className="space-y-6">
          {recentPosts.map((post, index) => (
            <div key={post.id}>
              <Link to={`/blog/${post.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <span className="text-primary">{post.category}</span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
              {index < recentPosts.length - 1 && <Separator className="my-6" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
