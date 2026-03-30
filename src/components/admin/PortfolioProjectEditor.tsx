import { useState } from 'react';
import { ArrowLeft, Save, Loader2, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ImageUploadField } from './ImageUploadField';
import { RichTextEditor } from './RichTextEditor';
import { PortfolioProject } from '@/hooks/usePortfolioProjects';
import { usePortfolioCategories } from '@/hooks/usePortfolioCategories';

interface PortfolioProjectEditorProps {
  project: PortfolioProject;
  onSave: (project: Partial<PortfolioProject>) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

export function PortfolioProjectEditor({
  project,
  onSave,
  onCancel,
  isSaving,
}: PortfolioProjectEditorProps) {
  const [formData, setFormData] = useState({
    title: project.title,
    category: project.category,
    description: project.description || '',
    image_url: project.image_url || '',
    technologies: project.technologies || [],
    results: project.results || '',
    live_url: project.live_url || '',
    github_url: project.github_url || '',
    display_order: project.display_order,
    is_published: project.is_published,
  });
  const [newTech, setNewTech] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const { categories } = usePortfolioCategories();

  const handleChange = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleAddTech = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      handleChange('technologies', [...formData.technologies, newTech.trim()]);
      setNewTech('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    handleChange(
      'technologies',
      formData.technologies.filter((t) => t !== tech)
    );
  };

  const handleSave = async () => {
    await onSave(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {project.title === 'New Project' ? 'Create Project' : `Edit: ${project.title}`}
            </h1>
            <p className="text-muted-foreground text-sm">
              Configure project details and visibility
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Project
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Core project details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter project title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.slug}>
                        {cat.name}
                      </SelectItem>
                    ))}
                    {categories.length === 0 && (
                      <SelectItem value="uncategorized" disabled>
                        No categories — add some in Portfolio tab
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <RichTextEditor
                  value={formData.description}
                  onChange={(value) => handleChange('description', value)}
                  placeholder="Brief description of the project"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="results">Results / Impact</Label>
                <RichTextEditor
                  value={formData.results}
                  onChange={(value) => handleChange('results', value)}
                  placeholder="Describe the impact or results achieved"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Image</CardTitle>
              <CardDescription>Screenshot or preview image</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploadField
                id="image"
                label="Project Image"
                value={formData.image_url}
                onChange={(value) => handleChange('image_url', value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technologies</CardTitle>
              <CardDescription>Tech stack used in this project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add technology (e.g., React, TypeScript)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTech();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTech} variant="secondary">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="gap-1 pr-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {formData.technologies.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No technologies added yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published">Published</Label>
                <Switch
                  id="published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => handleChange('is_published', checked)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Published projects will appear on the public portfolio page.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
              <CardDescription>External project links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="live_url">Live URL</Label>
                <Input
                  id="live_url"
                  type="url"
                  value={formData.live_url}
                  onChange={(e) => handleChange('live_url', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input
                  id="github_url"
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => handleChange('github_url', e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="order">Order</Label>
                <Input
                  id="order"
                  type="number"
                  min={0}
                  value={formData.display_order}
                  onChange={(e) => handleChange('display_order', parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                  Lower numbers appear first
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
