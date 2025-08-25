import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Building2, Shield, Save, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { currentUser } from "@/lib/data";

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: currentUser.name,
    last_name: currentUser.last_name,
    email: currentUser.email,
    department: currentUser.department,
    // password field is intentionally omitted for security
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // await api.updateUserProfile(currentUser.user_id, formData);
      console.log('Profile update:', formData);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'destructive';
      case 'ACCOUNT_ADMIN':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'System Admin';
      case 'ACCOUNT_ADMIN':
        return 'Account Admin';
      default:
        return 'User';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your personal information</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                {currentUser.avatar}
              </div>
            </div>
            <CardTitle className="text-xl">
              {currentUser.name} {currentUser.last_name}
            </CardTitle>
            <div className="flex justify-center mt-2">
              <Badge variant={getRoleBadgeVariant(currentUser.role)}>
                {getRoleLabel(currentUser.role)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{currentUser.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{currentUser.department}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">ID: {currentUser.user_id}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Account: {currentUser.account_id}</span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">First Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  required
                />
              </div>

              {/* Read-only fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    type="text"
                    value={getRoleLabel(currentUser.role)}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user_id">User ID</Label>
                  <Input
                    id="user_id"
                    type="text"
                    value={currentUser.user_id}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isLoading}>
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium">Password</h4>
                <p className="text-sm text-muted-foreground">
                  Last updated 30 days ago
                </p>
              </div>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}