import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SiteSettings {
  siteName: string;
  siteEmail: string;
  siteDescription: string;
  notifyConsultations: boolean;
  notifyQuotes: boolean;
  notifyContact: boolean;
  maintenanceMode: boolean;
  showGuide: boolean;
}

const defaultSettings: SiteSettings = {
  siteName: 'NafArro Solutions',
  siteEmail: 'info@nafarrosolutions.com',
  siteDescription: 'Web Development, Automation & Data Analysis Solutions',
  notifyConsultations: true,
  notifyQuotes: true,
  notifyContact: true,
  maintenanceMode: false,
  showGuide: true,
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const loadedSettings: Record<string, unknown> = {};
        data.forEach((row) => {
          loadedSettings[row.key] = row.value;
        });
        setSettings({ ...defaultSettings, ...loadedSettings as Partial<SiteSettings> });
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
      // Use defaults silently
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSetting = async (key: keyof SiteSettings, value: unknown): Promise<boolean> => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value,
          updated_at: new Date().toISOString(),
          updated_by: userData.user?.id,
        }, {
          onConflict: 'key',
        });

      if (error) {
        throw error;
      }

      setSettings(prev => ({ ...prev, [key]: value }));
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save setting';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const saveAllSettings = async (newSettings: Partial<SiteSettings>): Promise<boolean> => {
    setIsSaving(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      
      const updates = Object.entries(newSettings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
        updated_by: userData.user?.id,
      }));

      const { error } = await supabase
        .from('site_settings')
        .upsert(updates, { onConflict: 'key' });

      if (error) {
        throw error;
      }

      setSettings(prev => ({ ...prev, ...newSettings }));
      
      toast({
        title: 'Success',
        description: 'Settings saved successfully',
      });
      
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save settings';
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
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    isLoading,
    isSaving,
    fetchSettings,
    saveSetting,
    saveAllSettings,
  };
}
