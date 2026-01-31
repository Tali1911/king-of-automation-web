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
  AlertTriangle,
  Loader2,
  Trash2
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminUsers } from '@/hooks/useAdminUsers';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';

export default function AdminUsersPage() {
  const { isAdmin, user: currentUser } = useAdminAuth();
  const { users, isLoading, addUserRole, removeUserRole, updateUserRole } = useAdminUsers();
  
  const [newUserId, setNewUserId] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'moderator'>('moderator');
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleAddUser = async () => {
    if (!newUserId.trim()) return;
    
    setIsAdding(true);
    const success = await addUserRole(newUserId.trim(), newUserRole);
    if (success) {
      setNewUserId('');
    }
    setIsAdding(false);
  };

  const handleRemoveUser = async () => {
    if (!deleteConfirm) return;
    
    setIsDeleting(true);
    await removeUserRole(deleteConfirm);
    setIsDeleting(false);
    setDeleteConfirm(null);
  };

  const handleRoleChange = async (id: string, newRole: 'admin' | 'moderator') => {
    await updateUserRole(id, newRole);
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
          {/* Add User */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Add User Role
              </CardTitle>
              <CardDescription>
                Grant admin portal access to a user
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">User ID (UUID)</Label>
                <Input
                  id="userId"
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Get the UUID from Supabase Auth → Users after creating the user account
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Role</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      checked={newUserRole === 'moderator'}
                      onChange={() => setNewUserRole('moderator')}
                      className="text-primary"
                    />
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Moderator</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      checked={newUserRole === 'admin'}
                      onChange={() => setNewUserRole('admin')}
                      className="text-primary"
                    />
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="text-sm">Administrator</span>
                  </label>
                </div>
              </div>

              <Button onClick={handleAddUser} className="w-full gap-2" disabled={isAdding || !newUserId.trim()}>
                {isAdding && <Loader2 className="h-4 w-4 animate-spin" />}
                Add User Role
              </Button>
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
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No users found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Added</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      const isCurrentUser = user.user_id === currentUser?.id;
                      
                      return (
                        <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="p-4">
                            <span className="font-medium text-sm">
                              {user.email}
                              {isCurrentUser && <span className="text-muted-foreground ml-2">(you)</span>}
                            </span>
                          </td>
                          <td className="p-4">
                            <Select 
                              value={user.role} 
                              onValueChange={(value: 'admin' | 'moderator') => handleRoleChange(user.id, value)}
                              disabled={isCurrentUser}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">
                                  <span className="flex items-center gap-2">
                                    <ShieldCheck className="h-3 w-3" />
                                    Admin
                                  </span>
                                </SelectItem>
                                <SelectItem value="moderator">
                                  <span className="flex items-center gap-2">
                                    <Shield className="h-3 w-3" />
                                    Moderator
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-4 text-muted-foreground text-sm">
                            {format(new Date(user.created_at), 'MMM d, yyyy')}
                          </td>
                          <td className="p-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => setDeleteConfirm(user.id)}
                              disabled={isCurrentUser}
                              className="text-destructive hover:text-destructive"
                              title={isCurrentUser ? "Can't remove yourself" : "Remove access"}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove User Access</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this user's admin portal access? They will no longer be able to log in to the admin area.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveUser} disabled={isDeleting}>
              {isDeleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Remove Access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
