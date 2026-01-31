import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  featured_image: string | null;
  status: 'draft' | 'published';
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostInput {
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  status?: 'draft' | 'published';
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setPosts(data as BlogPost[] || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch blog posts';
      setError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const createPost = async (post: BlogPostInput): Promise<BlogPost | null> => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      const { data, error: createError } = await supabase
        .from('blog_posts')
        .insert({
          ...post,
          author_id: userData.user?.id,
          published_at: post.status === 'published' ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      toast({
        title: 'Success',
        description: 'Blog post created successfully',
      });

      await fetchPosts();
      return data as BlogPost;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create blog post';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updatePost = async (id: string, updates: Partial<BlogPostInput>): Promise<boolean> => {
    try {
      const updateData: Record<string, unknown> = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      if (updates.status === 'published') {
        const existingPost = posts.find(p => p.id === id);
        if (existingPost && !existingPost.published_at) {
          updateData.published_at = new Date().toISOString();
        }
      }

      const { error: updateError } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: 'Success',
        description: 'Blog post updated successfully',
      });

      await fetchPosts();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update blog post';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      toast({
        title: 'Success',
        description: 'Blog post deleted successfully',
      });

      await fetchPosts();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete blog post';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
}
