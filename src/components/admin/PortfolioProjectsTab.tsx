import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink, Github, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { usePortfolioProjects, PortfolioProject } from '@/hooks/usePortfolioProjects';
import { PortfolioProjectEditor } from './PortfolioProjectEditor';

export function PortfolioProjectsTab() {
  const { projects, isLoading, isSaving, createProject, updateProject, deleteProject } = usePortfolioProjects();
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = async () => {
    const newProject = await createProject({
      title: 'New Project',
      category: 'automation',
      description: '',
      technologies: [],
      is_published: false,
    });
    if (newProject) {
      setEditingProject(newProject);
      setIsCreating(true);
    }
  };

  const handleSave = async (project: Partial<PortfolioProject>) => {
    if (editingProject) {
      const success = await updateProject(editingProject.id, project);
      if (success) {
        setEditingProject(null);
        setIsCreating(false);
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteProject(deleteId);
      setDeleteId(null);
    }
  };

  const handleTogglePublish = async (project: PortfolioProject) => {
    await updateProject(project.id, { is_published: !project.is_published });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (editingProject) {
    return (
      <PortfolioProjectEditor
        project={editingProject}
        onSave={handleSave}
        onCancel={() => {
          if (isCreating && editingProject) {
            deleteProject(editingProject.id);
          }
          setEditingProject(null);
          setIsCreating(false);
        }}
        isSaving={isSaving}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Portfolio Projects</h2>
          <p className="text-sm text-muted-foreground">
            Manage your portfolio showcase projects
          </p>
        </div>
        <Button onClick={handleCreate} disabled={isSaving}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No portfolio projects yet</p>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id} className={!project.is_published ? 'opacity-60' : ''}>
              <CardContent className="flex items-center gap-4 p-4">
                {/* Project Image */}
                <div className="w-24 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      No image
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{project.title}</h3>
                    <Badge variant={project.category === 'website' ? 'default' : 'secondary'}>
                      {project.category}
                    </Badge>
                    {!project.is_published && (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {project.description || 'No description'}
                  </p>
                  <div className="flex gap-2 mt-1">
                    {project.technologies?.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs bg-muted px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies && project.technologies.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-1">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-muted rounded-md"
                    >
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-muted rounded-md"
                    >
                      <Github className="h-4 w-4 text-muted-foreground" />
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleTogglePublish(project)}
                    title={project.is_published ? 'Unpublish' : 'Publish'}
                  >
                    {project.is_published ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingProject(project)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(project.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
