import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RelatedPostsProps {
  excludeSlug?: string;
  limit?: number;
  title?: string;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({
  excludeSlug,
  limit = 3,
  title = 'From the Blog',
}) => {
  const { posts, isLoading } = useBlogPosts();

  if (isLoading) return null;

  const published = (posts || []).filter(
    (p) => p.status === 'published' && p.slug !== excludeSlug
  );

  const list = published.slice(0, limit);

  if (list.length === 0) return null;

  return (
    <section className="py-16 bg-background" aria-labelledby="related-posts-heading">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h2 id="related-posts-heading" className="text-3xl font-bold text-primary">
            {title}
          </h2>
          <Link
            to="/blog"
            className="text-primary hover:text-secondary transition-colors font-medium"
          >
            View all articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug || post.id}`}
              title={post.title}
              className="block group"
            >
              <Card className="h-full hover:shadow-lg hover:border-primary transition-all">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                {post.excerpt && (
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
