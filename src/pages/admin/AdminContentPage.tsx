import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Home, 
  Briefcase, 
  FolderOpen, 
  Mail, 
  BookOpen,
  Edit,
  Plus,
  Eye
} from 'lucide-react';

const pagesList = [
  { 
    id: 'home', 
    name: 'Home Page', 
    icon: Home, 
    description: 'Main landing page with hero section and services overview',
    lastUpdated: '2 days ago'
  },
  { 
    id: 'about', 
    name: 'About Page', 
    icon: FileText, 
    description: 'Company information, team, and mission statement',
    lastUpdated: '1 week ago'
  },
  { 
    id: 'services', 
    name: 'Services Page', 
    icon: Briefcase, 
    description: 'Service offerings and pricing information',
    lastUpdated: '3 days ago'
  },
  { 
    id: 'portfolio', 
    name: 'Portfolio Page', 
    icon: FolderOpen, 
    description: 'Project showcase and case studies',
    lastUpdated: '5 days ago'
  },
  { 
    id: 'contact', 
    name: 'Contact Page', 
    icon: Mail, 
    description: 'Contact form and business information',
    lastUpdated: '2 weeks ago'
  },
  { 
    id: 'blog', 
    name: 'Blog Page', 
    icon: BookOpen, 
    description: 'Blog articles and company news',
    lastUpdated: '1 day ago'
  },
];

const blogPosts = [
  { 
    id: 1, 
    title: 'Getting Started with Web Automation', 
    status: 'published',
    date: '2024-01-15',
    views: 342
  },
  { 
    id: 2, 
    title: 'The Future of Data Analytics', 
    status: 'published',
    date: '2024-01-10',
    views: 256
  },
  { 
    id: 3, 
    title: 'Building Scalable Web Applications', 
    status: 'draft',
    date: '2024-01-08',
    views: 0
  },
];

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
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="media">Media Library</TabsTrigger>
          </TabsList>

          {/* Pages Tab */}
          <TabsContent value="pages" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pagesList.map((page) => {
                const Icon = page.icon;
                return (
                  <Card key={page.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-lg mt-3">{page.name}</CardTitle>
                      <CardDescription>{page.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Updated {page.lastUpdated}
                        </span>
                        <Button variant="outline" size="sm" className="gap-1">
                          <Eye className="h-3 w-3" />
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-4">
            <div className="flex justify-end">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium text-muted-foreground">Title</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                        <th className="text-left p-4 font-medium text-muted-foreground">Views</th>
                        <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogPosts.map((post) => (
                        <tr key={post.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="p-4">
                            <span className="font-medium">{post.title}</span>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              post.status === 'published' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {post.status}
                            </span>
                          </td>
                          <td className="p-4 text-muted-foreground">{post.date}</td>
                          <td className="p-4 text-muted-foreground">{post.views}</td>
                          <td className="p-4 text-right">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Media Library</CardTitle>
                <CardDescription>
                  Upload and manage images, documents, and other media files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <Plus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Drag and drop files here, or click to upload
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
