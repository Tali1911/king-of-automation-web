import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const formatDate = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const RecentPosts = () => {
  const { posts, isLoading } = useBlogPosts();

  const recentPosts = (posts || [])
    .filter((p) => p.status === 'published')
    .slice(3, 8);

  if (isLoading || recentPosts.length === 0) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold">Recent Articles</h2>
          <Link to="/blog" className="text-primary hover:text-secondary transition-colors">
            View all articles →
          </Link>
        </div>

        <div className="space-y-6">
          {recentPosts.map((post, index) => (
            <div key={post.id}>
              <Link to={`/blog/${post.slug || post.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center text-sm text-muted-foreground mb-1 flex-wrap gap-x-2">
                      {post.category && <span className="text-primary">{post.category}</span>}
                      {post.category && <span>•</span>}
                      <span>{formatDate(post.published_at || post.created_at)}</span>
                      {post.read_time && (
                        <>
                          <span>•</span>
                          <span>{post.read_time}</span>
                        </>
                      )}
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
