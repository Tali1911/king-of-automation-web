import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { Button } from '@/components/ui/button';
import { getBlogPostById, blogPosts } from '@/data/blogPosts';
import RelatedServices from '../components/common/RelatedServices';
import NewsletterSignup from '../components/blog/NewsletterSignup';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? getBlogPostById(id) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const postUrl = `https://nafarrosolutions.com/blog/${post.id}`;
  const isoDate = (() => {
    const d = new Date(post.date);
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  })();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": { "@type": "WebPage", "@id": postUrl },
    "headline": post.title,
    "description": post.excerpt,
    "image": [post.image],
    "datePublished": isoDate,
    "dateModified": isoDate,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole,
    },
    "publisher": {
      "@type": "Organization",
      "name": "NafArro Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nafarrosolutions.com/lovable-uploads/554dc44c-5e9c-440a-8476-ae732b9fd973.png",
      },
    },
    "articleSection": post.category,
    "url": postUrl,
    "inLanguage": "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nafarrosolutions.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://nafarrosolutions.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": postUrl },
    ],
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={`${post.title} | NafArro Solutions Blog`}
        description={post.excerpt}
        keywords={`${post.category}, ${post.title}, NafArro Solutions blog`}
        canonical={postUrl}
        ogImage={post.image}
        ogType="article"
        schemaData={{ "@context": "https://schema.org", "@graph": [articleSchema, breadcrumbSchema] }}
      />

      <article className="bg-background">
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/60" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-custom pb-10 text-white">
              <span className="inline-block bg-secondary text-white text-xs px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">{post.title}</h1>
              <div className="mt-4 text-sm opacity-90">
                By {post.author} · {post.date} · {post.readTime}
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

          <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed text-foreground">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg bg-muted">
            <h3 className="text-lg font-semibold mb-1">{post.author}</h3>
            <p className="text-sm text-muted-foreground">{post.authorRole}</p>
          </div>
        </div>
      </article>

      <section className="py-16 bg-muted">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/blog/${p.id}`}
                className="block bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-40 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <span className="text-xs text-primary">{p.category}</span>
                  <h3 className="font-semibold mt-1 mb-2 line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup source="blog-post" />
      <RelatedServices title="Explore Our Services" />
    </div>
  );
};

export default BlogPostPage;
