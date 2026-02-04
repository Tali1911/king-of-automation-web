import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit, Trash2, Eye, EyeOff, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PortfolioProject } from '@/hooks/usePortfolioProjects';

interface SortableProjectCardProps {
  project: PortfolioProject;
  onEdit: (project: PortfolioProject) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (project: PortfolioProject) => void;
}

export function SortableProjectCard({
  project,
  onEdit,
  onDelete,
  onTogglePublish,
}: SortableProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${!project.is_published ? 'opacity-60' : ''} ${isDragging ? 'z-50 shadow-lg' : ''}`}
    >
      <CardContent className="flex items-center gap-4 p-4">
        {/* Drag Handle */}
        <button
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded touch-none"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>

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
            onClick={() => onTogglePublish(project)}
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
            onClick={() => onEdit(project)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(project.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
