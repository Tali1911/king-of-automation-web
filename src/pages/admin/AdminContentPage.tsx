import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PagesTab } from '@/components/admin/PagesTab';
import { BlogPostsTab } from '@/components/admin/BlogPostsTab';
import { MediaLibraryTab } from '@/components/admin/MediaLibraryTab';
import { PortfolioProjectsTab } from '@/components/admin/PortfolioProjectsTab';
import { InvoicesTab } from '@/components/admin/InvoicesTab';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState('pages');

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
            <p className="text-muted-foreground mt-1">
              Edit and manage your website content
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="media">Media Library</TabsTrigger>
          </TabsList>

          <TabsContent value="pages">
            <PagesTab />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioProjectsTab />
          </TabsContent>

          <TabsContent value="blog">
            <BlogPostsTab />
          </TabsContent>

          <TabsContent value="media">
            <MediaLibraryTab />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
