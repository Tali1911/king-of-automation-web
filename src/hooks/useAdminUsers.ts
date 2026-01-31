import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  role: 'admin' | 'moderator';
  created_at: string;
}

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);

    try {
      // Fetch user_roles with user emails from auth.users
      // Since we can't directly query auth.users, we'll need to work with what we have
      const { data, error } = await supabase
        .from('user_roles')
        .select('id, user_id, role, created_at');

      if (error) {
        throw error;
      }

      // Map the data - emails will need to be fetched separately or stored
      const usersData: AdminUser[] = (data || []).map(row => ({
        id: row.id,
        user_id: row.user_id,
        email: 'User ID: ' + row.user_id.slice(0, 8) + '...', // Placeholder
        role: row.role as 'admin' | 'moderator',
        created_at: row.created_at,
      }));

      setUsers(usersData);
    } catch (err) {
      console.error('Failed to fetch admin users:', err);
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const addUserRole = async (userId: string, role: 'admin' | 'moderator'): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role,
        });

      if (error) {
        throw error;
      }

      toast({
        title: 'Success',
        description: 'User role added successfully',
      });

      await fetchUsers();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add user role';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const removeUserRole = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Success',
        description: 'User role removed successfully',
      });

      await fetchUsers();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove user role';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateUserRole = async (id: string, newRole: 'admin' | 'moderator'): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Success',
        description: 'User role updated successfully',
      });

      await fetchUsers();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update user role';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    fetchUsers,
    addUserRole,
    removeUserRole,
    updateUserRole,
  };
}
