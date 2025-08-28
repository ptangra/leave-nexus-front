import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, 
  Users, 
  Briefcase, 
  UserCheck, 
  Calendar, 
  Activity, 
  ClipboardList, 
  Bell,
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

export default function SuperAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("accounts");

  // Mock data - Replace with actual API calls
  const mockAccounts = [
    {
      account_id: 1,
      company_name: "Tech Corp",
      users_count: 50,
      billing_address: "123 Tech St, San Francisco, CA",
      subscription_type: "PAID",
      price_by_user: 25.00,
      subscription_fee: 1250.00
    },
    {
      account_id: 2,
      company_name: "StartupXYZ",
      users_count: 15,
      billing_address: "456 Innovation Ave, Austin, TX",
      subscription_type: "FREE",
      price_by_user: 0.00,
      subscription_fee: 0.00
    }
  ];

  const mockUsers = [
    {
      user_id: 1,
      name: "John",
      last_name: "Doe",
      email: "john.doe@techcorp.com",
      role: "ADMIN",
      account_id: 1,
      department: "IT"
    },
    {
      user_id: 2,
      name: "Jane",
      last_name: "Smith",
      email: "jane.smith@techcorp.com",
      role: "ACCOUNT_ADMIN",
      account_id: 1,
      department: "HR"
    }
  ];

  const mockDepartments = [
    { id: 1, department_name: "Human Resources", account_id: 1 },
    { id: 2, department_name: "Information Technology", account_id: 1 },
    { id: 3, department_name: "Finance", account_id: 1 },
    { id: 4, department_name: "Marketing", account_id: 2 },
    { id: 5, department_name: "Sales", account_id: 2 }
  ];

  const mockPendingRequests = [
    {
      id: 1,
      type: "holiday",
      requested_by: 2,
      requested_from: 1,
      from_date: "2024-03-15",
      to_date: "2024-03-20",
      requested_on: "2024-03-01"
    }
  ];

  const mockNotifications = [
    {
      id: 1,
      username: "John Doe",
      message: "Your vacation request has been approved",
      message_type: "approval",
      notificationdatetime: "2024-03-01T10:30:00Z"
    }
  ];

  // TODO: Replace with actual API calls to your backend
  const handleAccountAction = (action: string, accountId?: number) => {
    console.log(`${action} account`, accountId);
    // Add your API call here: await fetch('/api/accounts', { method: action === 'create' ? 'POST' : 'PUT', ... });
  };

  const handleUserAction = (action: string, userId?: number) => {
    console.log(`${action} user`, userId);
    // Add your API call here: await fetch('/api/users', { method: action === 'create' ? 'POST' : 'PUT', ... });
  };

  const handleDepartmentAction = (action: string, deptId?: number) => {
    console.log(`${action} department`, deptId);
    // Add your API call here: await fetch('/api/departments', { method: action === 'create' ? 'POST' : 'PUT', ... });
  };

  const exportData = (dataType: string) => {
    console.log(`Exporting ${dataType} data`);
    // Add your export API call here: await fetch(`/api/export/${dataType}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Complete system management and oversight</p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAccounts.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockAccounts.filter(a => a.subscription_type === 'PAID').length} paid subscriptions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockUsers.filter(u => u.role === 'ADMIN').length} system admins
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPendingRequests.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockNotifications.length}</div>
            <p className="text-xs text-muted-foreground">System-wide</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Management Interface */}
      <Card>
        <CardHeader>
          <CardTitle>System Management</CardTitle>
          <CardDescription>
            Manage all aspects of the vacation management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="relationships">Master/Slave</TabsTrigger>
              <TabsTrigger value="leave">Leave Data</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Accounts Management */}
            <TabsContent value="accounts" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={() => exportData('accounts')} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Account</DialogTitle>
                        <DialogDescription>
                          Add a new company account to the system
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="company_name" className="text-right">Company Name</Label>
                          <Input id="company_name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="users_count" className="text-right">Users Count</Label>
                          <Input id="users_count" type="number" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="billing_address" className="text-right">Billing Address</Label>
                          <Textarea id="billing_address" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="subscription_type" className="text-right">Subscription</Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select subscription type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="FREE">Free</SelectItem>
                              <SelectItem value="PAID">Paid</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price_by_user" className="text-right">Price per User</Label>
                          <Input id="price_by_user" type="number" step="0.01" className="col-span-3" />
                        </div>
                      </div>
                      <Button onClick={() => handleAccountAction('create')}>Create Account</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Users Count</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead>Monthly Fee</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAccounts.map((account) => (
                    <TableRow key={account.account_id}>
                      <TableCell>{account.account_id}</TableCell>
                      <TableCell className="font-medium">{account.company_name}</TableCell>
                      <TableCell>{account.users_count}</TableCell>
                      <TableCell>
                        <Badge variant={account.subscription_type === 'PAID' ? 'default' : 'secondary'}>
                          {account.subscription_type}
                        </Badge>
                      </TableCell>
                      <TableCell>${account.subscription_fee.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAccountAction('edit', account.account_id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleAccountAction('delete', account.account_id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Users Management */}
            <TabsContent value="users" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="w-64"
                  />
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ACCOUNT_ADMIN">Account Admin</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={() => exportData('users')} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" onClick={() => handleUserAction('create')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Account ID</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.user_id}>
                      <TableCell>{user.user_id}</TableCell>
                      <TableCell className="font-medium">{user.name} {user.last_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'ADMIN' ? 'destructive' : user.role === 'ACCOUNT_ADMIN' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.account_id}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUserAction('edit', user.user_id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleUserAction('delete', user.user_id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Departments Management */}
            <TabsContent value="departments" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search departments..." className="w-64" />
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by Account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Accounts</SelectItem>
                      {mockAccounts.map((account) => (
                        <SelectItem key={account.account_id} value={account.account_id.toString()}>
                          {account.company_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={() => exportData('departments')} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Department
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Department</DialogTitle>
                        <DialogDescription>
                          Add a new department to an account
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="department_name" className="text-right">Department Name</Label>
                          <Input id="department_name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="account_select" className="text-right">Account</Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockAccounts.map((account) => (
                                <SelectItem key={account.account_id} value={account.account_id.toString()}>
                                  {account.company_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button onClick={() => handleDepartmentAction('create')}>Create Department</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Department Name</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDepartments.map((dept) => {
                    const account = mockAccounts.find(acc => acc.account_id === dept.account_id);
                    return (
                      <TableRow key={dept.id}>
                        <TableCell>{dept.id}</TableCell>
                        <TableCell className="font-medium">{dept.department_name}</TableCell>
                        <TableCell>{dept.account_id}</TableCell>
                        <TableCell>{account?.company_name || 'Unknown'}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDepartmentAction('edit', dept.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDepartmentAction('delete', dept.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TabsContent>

            {/* Master/Slave Relationships */}
            <TabsContent value="relationships" className="space-y-4">
              <div className="text-center py-8">
                <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Master/Slave Relationships</h3>
                <p className="text-muted-foreground mb-4">
                  Manage hierarchical relationships between users
                </p>
                <Button onClick={() => console.log('Load master/slave relationships')}>
                  Load Relationships
                </Button>
                {/* TODO: Add your API call here to fetch master/slave relationships:
                    await fetch('/api/master-slave-relationships') */}
              </div>
            </TabsContent>

            {/* Leave Data Management */}
            <TabsContent value="leave" className="space-y-4">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Leave Data Management</h3>
                <p className="text-muted-foreground mb-4">
                  View and manage holidays, sick leave, home office, and special permissions
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
                  <Button variant="outline" onClick={() => console.log('Load holidays data')}>
                    Holidays
                  </Button>
                  <Button variant="outline" onClick={() => console.log('Load sick leave data')}>
                    Sick Leave
                  </Button>
                  <Button variant="outline" onClick={() => console.log('Load home office data')}>
                    Home Office
                  </Button>
                  <Button variant="outline" onClick={() => console.log('Load special permissions data')}>
                    Special Perms
                  </Button>
                </div>
                {/* TODO: Add your API calls here to fetch leave data:
                    await fetch('/api/holidays')
                    await fetch('/api/sick-leave')
                    await fetch('/api/home-office')
                    await fetch('/api/special-permissions') */}
              </div>
            </TabsContent>

            {/* Requests Management */}
            <TabsContent value="requests" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Requests</CardTitle>
                    <CardDescription>Requests awaiting approval</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Requested By</TableHead>
                          <TableHead>Date Range</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockPendingRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>
                              <Badge variant="outline">{request.type}</Badge>
                            </TableCell>
                            <TableCell>User {request.requested_by}</TableCell>
                            <TableCell className="text-sm">
                              {request.from_date} to {request.to_date}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">Pending</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {/* TODO: Add your API call here: await fetch('/api/pending-requests') */}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Reviewed Requests</CardTitle>
                    <CardDescription>Recently processed requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <ClipboardList className="h-8 w-8 mx-auto mb-2" />
                      Load reviewed requests data
                    </div>
                    {/* TODO: Add your API call here: await fetch('/api/reviewed-requests') */}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Management */}
            <TabsContent value="notifications" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">System Notifications</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.username}</TableCell>
                      <TableCell className="max-w-xs truncate">{notification.message}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{notification.message_type}</Badge>
                      </TableCell>
                      <TableCell>{new Date(notification.notificationdatetime).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* TODO: Add your API call here: await fetch('/api/notifications') */}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4">
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold">System Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive system usage and performance metrics
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                  <Button variant="outline" onClick={() => console.log('Load usage analytics')}>
                    Usage Stats
                  </Button>
                  <Button variant="outline" onClick={() => console.log('Load financial analytics')}>
                    Financial Data
                  </Button>
                  <Button variant="outline" onClick={() => console.log('Load performance analytics')}>
                    Performance
                  </Button>
                </div>
                {/* TODO: Add your API calls here for analytics data */}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}