import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  created_at: string;
}

export function usePortfolioCategories() {
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from('portfolio_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      console.error('Error fetching portfolio categories:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCategory = async (name: string): Promise<boolean> => {
    setIsSaving(true);
    try {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const { error } = await (supabase as any)
        .from('portfolio_categories')
        .insert({
          name,
          slug,
          display_order: categories.length,
        });

      if (error) throw error;
      await fetchCategories();
      toast({ title: 'Success', description: 'Category added' });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add category';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const removeCategory = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    try {
      const { error } = await (supabase as any)
        .from('portfolio_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchCategories();
      toast({ title: 'Success', description: 'Category removed' });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove category';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, isLoading, isSaving, addCategory, removeCategory, refetch: fetchCategories };
}

// Public hook - same data, no mutations
export function usePublicPortfolioCategories() {
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const { data, error } = await (supabase as any)
          .from('portfolio_categories')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setCategories(data || []);
      } catch (err) {
        console.error('Error fetching portfolio categories:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, []);

  return { categories, isLoading };
}
