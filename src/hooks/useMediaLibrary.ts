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
      // Fetch files from root and page-content subfolder
      const [rootResult, subfolderResult] = await Promise.all([
        supabase.storage.from('media').list('', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' },
        }),
        supabase.storage.from('media').list('page-content', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' },
        }),
      ]);

      if (rootResult.error) {
        console.error('Root list error:', rootResult.error);
      }
      if (subfolderResult.error) {
        console.error('Subfolder list error:', subfolderResult.error);
      }

      const allFiles: MediaFile[] = [];

      // Process root files
      (rootResult.data || [])
        .filter(file => file.name !== '.emptyFolderPlaceholder' && !file.id?.includes('folder'))
        .forEach(file => {
          // Skip if it's a folder (folders have null metadata)
          if (file.metadata === null && file.id === null) return;
          
          const { data: urlData } = supabase.storage
            .from('media')
            .getPublicUrl(file.name);

          allFiles.push({
            id: file.id || file.name,
            name: file.name,
            url: urlData.publicUrl,
            size: file.metadata?.size || 0,
            type: file.metadata?.mimetype || 'unknown',
            created_at: file.created_at,
          });
        });

      // Process page-content subfolder files
      (subfolderResult.data || [])
        .filter(file => file.name !== '.emptyFolderPlaceholder')
        .forEach(file => {
          if (file.metadata === null && file.id === null) return;
          
          const fullPath = `page-content/${file.name}`;
          const { data: urlData } = supabase.storage
            .from('media')
            .getPublicUrl(fullPath);

          allFiles.push({
            id: file.id || file.name,
            name: fullPath,
            url: urlData.publicUrl,
            size: file.metadata?.size || 0,
            type: file.metadata?.mimetype || 'unknown',
            created_at: file.created_at,
          });
        });

      // Sort by created_at descending
      allFiles.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setFiles(allFiles);
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
