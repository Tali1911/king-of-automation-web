import { useState } from 'react';
import { Plus, Loader2, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useTeamMembers, TeamMember } from '@/hooks/useTeamMembers';
import { TeamMemberEditor } from './TeamMemberEditor';

export function TeamMembersTab() {
  const { members, isLoading, isSaving, createMember, updateMember, deleteMember } = useTeamMembers();
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = async () => {
    const m = await createMember({ name: 'New Team Member', role: 'Team Member', is_published: false });
    if (m) {
      setEditing(m);
      setIsCreating(true);
    }
  };

  const handleSave = async (updates: Partial<TeamMember>) => {
    if (!editing) return;
    const ok = await updateMember(editing.id, updates);
    if (ok) { setEditing(null); setIsCreating(false); }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (editing) {
    return (
      <TeamMemberEditor
        member={editing}
        onSave={handleSave}
        onCancel={() => {
          if (isCreating) deleteMember(editing.id);
          setEditing(null); setIsCreating(false);
        }}
        isSaving={isSaving}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Team Members</h2>
          <p className="text-sm text-muted-foreground">Shown on the public About page.</p>
        </div>
        <Button onClick={handleCreate} disabled={isSaving}>
          <Plus className="h-4 w-4 mr-2" /> Add Member
        </Button>
      </div>

      {members.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No team members yet</p>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" /> Add Your First Member
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {members.map(m => (
            <Card key={m.id}>
              <CardContent className="p-4 flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  {m.image_url ? (
                    <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{m.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{m.role}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                      {m.is_published ? (
                        <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> Live</span>
                      ) : (
                        <span className="flex items-center gap-1"><EyeOff className="h-3 w-3" /> Hidden</span>
                      )}
                    </span>
                  </div>
                  {m.bio && <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{m.bio}</p>}
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => setEditing(m)}>
                      <Pencil className="h-3 w-3 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="outline"
                      onClick={() => updateMember(m.id, { is_published: !m.is_published })}>
                      {m.is_published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteId(m.id)}>
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              onClick={async () => { if (deleteId) { await deleteMember(deleteId); setDeleteId(null); } }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
