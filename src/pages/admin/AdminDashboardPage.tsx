import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Users, 
  Eye, 
  TrendingUp,
  Calendar,
  ArrowUpRight
} from 'lucide-react';

const statsCards = [
  {
    title: 'Total Pages',
    value: '12',
    description: 'Active pages on site',
    icon: FileText,
    trend: '+2 this month',
    trendUp: true,
  },
  {
    title: 'Blog Posts',
    value: '8',
    description: 'Published articles',
    icon: Calendar,
    trend: '+3 this month',
    trendUp: true,
  },
  {
    title: 'Page Views',
    value: '2,847',
    description: 'Last 30 days',
    icon: Eye,
    trend: '+12% vs last month',
    trendUp: true,
  },
  {
    title: 'Consultations',
    value: '24',
    description: 'Requests received',
    icon: Users,
    trend: '+5 this week',
    trendUp: true,
  },
];

const recentActivity = [
  { action: 'Updated homepage hero section', time: '2 hours ago', user: 'Admin' },
  { action: 'Published new blog post', time: '1 day ago', user: 'Admin' },
  { action: 'Updated services page pricing', time: '3 days ago', user: 'Admin' },
  { action: 'Added new portfolio item', time: '5 days ago', user: 'Admin' },
  { action: 'Updated about page content', time: '1 week ago', user: 'Admin' },
];

const quickActions = [
  { label: 'Edit Homepage', path: '/admin/content?page=home' },
  { label: 'Add Blog Post', path: '/admin/content?page=blog&action=new' },
  { label: 'Update Services', path: '/admin/content?page=services' },
  { label: 'View Analytics', path: '/admin/settings' },
];

export default function AdminDashboardPage() {
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
                    {stat.trendUp && (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    )}
                    <span className="text-xs text-green-500">{stat.trend}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates to your website</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time} • {activity.user}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
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
                    onClick={() => {/* Navigate to action.path */}}
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
                  Navigate to the Content section to edit pages, blog posts, and other website content.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
