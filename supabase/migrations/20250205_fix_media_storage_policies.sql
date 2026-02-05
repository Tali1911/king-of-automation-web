 -- Ensure the media bucket exists and is public
 INSERT INTO storage.buckets (id, name, public)
 VALUES ('media', 'media', true)
 ON CONFLICT (id) DO UPDATE SET public = true;
 
 -- Drop existing policies if they exist to recreate them properly
 DROP POLICY IF EXISTS "Allow public read access on media" ON storage.objects;
 DROP POLICY IF EXISTS "Allow authenticated uploads to media" ON storage.objects;
 DROP POLICY IF EXISTS "Allow authenticated deletes from media" ON storage.objects;
 DROP POLICY IF EXISTS "Allow authenticated list on media" ON storage.objects;
 
 -- Allow anyone to read/view files from the media bucket
 CREATE POLICY "Allow public read access on media"
 ON storage.objects FOR SELECT
 USING (bucket_id = 'media');
 
 -- Allow authenticated users to upload files to media bucket
 CREATE POLICY "Allow authenticated uploads to media"
 ON storage.objects FOR INSERT
 TO authenticated
 WITH CHECK (bucket_id = 'media');
 
 -- Allow authenticated users to delete files from media bucket
 CREATE POLICY "Allow authenticated deletes from media"
 ON storage.objects FOR DELETE
 TO authenticated
 USING (bucket_id = 'media');
 
 -- Allow authenticated users to update files in media bucket
 CREATE POLICY "Allow authenticated updates on media"
 ON storage.objects FOR UPDATE
 TO authenticated
 USING (bucket_id = 'media')
 WITH CHECK (bucket_id = 'media');