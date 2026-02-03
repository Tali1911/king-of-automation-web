import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string | null;
  technologies: string[];
  results: string | null;
  live_url: string | null;
  github_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type PortfolioProjectInput = Omit<PortfolioProject, 'id' | 'created_at' | 'updated_at'>;

export function usePortfolioProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching portfolio projects:', err);
      toast({
        title: 'Error',
        description: 'Failed to load portfolio projects',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const createProject = async (project: Partial<PortfolioProjectInput>): Promise<PortfolioProject | null> => {
    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .insert({
          title: project.title || 'New Project',
          category: project.category || 'automation',
          description: project.description || '',
          image_url: project.image_url || null,
          technologies: project.technologies || [],
          results: project.results || '',
          live_url: project.live_url || null,
          github_url: project.github_url || null,
          display_order: project.display_order ?? projects.length,
          is_published: project.is_published ?? true,
        })
        .select()
        .single();

      if (error) throw error;

      setProjects(prev => [...prev, data]);
      toast({
        title: 'Success',
        description: 'Project created successfully',
      });
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create project';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const updateProject = async (id: string, updates: Partial<PortfolioProjectInput>): Promise<boolean> => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      setProjects(prev =>
        prev.map(p => (p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p))
      );
      toast({
        title: 'Success',
        description: 'Project updated successfully',
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update project';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(prev => prev.filter(p => p.id !== id));
      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete project';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    isSaving,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  };
}

// Hook for public pages - only fetches published projects
export function usePublicPortfolioProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('portfolio_projects')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error('Error fetching portfolio projects:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, isLoading };
}
