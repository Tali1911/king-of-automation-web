import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  created_at: string;
}

export function useMediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const fetchFiles = useCallback(async () => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.storage
        .from('media')
        .list('', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' },
        });

      if (error) {
        throw error;
      }

      const filesWithUrls: MediaFile[] = (data || [])
        .filter(file => file.name !== '.emptyFolderPlaceholder')
        .map(file => {
          const { data: urlData } = supabase.storage
            .from('media')
            .getPublicUrl(file.name);

          return {
            id: file.id,
            name: file.name,
            url: urlData.publicUrl,
            size: file.metadata?.size || 0,
            type: file.metadata?.mimetype || 'unknown',
            created_at: file.created_at,
          };
        });

      setFiles(filesWithUrls);
    } catch (err) {
      console.error('Failed to fetch media files:', err);
      toast({
        title: 'Error',
        description: 'Failed to load media library',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const uploadFile = async (file: File): Promise<MediaFile | null> => {
    setIsUploading(true);

    try {
      // Create unique filename
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${timestamp}-${safeName}`;

      const { data, error } = await supabase.storage
        .from('media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(data.path);

      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });

      await fetchFiles();

      return {
        id: data.id,
        name: fileName,
        url: urlData.publicUrl,
        size: file.size,
        type: file.type,
        created_at: new Date().toISOString(),
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload file';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFile = async (fileName: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from('media')
        .remove([fileName]);

      if (error) {
        throw error;
      }

      toast({
        title: 'Success',
        description: 'File deleted successfully',
      });

      await fetchFiles();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete file';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      return false;
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Copied',
      description: 'URL copied to clipboard',
    });
  };

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    files,
    isLoading,
    isUploading,
    fetchFiles,
    uploadFile,
    deleteFile,
    copyUrl,
  };
}
