import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PageSection {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'richtext' | 'image' | 'array';
  defaultValue: string | string[];
}

export interface PageConfig {
  id: string;
  name: string;
  path: string;
  sections: PageSection[];
}

export interface PageContent {
  id: string;
  page_id: string;
  section_id: string;
  content: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// Define editable sections for each page
export const pageConfigs: PageConfig[] = [
  {
    id: 'home',
    name: 'Home Page',
    path: '/',
    sections: [
      { id: 'hero_title', label: 'Hero Title', type: 'text', defaultValue: 'Automate Your Business with Smart Solutions' },
      { id: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', defaultValue: 'We build custom automation tools, websites, and data solutions that save time and drive growth.' },
      { id: 'hero_cta_primary', label: 'Primary CTA Text', type: 'text', defaultValue: 'Get Started' },
      { id: 'hero_cta_secondary', label: 'Secondary CTA Text', type: 'text', defaultValue: 'View Our Work' },
      { id: 'services_title', label: 'Services Section Title', type: 'text', defaultValue: 'Our Services' },
      { id: 'services_subtitle', label: 'Services Section Subtitle', type: 'textarea', defaultValue: 'Comprehensive solutions to streamline your business operations' },
      { id: 'why_choose_title', label: 'Why Choose Us Title', type: 'text', defaultValue: 'Why Choose NafArro Solutions?' },
    ],
  },
  {
    id: 'about',
    name: 'About Page',
    path: '/about',
    sections: [
      { id: 'hero_title', label: 'Hero Title', type: 'text', defaultValue: 'About NafArro Solutions' },
      { id: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', defaultValue: 'Empowering businesses through innovative technology solutions' },
      { id: 'mission_title', label: 'Mission Title', type: 'text', defaultValue: 'Our Mission' },
      { id: 'mission_content', label: 'Mission Content', type: 'textarea', defaultValue: '' },
      { id: 'vision_title', label: 'Vision Title', type: 'text', defaultValue: 'Our Vision' },
      { id: 'vision_content', label: 'Vision Content', type: 'textarea', defaultValue: '' },
      { id: 'founder_name', label: 'Founder Name', type: 'text', defaultValue: 'Naftali Koome' },
      { id: 'founder_title', label: 'Founder Title', type: 'text', defaultValue: 'Founder & Lead Developer' },
      { id: 'founder_bio', label: 'Founder Bio', type: 'textarea', defaultValue: '' },
    ],
  },
  {
    id: 'services',
    name: 'Services Page',
    path: '/services',
    sections: [
      { id: 'hero_title', label: 'Hero Title', type: 'text', defaultValue: 'Our Services' },
      { id: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', defaultValue: 'Comprehensive solutions tailored to your business needs' },
      { id: 'web_dev_title', label: 'Web Development Title', type: 'text', defaultValue: 'Web Development' },
      { id: 'web_dev_description', label: 'Web Development Description', type: 'textarea', defaultValue: '' },
      { id: 'automation_title', label: 'Automation Title', type: 'text', defaultValue: 'Business Automation' },
      { id: 'automation_description', label: 'Automation Description', type: 'textarea', defaultValue: '' },
      { id: 'data_title', label: 'Data Analysis Title', type: 'text', defaultValue: 'Data Analysis' },
      { id: 'data_description', label: 'Data Analysis Description', type: 'textarea', defaultValue: '' },
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfolio Page',
    path: '/portfolio',
    sections: [
      { id: 'hero_title', label: 'Hero Title', type: 'text', defaultValue: 'Our Portfolio' },
      { id: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', defaultValue: 'Explore our recent projects and success stories' },
      { id: 'cta_title', label: 'CTA Section Title', type: 'text', defaultValue: 'Ready to Start Your Project?' },
      { id: 'cta_description', label: 'CTA Description', type: 'textarea', defaultValue: '' },
    ],
  },
  {
    id: 'contact',
    name: 'Contact Page',
    path: '/contact',
    sections: [
      { id: 'hero_title', label: 'Hero Title', type: 'text', defaultValue: 'Contact Us' },
      { id: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', defaultValue: 'Get in touch with our team' },
      { id: 'form_title', label: 'Form Title', type: 'text', defaultValue: 'Send us a message' },
      { id: 'email', label: 'Contact Email', type: 'text', defaultValue: 'info@nafarrosolutions.com' },
      { id: 'phone', label: 'Contact Phone', type: 'text', defaultValue: '' },
      { id: 'address', label: 'Address', type: 'textarea', defaultValue: '' },
    ],
  },
  {
    id: 'blog',
    name: 'Blog Page',
    path: '/blog',
    sections: [
      { id: 'hero_title', label: 'Hero Title', type: 'text', defaultValue: 'Our Blog' },
      { id: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', defaultValue: 'Insights, tips, and news from NafArro Solutions' },
      { id: 'newsletter_title', label: 'Newsletter Title', type: 'text', defaultValue: 'Subscribe to Our Newsletter' },
      { id: 'newsletter_description', label: 'Newsletter Description', type: 'textarea', defaultValue: '' },
    ],
  },
];

export function usePageContent(pageId?: string) {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const fetchContent = useCallback(async () => {
    if (!pageId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_id', pageId);

      if (error) throw error;

      const contentMap: Record<string, string> = {};
      data?.forEach((item: PageContent) => {
        contentMap[item.section_id] = (item.content as { value?: string })?.value || '';
      });

      setContent(contentMap);
    } catch (err) {
      console.error('Error fetching page content:', err);
    } finally {
      setIsLoading(false);
    }
  }, [pageId]);

  const saveContent = async (sectionId: string, value: string): Promise<boolean> => {
    if (!pageId) return false;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('page_content')
        .upsert(
          {
            page_id: pageId,
            section_id: sectionId,
            content: { value },
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'page_id,section_id' }
        );

      if (error) throw error;

      setContent(prev => ({ ...prev, [sectionId]: value }));
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save content';
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

  const saveAllContent = async (contentData: Record<string, string>): Promise<boolean> => {
    if (!pageId) return false;

    setIsSaving(true);
    try {
      const upsertData = Object.entries(contentData).map(([sectionId, value]) => ({
        page_id: pageId,
        section_id: sectionId,
        content: { value },
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from('page_content')
        .upsert(upsertData, { onConflict: 'page_id,section_id' });

      if (error) throw error;

      setContent(contentData);
      toast({
        title: 'Success',
        description: 'Page content saved successfully',
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save content';
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
    fetchContent();
  }, [fetchContent]);

  return {
    content,
    isLoading,
    isSaving,
    saveContent,
    saveAllContent,
    refetch: fetchContent,
  };
}

// Hook for fetching content on public pages
export function usePublicPageContent(pageId: string) {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from('page_content')
          .select('section_id, content')
          .eq('page_id', pageId);

        if (error) throw error;

        const contentMap: Record<string, string> = {};
        data?.forEach((item) => {
          contentMap[item.section_id] = (item.content as { value?: string })?.value || '';
        });

        setContent(contentMap);
      } catch (err) {
        console.error('Error fetching page content:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, [pageId]);

  return { content, isLoading };
}
