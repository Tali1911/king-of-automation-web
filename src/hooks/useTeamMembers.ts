import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  github_url: string | null;
  email: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type TeamMemberInput = Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>;

// Untyped table accessor (types.ts not generated for this table yet)
const tbl = () => (supabase as any).from('team_members');

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await tbl()
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      setMembers((data as TeamMember[]) || []);
    } catch (err) {
      console.error('Error fetching team members:', err);
      toast({ title: 'Error', description: 'Failed to load team members', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const createMember = async (m: Partial<TeamMemberInput>): Promise<TeamMember | null> => {
    setIsSaving(true);
    try {
      const { data, error } = await tbl()
        .insert({
          name: m.name || 'New Team Member',
          role: m.role || 'Team Member',
          bio: m.bio || '',
          image_url: m.image_url || null,
          linkedin_url: m.linkedin_url || null,
          twitter_url: m.twitter_url || null,
          github_url: m.github_url || null,
          email: m.email || null,
          display_order: m.display_order ?? members.length,
          is_published: m.is_published ?? true,
        })
        .select()
        .single();
      if (error) throw error;
      setMembers(prev => [...prev, data as TeamMember]);
      toast({ title: 'Success', description: 'Team member added' });
      return data as TeamMember;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create team member';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const updateMember = async (id: string, updates: Partial<TeamMemberInput>): Promise<boolean> => {
    setIsSaving(true);
    try {
      const { error } = await tbl()
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      setMembers(prev =>
        prev.map(p => (p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } as TeamMember : p))
      );
      toast({ title: 'Success', description: 'Team member updated' });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update team member';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteMember = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    try {
      const { error } = await tbl().delete().eq('id', id);
      if (error) throw error;
      setMembers(prev => prev.filter(p => p.id !== id));
      toast({ title: 'Success', description: 'Team member removed' });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete team member';
      toast({ title: 'Error', description: message, variant: 'destructive' });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  return { members, isLoading, isSaving, createMember, updateMember, deleteMember, refetch: fetchMembers };
}

export function usePublicTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await tbl()
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true });
        if (error) throw error;
        setMembers((data as TeamMember[]) || []);
      } catch (err) {
        console.error('Error fetching public team members:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { members, isLoading };
}
