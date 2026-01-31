import { 
  Home, 
  FileText,
  Briefcase, 
  FolderOpen, 
  Mail, 
  BookOpen,
  Edit,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const pagesList = [
  { 
    id: 'home', 
    name: 'Home Page', 
    icon: Home, 
    description: 'Main landing page with hero section and services overview',
    path: '/',
    lastUpdated: '2 days ago'
  },
  { 
    id: 'about', 
    name: 'About Page', 
    icon: FileText, 
    description: 'Company information, team, and mission statement',
    path: '/about',
    lastUpdated: '1 week ago'
  },
  { 
    id: 'services', 
    name: 'Services Page', 
    icon: Briefcase, 
    description: 'Service offerings and pricing information',
    path: '/services',
    lastUpdated: '3 days ago'
  },
  { 
    id: 'portfolio', 
    name: 'Portfolio Page', 
    icon: FolderOpen, 
    description: 'Project showcase and case studies',
    path: '/portfolio',
    lastUpdated: '5 days ago'
  },
  { 
    id: 'contact', 
    name: 'Contact Page', 
    icon: Mail, 
    description: 'Contact form and business information',
    path: '/contact',
    lastUpdated: '2 weeks ago'
  },
  { 
    id: 'blog', 
    name: 'Blog Page', 
    icon: BookOpen, 
    description: 'Blog articles and company news',
    path: '/blog',
    lastUpdated: '1 day ago'
  },
];

export function PagesTab() {
  return (
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
                <Button variant="ghost" size="icon" disabled title="Page editing coming soon">
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
                <Button variant="outline" size="sm" className="gap-1" asChild>
                  <Link to={page.path} target="_blank">
                    <Eye className="h-3 w-3" />
                    Preview
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
