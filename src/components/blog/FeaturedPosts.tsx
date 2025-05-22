
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

// Helper function to check if an element is in viewport
const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
  );
};

const FeaturedPosts = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        if (isInViewport(element as HTMLElement)) {
          element.classList.add('show');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    // Initial check
    animateOnScroll();

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Automation in Small Business",
      excerpt: "How automation is revolutionizing the way small businesses operate and compete in today's market.",
      category: "Industry Insights",
      date: "May 15, 2025",
      author: "Sarah Johnson",
      authorRole: "CTO at NafArro Solutions",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "10 Processes You Should Automate Today",
      excerpt: "A comprehensive guide to identifying and automating repetitive tasks that are costing your business time and money.",
      category: "Tutorials",
      date: "May 10, 2025",
      author: "Michael Chang",
      authorRole: "Automation Specialist",
      image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Data-Driven Decision Making: A Beginner's Guide",
      excerpt: "Learn how to leverage your business data to make informed decisions and drive growth.",
      category: "Data Analysis",
      date: "May 5, 2025",
      author: "Elena Rodriguez",
      authorRole: "Data Analyst",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      readTime: "6 min read"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <h2 className="section-title text-center mb-16 animate-on-scroll">Featured Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <div key={post.id} className="animate-on-scroll" style={{transitionDelay: `${index * 0.2}s`}}>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link to={`/blog/${post.id}`}>
                    <Card className="h-full overflow-hidden card-hover group">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                          {post.category}
                        </div>
                      </div>
                      
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground flex justify-between">
                          <span>{post.date}</span>
                          <span>{post.readTime}</span>
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      </CardContent>
                      
                      <CardFooter className="text-sm text-muted-foreground border-t pt-4">
                        <div className="flex items-center justify-between w-full">
                          <div>By {post.author}</div>
                          <span className="text-primary">Read more →</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-0 overflow-hidden">
                  <div className="p-4">
                    <h4 className="font-medium text-sm mb-1">{post.author}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{post.authorRole}</p>
                    <p className="text-xs">{post.excerpt}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
