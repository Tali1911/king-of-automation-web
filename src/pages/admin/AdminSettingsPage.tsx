import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { 
  Globe, 
  Bell, 
  Palette,
  Save,
  Settings,
  Loader2
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { settings, isLoading, isSaving, saveAllSettings } = useSiteSettings();
  
  const [formData, setFormData] = useState({
    siteName: settings.siteName,
    siteEmail: settings.siteEmail,
    siteDescription: settings.siteDescription,
    notifyConsultations: settings.notifyConsultations,
    notifyQuotes: settings.notifyQuotes,
    notifyContact: settings.notifyContact,
    maintenanceMode: settings.maintenanceMode,
    showGuide: settings.showGuide,
  });

  // Update form when settings load
  useState(() => {
    setFormData({
      siteName: settings.siteName,
      siteEmail: settings.siteEmail,
      siteDescription: settings.siteDescription,
      notifyConsultations: settings.notifyConsultations,
      notifyQuotes: settings.notifyQuotes,
      notifyContact: settings.notifyContact,
      maintenanceMode: settings.maintenanceMode,
      showGuide: settings.showGuide,
    });
  });

  const handleSaveSiteSettings = async () => {
    await saveAllSettings({
      siteName: formData.siteName,
      siteEmail: formData.siteEmail,
      siteDescription: formData.siteDescription,
    });
  };

  const handleToggle = async (key: keyof typeof formData, value: boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    await saveAllSettings({ [key]: value });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your website and admin portal preferences
          </p>
        </div>

        <div className="grid gap-6">
          {/* Site Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Site Settings
              </CardTitle>
              <CardDescription>
                Basic website configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={formData.siteName}
                    onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteEmail">Contact Email</Label>
                  <Input
                    id="siteEmail"
                    type="email"
                    value={formData.siteEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, siteEmail: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={formData.siteDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, siteDescription: e.target.value }))}
                  rows={3}
                />
              </div>
              <Button className="gap-2" onClick={handleSaveSiteSettings} disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure email notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Consultation Requests</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email when someone books a consultation
                  </p>
                </div>
                <Switch 
                  checked={formData.notifyConsultations}
                  onCheckedChange={(checked) => handleToggle('notifyConsultations', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Quote Requests</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email when someone requests a quote
                  </p>
                </div>
                <Switch 
                  checked={formData.notifyQuotes}
                  onCheckedChange={(checked) => handleToggle('notifyQuotes', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Contact Form Submissions</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email when someone submits the contact form
                  </p>
                </div>
                <Switch 
                  checked={formData.notifyContact}
                  onCheckedChange={(checked) => handleToggle('notifyContact', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Show a maintenance page to visitors
                  </p>
                </div>
                <Switch 
                  checked={formData.maintenanceMode}
                  onCheckedChange={(checked) => handleToggle('maintenanceMode', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Website Guide</p>
                  <p className="text-sm text-muted-foreground">
                    Display the interactive guide for new visitors
                  </p>
                </div>
                <Switch 
                  checked={formData.showGuide}
                  onCheckedChange={(checked) => handleToggle('showGuide', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Settings className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Clear Cache</p>
                  <p className="text-sm text-muted-foreground">
                    Clear all cached data and regenerate
                  </p>
                </div>
                <Button variant="outline">Clear Cache</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
