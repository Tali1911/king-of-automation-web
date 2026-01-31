import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Users, 
  Eye, 
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';

interface DashboardStats {
  totalPages: number;
  blogPosts: number;
  consultations: number;
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { posts, isLoading: postsLoading } = useBlogPosts();
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 6, // Static pages count
    blogPosts: 0,
    consultations: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get blog post count
        const blogCount = posts.length;
        
        setStats({
          totalPages: 6,
          blogPosts: blogCount,
          consultations: 0, // Would need a consultations table
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!postsLoading) {
      fetchStats();
    }
  }, [posts, postsLoading]);

  const publishedPosts = posts.filter(p => p.status === 'published');
  const draftPosts = posts.filter(p => p.status === 'draft');
  const recentPosts = posts.slice(0, 5);

  const statsCards = [
    {
      title: 'Total Pages',
      value: stats.totalPages.toString(),
      description: 'Active pages on site',
      icon: FileText,
      trend: 'Static pages',
    },
    {
      title: 'Blog Posts',
      value: stats.blogPosts.toString(),
      description: `${publishedPosts.length} published, ${draftPosts.length} drafts`,
      icon: Calendar,
      trend: `${publishedPosts.length} live`,
    },
    {
      title: 'Page Views',
      value: '—',
      description: 'Analytics coming soon',
      icon: Eye,
      trend: 'Connect analytics',
    },
    {
      title: 'Consultations',
      value: '—',
      description: 'Track in Supabase',
      icon: Users,
      trend: 'View in database',
    },
  ];

  const quickActions = [
    { label: 'Edit Content', path: '/admin/content' },
    { label: 'Add Blog Post', path: '/admin/content', state: { tab: 'blog' } },
    { label: 'Upload Media', path: '/admin/content', state: { tab: 'media' } },
    { label: 'Manage Settings', path: '/admin/settings' },
  ];

  if (isLoading || postsLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your website.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary">{stat.trend}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Blog Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Blog Posts</CardTitle>
              <CardDescription>Latest posts from your blog</CardDescription>
            </CardHeader>
            <CardContent>
              {recentPosts.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4">No blog posts yet. Create your first post!</p>
              ) : (
                <ul className="space-y-4">
                  {recentPosts.map((post) => (
                    <li key={post.id} className="flex items-start gap-3">
                      <div className={`h-2 w-2 mt-2 rounded-full ${post.status === 'published' ? 'bg-primary' : 'bg-muted-foreground'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(post.created_at), 'MMM d, yyyy')} • {post.status}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left"
                    onClick={() => navigate(action.path, { state: action.state })}
                  >
                    <span className="text-sm font-medium">{action.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-foreground">Content Management</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Navigate to the Content section to edit pages, blog posts, and manage your media library.
                </p>
              </div>
              <Button onClick={() => navigate('/admin/content')}>
                Go to Content
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
