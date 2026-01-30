import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AppRole = 'admin' | 'moderator';

interface AdminAuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isModerator: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAdminAuth() {
  const [authState, setAuthState] = useState<AdminAuthState>({
    user: null,
    session: null,
    isAdmin: false,
    isModerator: false,
    isLoading: true,
    error: null,
  });

  const checkUserRole = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        console.error('Error checking user role:', error);
        return { isAdmin: false, isModerator: false };
      }

      const roles = data?.map((r) => r.role) || [];
      return {
        isAdmin: roles.includes('admin'),
        isModerator: roles.includes('moderator') || roles.includes('admin'),
      };
    } catch (err) {
      console.error('Error in checkUserRole:', err);
      return { isAdmin: false, isModerator: false };
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
        }));

        // Defer role checking with setTimeout to prevent deadlock
        if (session?.user) {
          setTimeout(async () => {
            const roles = await checkUserRole(session.user.id);
            setAuthState(prev => ({
              ...prev,
              ...roles,
              isLoading: false,
            }));
          }, 0);
        } else {
          setAuthState(prev => ({
            ...prev,
            isAdmin: false,
            isModerator: false,
            isLoading: false,
          }));
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const roles = await checkUserRole(session.user.id);
        setAuthState({
          session,
          user: session.user,
          ...roles,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          session: null,
          user: null,
          isAdmin: false,
          isModerator: false,
          isLoading: false,
          error: null,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [checkUserRole]);

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setAuthState(prev => ({ ...prev, isLoading: false, error: error.message }));
        return { error };
      }

      if (data.user) {
        const roles = await checkUserRole(data.user.id);
        
        if (!roles.isAdmin && !roles.isModerator) {
          await supabase.auth.signOut();
          const accessError = 'Access denied. You do not have admin privileges.';
          setAuthState(prev => ({ ...prev, isLoading: false, error: accessError }));
          return { error: { message: accessError } };
        }
      }

      return { error: null };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setAuthState(prev => ({ ...prev, isLoading: false, error: errorMessage }));
      return { error: { message: errorMessage } };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAuthState({
      user: null,
      session: null,
      isAdmin: false,
      isModerator: false,
      isLoading: false,
      error: null,
    });
  };

  const inviteUser = async (email: string, role: AppRole) => {
    if (!authState.isAdmin) {
      return { error: { message: 'Only admins can invite users' } };
    }

    try {
      // Create user via Supabase Auth Admin API would require edge function
      // For now, return instruction for manual process
      return { 
        error: null, 
        message: `To invite ${email} as ${role}: Create user in Supabase Auth dashboard, then add their UUID to user_roles table.` 
      };
    } catch (err) {
      return { error: { message: 'Failed to invite user' } };
    }
  };

  return {
    ...authState,
    signIn,
    signOut,
    inviteUser,
  };
}
