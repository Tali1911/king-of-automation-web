import { useState } from 'react';
import { Loader2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ImageUploadField } from './ImageUploadField';
import type { TeamMember, TeamMemberInput } from '@/hooks/useTeamMembers';

interface Props {
  member: TeamMember;
  onSave: (m: Partial<TeamMemberInput>) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export function TeamMemberEditor({ member, onSave, onCancel, isSaving }: Props) {
  const [form, setForm] = useState<Partial<TeamMemberInput>>({
    name: member.name,
    role: member.role,
    bio: member.bio || '',
    image_url: member.image_url || '',
    linkedin_url: member.linkedin_url || '',
    twitter_url: member.twitter_url || '',
    github_url: member.github_url || '',
    email: member.email || '',
    is_published: member.is_published,
    display_order: member.display_order,
  });

  const update = <K extends keyof TeamMemberInput>(k: K, v: TeamMemberInput[K]) =>
    setForm(prev => ({ ...prev, [k]: v }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Edit Team Member</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel} disabled={isSaving}>
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
          <Button size="sm" onClick={() => onSave(form)} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
            Save
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tm-name">Full Name</Label>
            <Input id="tm-name" value={form.name || ''} onChange={e => update('name', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="tm-role">Role / Title</Label>
            <Input id="tm-role" value={form.role || ''} onChange={e => update('role', e.target.value)} />
          </div>
        </div>

        <div>
          <Label htmlFor="tm-bio">Short Bio</Label>
          <Textarea
            id="tm-bio"
            rows={4}
            value={form.bio || ''}
            onChange={e => update('bio', e.target.value)}
            placeholder="A few sentences about this team member..."
          />
        </div>

        <ImageUploadField
          id="tm-image"
          label="Profile Image"
          value={form.image_url || ''}
          onChange={v => update('image_url', v)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tm-email">Email</Label>
            <Input id="tm-email" type="email" value={form.email || ''} onChange={e => update('email', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="tm-linkedin">LinkedIn URL</Label>
            <Input id="tm-linkedin" value={form.linkedin_url || ''} onChange={e => update('linkedin_url', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="tm-twitter">Twitter / X URL</Label>
            <Input id="tm-twitter" value={form.twitter_url || ''} onChange={e => update('twitter_url', e.target.value)} />
          </div>
          <div>
            <Label htmlFor="tm-github">GitHub URL</Label>
            <Input id="tm-github" value={form.github_url || ''} onChange={e => update('github_url', e.target.value)} />
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <Label htmlFor="tm-pub">Published</Label>
            <p className="text-xs text-muted-foreground">Visible on the public About page</p>
          </div>
          <Switch
            id="tm-pub"
            checked={form.is_published ?? true}
            onCheckedChange={v => update('is_published', v)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
