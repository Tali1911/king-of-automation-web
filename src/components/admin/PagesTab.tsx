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
import { pageConfigs } from '@/hooks/usePageContent';

const pageIcons: Record<string, React.ElementType> = {
  home: Home,
  about: FileText,
  services: Briefcase,
  portfolio: FolderOpen,
  contact: Mail,
  blog: BookOpen,
};

const pageDescriptions: Record<string, string> = {
  home: 'Main landing page with hero section and services overview',
  about: 'Company information, team, and mission statement',
  services: 'Service offerings and pricing information',
  portfolio: 'Project showcase and case studies',
  contact: 'Contact form and business information',
  blog: 'Blog articles and company news',
};

export function PagesTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pageConfigs.map((page) => {
        const Icon = pageIcons[page.id] || FileText;
        return (
          <Card key={page.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/admin/content/pages/${page.id}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <CardTitle className="text-lg mt-3">{page.name}</CardTitle>
              <CardDescription>{pageDescriptions[page.id] || 'Page content'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {page.sections.length} editable sections
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
