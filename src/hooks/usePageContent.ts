import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PageSection {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'richtext' | 'image';
  defaultValue: string;
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
      { id: 'hero_title', label: 'Hero Title', type: 'text', defaultValue: 'NafArro Solutions' },
      { id: 'hero_slogan', label: 'Hero Slogan', type: 'text', defaultValue: 'King of Automation' },
      { id: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', defaultValue: 'We transform manual processes into automated workflows, saving you time, reducing errors, and increasing productivity with cutting-edge technology solutions.' },
      { id: 'hero_cta_primary', label: 'Primary CTA Text', type: 'text', defaultValue: 'Schedule Consultation' },
      { id: 'hero_cta_secondary', label: 'Secondary CTA Text', type: 'text', defaultValue: 'Explore Services' },
      { id: 'services_title', label: 'Services Section Title', type: 'text', defaultValue: 'Our Services' },
      { id: 'services_subtitle', label: 'Services Section Subtitle', type: 'textarea', defaultValue: 'We provide end-to-end solutions to help businesses leverage technology for growth' },
      { id: 'why_choose_title', label: 'Why Choose Us Title', type: 'text', defaultValue: 'Why Choose Us' },
      { id: 'why_choose_subtitle', label: 'Why Choose Us Subtitle', type: 'textarea', defaultValue: "We're committed to excellence, innovation, and your success" },
    ],
  },
  {
    id: 'about',
    name: 'About Page',
    path: '/about',
    sections: [
      { id: 'hero_title', label: 'Hero Title', type: 'text', defaultValue: 'About NafArro Solutions' },
      { id: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', defaultValue: "We're on a mission to transform businesses through intelligent automation and innovative technology solutions." },
      { id: 'hero_image', label: 'Hero Background Image', type: 'image', defaultValue: '' },
      { id: 'story_title', label: 'Story Title', type: 'text', defaultValue: 'Our Story' },
      { id: 'story_content', label: 'Story Content', type: 'textarea', defaultValue: 'NafArro Solutions was founded with a singular vision: to help businesses leverage the power of automation to achieve greater efficiency and growth.' },
      { id: 'mission_title', label: 'Mission Title', type: 'text', defaultValue: 'Our Mission' },
      { id: 'mission_content', label: 'Mission Content', type: 'textarea', defaultValue: 'To empower businesses through innovative automation solutions that drive efficiency, reduce costs, and accelerate growth.' },
      { id: 'vision_title', label: 'Vision Title', type: 'text', defaultValue: 'Our Vision' },
      { id: 'vision_content', label: 'Vision Content', type: 'textarea', defaultValue: 'To be recognized as the leading automation solutions provider, known for our technical excellence, innovation, and exceptional client service.' },
      { id: 'founder_name', label: 'Founder Name', type: 'text', defaultValue: 'Naftali Koome' },
      { id: 'founder_title', label: 'Founder Title', type: 'text', defaultValue: 'Founder & Lead Developer' },
      { id: 'founder_bio', label: 'Founder Bio', type: 'textarea', defaultValue: '' },
      { id: 'founder_image', label: 'Founder Image', type: 'image', defaultValue: '' },
    ],
  },
  {
    id: 'services',
    name: 'Services Page',
    path: '/services',
    sections: [
      { id: 'hero_title', label: 'Hero Title', type: 'text', defaultValue: 'Our Services' },
      { id: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', defaultValue: 'We provide end-to-end technology solutions tailored to your specific business needs, focusing on automation, efficiency, and growth.' },
      { id: 'web_dev_title', label: 'Web Development Title', type: 'text', defaultValue: 'Website Development for Branding' },
      { id: 'web_dev_description', label: 'Web Development Description', type: 'textarea', defaultValue: 'We create custom, responsive websites that reflect your brand identity and engage your audience.' },
      { id: 'automation_title', label: 'Automation Title', type: 'text', defaultValue: 'Web Applications for Automation' },
      { id: 'automation_description', label: 'Automation Description', type: 'textarea', defaultValue: 'Transform manual processes into efficient automated workflows with our custom web applications.' },
      { id: 'data_title', label: 'Data Analysis Title', type: 'text', defaultValue: 'Data Analysis Services' },
      { id: 'data_description', label: 'Data Analysis Description', type: 'textarea', defaultValue: 'Unlock insights from your data to drive strategic decision-making.' },
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfolio Page',
    path: '/portfolio',
    sections: [
      { id: 'hero_title', label: 'Hero Title', type: 'text', defaultValue: 'Our Portfolio' },
      { id: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', defaultValue: 'Explore our successful projects and see how we\'ve helped businesses transform through technology and automation.' },
      { id: 'cta_title', label: 'CTA Section Title', type: 'text', defaultValue: "Let's Build Something Amazing Together" },
      { id: 'cta_description', label: 'CTA Description', type: 'textarea', defaultValue: 'Ready to join our growing list of satisfied clients? Contact us today to discuss your project.' },
    ],
  },
  {
    id: 'contact',
    name: 'Contact Page',
    path: '/contact',
    sections: [
      { id: 'hero_title', label: 'Hero Title', type: 'text', defaultValue: 'Contact Us' },
      { id: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', defaultValue: 'Have questions or ready to get started? Reach out to our team for expert assistance.' },
      { id: 'form_title', label: 'Form Title', type: 'text', defaultValue: 'Send a Message' },
      { id: 'email', label: 'Contact Email', type: 'text', defaultValue: 'naftali@nafarrosolutions.com' },
      { id: 'phone', label: 'Contact Phone', type: 'text', defaultValue: '+254 701 443 446' },
      { id: 'address', label: 'Address', type: 'text', defaultValue: 'Nairobi, Kenya' },
    ],
  },
  {
    id: 'blog',
    name: 'Blog Page',
    path: '/blog',
    sections: [
      { id: 'hero_title', label: 'Hero Title', type: 'text', defaultValue: 'Blog & Resources' },
      { id: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea', defaultValue: 'Insights, tutorials, and industry trends in automation, web development, and data analysis' },
      { id: 'newsletter_title', label: 'Newsletter Title', type: 'text', defaultValue: 'Subscribe to Our Newsletter' },
      { id: 'newsletter_description', label: 'Newsletter Description', type: 'textarea', defaultValue: 'Get the latest insights and updates delivered to your inbox.' },
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

  // Helper to get content with fallback to default
  const getContent = (sectionId: string, defaultValue: string = ''): string => {
    return content[sectionId] || defaultValue;
  };

  return { content, isLoading, getContent };
}
