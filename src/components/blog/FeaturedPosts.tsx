import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8;
};

const formatDate = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const FeaturedPosts = () => {
  const { posts, isLoading } = useBlogPosts();

  useEffect(() => {
    const animateOnScroll = () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        if (isInViewport(el as HTMLElement)) el.classList.add('show');
      });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, [posts]);

  const featuredPosts = (posts || [])
    .filter((p) => p.status === 'published')
    .slice(0, 3);

  if (isLoading || featuredPosts.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <h2 className="section-title text-center mb-16 animate-on-scroll">Featured Articles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <div key={post.id} className="animate-on-scroll" style={{ transitionDelay: `${index * 0.2}s` }}>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Link to={`/blog/${post.slug || post.id}`}>
                    <Card className="h-full overflow-hidden card-hover group">
                      {post.featured_image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {post.category && (
                            <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                              {post.category}
                            </div>
                          )}
                        </div>
                      )}

                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground flex justify-between">
                          <span>{formatDate(post.published_at || post.created_at)}</span>
                          {post.read_time && <span>{post.read_time}</span>}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      </CardContent>

                      <CardFooter className="text-sm text-muted-foreground border-t pt-4">
                        <div className="flex items-center justify-between w-full">
                          <div>{post.author ? `By ${post.author}` : ''}</div>
                          <span className="text-primary">Read more →</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </HoverCardTrigger>
                {(post.author || post.excerpt) && (
                  <HoverCardContent className="w-80 p-0 overflow-hidden">
                    <div className="p-4">
                      {post.author && <h4 className="font-medium text-sm mb-1">{post.author}</h4>}
                      {post.author_role && (
                        <p className="text-xs text-muted-foreground mb-3">{post.author_role}</p>
                      )}
                      {post.excerpt && <p className="text-xs">{post.excerpt}</p>}
                    </div>
                  </HoverCardContent>
                )}
              </HoverCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
