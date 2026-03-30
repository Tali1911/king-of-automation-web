import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { SortableProjectCard } from './SortableProjectCard';
import { PortfolioCategoriesManager } from './PortfolioCategoriesManager';

export function PortfolioProjectsTab() {
  const { projects, isLoading, isSaving, createProject, updateProject, deleteProject, reorderProjects } = usePortfolioProjects();
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);
      
      const reorderedProjects = arrayMove(projects, oldIndex, newIndex);
      await reorderProjects(reorderedProjects);
    }
  };

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
      {/* Category Manager */}
      <PortfolioCategoriesManager />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Portfolio Projects</h2>
          <p className="text-sm text-muted-foreground">
            Manage your portfolio showcase projects. Drag to reorder.
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projects.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid gap-4">
              {projects.map((project) => (
                <SortableProjectCard
                  key={project.id}
                  project={project}
                  onEdit={setEditingProject}
                  onDelete={setDeleteId}
                  onTogglePublish={handleTogglePublish}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
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
