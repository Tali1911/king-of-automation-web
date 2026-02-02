import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AdminLayout } from './AdminLayout';
import { usePageContent, pageConfigs, PageSection } from '@/hooks/usePageContent';
import { ImageUploadField } from './ImageUploadField';
import { Link } from 'react-router-dom';

export function PageEditor() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const pageConfig = pageConfigs.find(p => p.id === pageId);
  const { content, isLoading, isSaving, saveAllContent } = usePageContent(pageId);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize form data from fetched content or defaults
  useEffect(() => {
    if (!isLoading && pageConfig) {
      const initialData: Record<string, string> = {};
      pageConfig.sections.forEach(section => {
        initialData[section.id] = content[section.id] || section.defaultValue;
      });
      setFormData(initialData);
      setHasChanges(false);
    }
  }, [isLoading, content, pageConfig]);

  const handleChange = (sectionId: string, value: string) => {
    setFormData(prev => ({ ...prev, [sectionId]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    const success = await saveAllContent(formData);
    if (success) {
      setHasChanges(false);
    }
  };

  const renderField = (section: PageSection) => {
    const value = formData[section.id] || '';

    switch (section.type) {
      case 'image':
        return (
          <ImageUploadField
            id={section.id}
            label={section.label}
            value={value}
            onChange={(newValue) => handleChange(section.id, newValue)}
          />
        );
      case 'textarea':
      case 'richtext':
        return (
          <>
            <Label htmlFor={section.id} className="text-sm font-medium">
              {section.label}
            </Label>
            <Textarea
              id={section.id}
              value={value}
              onChange={(e) => handleChange(section.id, e.target.value)}
              placeholder={`Enter ${section.label.toLowerCase()}...`}
              className="min-h-[100px] resize-y"
            />
          </>
        );
      case 'text':
      default:
        return (
          <>
            <Label htmlFor={section.id} className="text-sm font-medium">
              {section.label}
            </Label>
            <Input
              id={section.id}
              value={value}
              onChange={(e) => handleChange(section.id, e.target.value)}
              placeholder={`Enter ${section.label.toLowerCase()}...`}
            />
          </>
        );
    }
  };

  if (!pageConfig) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-4">The page you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/admin/content')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Content
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin/content')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Edit {pageConfig.name}</h1>
              <p className="text-muted-foreground text-sm">
                Customize the content displayed on this page
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to={pageConfig.path} target="_blank">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Link>
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
              <CardDescription>
                Edit the text content for different sections of this page. Changes will be reflected on the live site after saving.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            {pageConfig.sections.map((section, index) => (
                <div key={section.id}>
                  {index > 0 && <Separator className="mb-6" />}
                  <div className="space-y-2">
                    {renderField(section)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {hasChanges && (
          <div className="fixed bottom-6 right-6 bg-card border border-border rounded-lg shadow-lg p-4 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">You have unsaved changes</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const initialData: Record<string, string> = {};
                pageConfig.sections.forEach(section => {
                  initialData[section.id] = content[section.id] || (typeof section.defaultValue === 'string' ? section.defaultValue : '');
                });
                setFormData(initialData);
                setHasChanges(false);
              }}
            >
              Discard
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
