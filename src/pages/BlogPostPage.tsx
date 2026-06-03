import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { Button } from '@/components/ui/button';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import RelatedServices from '../components/common/RelatedServices';
import NewsletterSignup from '../components/blog/NewsletterSignup';

const formatDate = (iso: string | null) => {
  if (!iso) return '';
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, isLoading } = useBlogPosts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const post = (posts || []).find((p) => p.slug === id || p.id === id);

  if (!post || post.status !== 'published') {
    return <Navigate to="/blog" replace />;
  }

  const related = (posts || [])
    .filter((p) => p.status === 'published' && p.id !== post.id)
    .slice(0, 3);

  const postUrl = `https://nafarrosolutions.com/blog/${post.slug || post.id}`;
  const isoDate = post.published_at || post.created_at;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image ? [post.featured_image] : undefined,
    datePublished: isoDate,
    dateModified: post.updated_at,
    author: post.author
      ? { '@type': 'Person', name: post.author, jobTitle: post.author_role || undefined }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'NafArro Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nafarrosolutions.com/lovable-uploads/554dc44c-5e9c-440a-8476-ae732b9fd973.png',
      },
    },
    articleSection: post.category,
    url: postUrl,
    inLanguage: 'en-US',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nafarrosolutions.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://nafarrosolutions.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={`${post.title} | NafArro Blog`}
        description={post.excerpt || ''}
        keywords={`${post.category || ''}, ${post.title}, NafArro Solutions blog`}
        canonical={postUrl}
        ogType="article"
        schemaData={{ '@context': 'https://schema.org', '@graph': [articleSchema, breadcrumbSchema] }}
      />

      <article className="bg-background">
        <div className="relative h-72 md:h-96 overflow-hidden">
          {post.featured_image && (
            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-primary/60" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-custom pb-10 text-white">
              {post.category && (
                <span className="inline-block bg-secondary text-white text-xs px-3 py-1 rounded-full mb-4">
                  {post.category}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">{post.title}</h1>
              <div className="mt-4 text-sm opacity-90">
                {post.author && <>By {post.author} · </>}
                {formatDate(post.published_at || post.created_at)}
                {post.read_time && <> · {post.read_time}</>}
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-12 max-w-3xl">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Button>
          </Link>

          {post.excerpt && <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>}

          <div className="prose prose-lg max-w-none">
            {(post.content || '').split('\n\n').map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed text-foreground">
                {para}
              </p>
            ))}
          </div>

          {(post.author || post.author_role) && (
            <div className="mt-12 p-6 rounded-lg bg-muted">
              {post.author && <h3 className="text-lg font-semibold mb-1">{post.author}</h3>}
              {post.author_role && (
                <p className="text-sm text-muted-foreground">{post.author_role}</p>
              )}
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug || p.id}`}
                  className="block bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {p.featured_image && (
                    <div className="h-40 overflow-hidden">
                      <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    {p.category && <span className="text-xs text-primary">{p.category}</span>}
                    <h3 className="font-semibold mt-1 mb-2 line-clamp-2">{p.title}</h3>
                    {p.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSignup source="blog-post" />
      <RelatedServices title="Explore Our Services" />
    </div>
  );
};

export default BlogPostPage;
