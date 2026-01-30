import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  UserPlus, 
  Shield, 
  ShieldCheck,
  Mail,
  AlertTriangle
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const mockUsers = [
  { 
    id: '1', 
    email: 'admin@nafarrosolutions.com', 
    role: 'admin',
    createdAt: '2024-01-01'
  },
];

export default function AdminUsersPage() {
  const { isAdmin } = useAdminAuth();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'moderator'>('moderator');

  if (!isAdmin) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-xl font-semibold">Access Denied</h2>
          <p className="text-muted-foreground">
            Only administrators can manage users.
          </p>
        </div>
      </AdminLayout>
    );
  }

  const handleInvite = () => {
    // In a real implementation, this would call an edge function to invite users
    alert(`To invite ${inviteEmail} as ${inviteRole}:\n\n1. Create user in Supabase Auth dashboard\n2. Copy their user UUID\n3. Run SQL: INSERT INTO public.user_roles (user_id, role) VALUES ('UUID', '${inviteRole}');`);
    setInviteEmail('');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage admin and moderator access
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Invite User */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Invite User
              </CardTitle>
              <CardDescription>
                Add a new administrator or moderator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Role</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      checked={inviteRole === 'moderator'}
                      onChange={() => setInviteRole('moderator')}
                      className="text-primary"
                    />
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Moderator</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      checked={inviteRole === 'admin'}
                      onChange={() => setInviteRole('admin')}
                      className="text-primary"
                    />
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="text-sm">Administrator</span>
                  </label>
                </div>
              </div>

              <Button onClick={handleInvite} className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Get Invite Instructions
              </Button>

              <p className="text-xs text-muted-foreground">
                Note: Currently requires manual user creation in Supabase dashboard.
              </p>
            </CardContent>
          </Card>

          {/* Role Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                What each role can access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="font-medium">Administrator</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                  <li>• Full access to all content</li>
                  <li>• Can manage users and roles</li>
                  <li>• Can modify system settings</li>
                  <li>• Can delete any content</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Moderator</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                  <li>• Can edit page content</li>
                  <li>• Can manage blog posts</li>
                  <li>• Can upload media files</li>
                  <li>• Cannot manage users</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Current Users
            </CardTitle>
            <CardDescription>
              Users with admin portal access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Added</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4">
                        <span className="font-medium">{user.email}</span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {user.role === 'admin' ? (
                            <ShieldCheck className="h-3 w-3" />
                          ) : (
                            <Shield className="h-3 w-3" />
                          )}
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{user.createdAt}</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" disabled>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
