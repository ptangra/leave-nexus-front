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
  
  // Edit dialog states
  const [editAccountDialog, setEditAccountDialog] = useState(false);
  const [editUserDialog, setEditUserDialog] = useState(false);
  const [editDepartmentDialog, setEditDepartmentDialog] = useState(false);
  const [editLeaveTypeDialog, setEditLeaveTypeDialog] = useState(false);
  const [editLeaveDaysDialog, setEditLeaveDaysDialog] = useState(false);
  
  // Selected items for editing
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [selectedLeaveType, setSelectedLeaveType] = useState<any>(null);
  const [selectedLeaveDays, setSelectedLeaveDays] = useState<any>(null);

  // Mock data - Replace with actual API calls
  const mockAccounts = [
    {
      id: 1,
      companyName: "Tech Corp",
      usersCount: 50,
      billingAddress: "123 Tech St, San Francisco, CA",
      subscriptionType: "PAID",
      users: [
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@techcorp.com",
          userRole: "ADMIN",
          accountId: 1,
          department: "IT"
        },
        {
          id: "2",
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@techcorp.com",
          userRole: "ACCOUNT_ADMIN",
          accountId: 1,
          department: "HR"
        }
      ],
      departments: [
        { id: 1, departmentName: "Human Resources" },
        { id: 2, departmentName: "Information Technology" },
        { id: 3, departmentName: "Finance" }
      ]
    },
    {
      id: 2,
      companyName: "StartupXYZ",
      usersCount: 15,
      billingAddress: "456 Innovation Ave, Austin, TX",
      subscriptionType: "FREE",
      users: [
        {
          id: "3",
          firstName: "Bob",
          lastName: "Johnson",
          email: "bob.johnson@startupxyz.com",
          userRole: "USER",
          accountId: 2,
          department: "Marketing"
        }
      ],
      departments: [
        { id: 4, departmentName: "Marketing" },
        { id: 5, departmentName: "Sales" }
      ]
    }
  ];

  // Flatten users and departments for easier access
  const allUsers = mockAccounts.flatMap(account => account.users);
  const allDepartments = mockAccounts.flatMap(account => 
    account.departments.map(dept => ({ ...dept, accountId: account.id, companyName: account.companyName }))
  );

  // Mock data for new leave structure
  const mockLeaveTypes = [
    { id: 1, name: "Annual Leave" },
    { id: 2, name: "Sick Leave" },
    { id: 3, name: "Personal Leave" },
    { id: 4, name: "Maternity/Paternity Leave" },
    { id: 5, name: "Emergency Leave" }
  ];

  const mockLeaveDays = [
    {
      id: 1,
      userId: "1",
      leaveTypeId: 1,
      available: 25,
      planned: 5,
      taken: 8,
      upcoming: 3,
      nextYearPlanned: 2
    },
    {
      id: 2,
      userId: "1",
      leaveTypeId: 2,
      available: 10,
      planned: 0,
      taken: 2,
      upcoming: 0,
      nextYearPlanned: 0
    },
    {
      id: 3,
      userId: "2",
      leaveTypeId: 1,
      available: 20,
      planned: 7,
      taken: 5,
      upcoming: 2,
      nextYearPlanned: 1
    }
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
    if (action === 'edit' && accountId) {
      const account = mockAccounts.find(a => a.id === accountId);
      if (account) {
        setSelectedAccount(account);
        setEditAccountDialog(true);
      }
    } else {
      console.log(`${action} account`, accountId);
      // Add your API call here: await fetch('/api/accounts', { method: action === 'create' ? 'POST' : 'PUT', ... });
    }
  };

  const handleUserAction = (action: string, userId?: number) => {
    if (action === 'edit' && userId) {
      const user = allUsers.find(u => parseInt(u.id) === userId);
      if (user) {
        setSelectedUser(user);
        setEditUserDialog(true);
      }
    } else {
      console.log(`${action} user`, userId);
      // Add your API call here: await fetch('/api/users', { method: action === 'create' ? 'POST' : 'PUT', ... });
    }
  };

  const handleDepartmentAction = (action: string, deptId?: number) => {
    if (action === 'edit' && deptId) {
      const department = allDepartments.find(d => d.id === deptId);
      if (department) {
        setSelectedDepartment(department);
        setEditDepartmentDialog(true);
      }
    } else {
      console.log(`${action} department`, deptId);
      // Add your API call here: await fetch('/api/departments', { method: action === 'create' ? 'POST' : 'PUT', ... });
    }
  };

  const handleLeaveTypeAction = (action: string, leaveTypeId?: number) => {
    if (action === 'edit' && leaveTypeId) {
      const leaveType = mockLeaveTypes.find(lt => lt.id === leaveTypeId);
      if (leaveType) {
        setSelectedLeaveType(leaveType);
        setEditLeaveTypeDialog(true);
      }
    } else {
      console.log(`${action} leave type`, leaveTypeId);
      // Add your API call here: await fetch('/api/leave-types', { method: action === 'create' ? 'POST' : 'PUT', ... });
    }
  };

  const handleLeaveDaysAction = (action: string, leaveDaysId?: number) => {
    if (action === 'edit' && leaveDaysId) {
      const leaveDays = mockLeaveDays.find(ld => ld.id === leaveDaysId);
      if (leaveDays) {
        setSelectedLeaveDays(leaveDays);
        setEditLeaveDaysDialog(true);
      }
    } else {
      console.log(`${action} leave days`, leaveDaysId);
      // Add your API call here: await fetch('/api/leave-days', { method: action === 'create' ? 'POST' : 'PUT', ... });
    }
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
              {mockAccounts.filter(a => a.subscriptionType === 'PAID').length} paid subscriptions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              {allUsers.filter(u => u.userRole === 'ADMIN').length} system admins
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
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-1">
              <TabsTrigger value="accounts" className="text-xs sm:text-sm">Accounts</TabsTrigger>
              <TabsTrigger value="users" className="text-xs sm:text-sm">Users</TabsTrigger>
              <TabsTrigger value="departments" className="text-xs sm:text-sm">Departments</TabsTrigger>
              <TabsTrigger value="relationships" className="text-xs sm:text-sm">Master/Slave</TabsTrigger>
              <TabsTrigger value="leave-types" className="text-xs sm:text-sm">Leave Types</TabsTrigger>
              <TabsTrigger value="leave-days" className="text-xs sm:text-sm">Leave Days</TabsTrigger>
              <TabsTrigger value="requests" className="text-xs sm:text-sm">Requests</TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm">Notifications</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">Analytics</TabsTrigger>
            </TabsList>

            {/* Accounts Management */}
            <TabsContent value="accounts" className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 mb-4">
                <div className="flex items-center space-x-2 flex-1 sm:flex-initial">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search accounts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64"
                  />
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button onClick={() => exportData('accounts')} variant="outline" size="sm" className="flex-1 sm:flex-initial">
                    <Download className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex-1 sm:flex-initial">
                        <Plus className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Add Account</span>
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
                      </div>
                      <Button onClick={() => handleAccountAction('create')}>Create Account</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16 sm:w-20">ID</TableHead>
                      <TableHead className="min-w-[120px] sm:min-w-[150px]">Company Name</TableHead>
                      <TableHead className="hidden sm:table-cell w-24">Users Count</TableHead>
                      <TableHead className="w-24 sm:w-32">Subscription</TableHead>
                      <TableHead className="hidden md:table-cell min-w-[200px]">Billing Address</TableHead>
                      <TableHead className="w-20 sm:w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {mockAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-mono text-xs">{account.id}</TableCell>
                      <TableCell className="font-medium">
                        <div className="min-w-0">
                          <div className="truncate">{account.companyName}</div>
                          <div className="sm:hidden text-xs text-muted-foreground mt-1">
                            {account.usersCount} users
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{account.usersCount}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={account.subscriptionType === 'PAID' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {account.subscriptionType}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate text-sm">
                        {account.billingAddress}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAccountAction('edit', account.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:p-2"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline ml-1 sm:ml-2">Edit</span>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleAccountAction('delete', account.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:p-2"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline ml-1 sm:ml-2">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
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

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16 sm:w-20">ID</TableHead>
                      <TableHead className="min-w-[120px] sm:min-w-[150px]">Name</TableHead>
                      <TableHead className="hidden md:table-cell min-w-[200px]">Email</TableHead>
                      <TableHead className="w-20 sm:w-24">Role</TableHead>
                      <TableHead className="hidden sm:table-cell w-24">Account ID</TableHead>
                      <TableHead className="hidden lg:table-cell w-32">Department</TableHead>
                      <TableHead className="w-20 sm:w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {allUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-mono text-xs">{user.id}</TableCell>
                      <TableCell className="font-medium">
                        <div className="min-w-0">
                          <div className="truncate">{user.firstName} {user.lastName}</div>
                          <div className="md:hidden text-xs text-muted-foreground mt-1 truncate">
                            {user.email}
                          </div>
                          <div className="sm:hidden text-xs text-muted-foreground mt-1">
                            Account: {user.accountId}
                          </div>
                          <div className="lg:hidden text-xs text-muted-foreground mt-1">
                            {user.department}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm truncate max-w-[200px]">{user.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.userRole === 'ADMIN' ? 'destructive' : user.userRole === 'ACCOUNT_ADMIN' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {user.userRole.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{user.accountId}</TableCell>
                      <TableCell className="hidden lg:table-cell">{user.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUserAction('edit', parseInt(user.id))}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:p-2"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline ml-1 sm:ml-2">Edit</span>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleUserAction('delete', parseInt(user.id))}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:p-2"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline ml-1 sm:ml-2">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
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
                        <SelectItem key={account.id} value={account.id.toString()}>
                          {account.companyName}
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
                                <SelectItem key={account.id} value={account.id.toString()}>
                                  {account.companyName}
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

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16 sm:w-20">ID</TableHead>
                      <TableHead className="min-w-[120px] sm:min-w-[150px]">Department Name</TableHead>
                      <TableHead className="hidden sm:table-cell w-24">Account</TableHead>
                      <TableHead className="hidden md:table-cell min-w-[120px]">Company</TableHead>
                      <TableHead className="w-20 sm:w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allDepartments.map((dept) => (
                      <TableRow key={dept.id}>
                        <TableCell className="font-mono text-xs">{dept.id}</TableCell>
                        <TableCell className="font-medium">
                          <div className="min-w-0">
                            <div className="truncate">{dept.departmentName}</div>
                            <div className="sm:hidden text-xs text-muted-foreground mt-1">
                              Account: {dept.accountId}
                            </div>
                            <div className="md:hidden text-xs text-muted-foreground mt-1 truncate">
                              {dept.companyName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{dept.accountId}</TableCell>
                        <TableCell className="hidden md:table-cell truncate max-w-[120px]">{dept.companyName}</TableCell>
                        <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDepartmentAction('edit', dept.id)}
                                className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:p-2"
                              >
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline ml-1 sm:ml-2">Edit</span>
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDepartmentAction('delete', dept.id)}
                                className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:p-2"
                              >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline ml-1 sm:ml-2">Delete</span>
                              </Button>
                            </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
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

            {/* Leave Types Management */}
            <TabsContent value="leave-types" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search leave types..." className="w-64" />
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={() => exportData('leave-types')} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Leave Type
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Leave Type</DialogTitle>
                        <DialogDescription>
                          Add a new type of leave to the system
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="leave_type_name" className="text-right">Type Name</Label>
                          <Input id="leave_type_name" className="col-span-3" placeholder="e.g., Annual Leave" />
                        </div>
                      </div>
                      <Button onClick={() => handleLeaveTypeAction('create')}>Create Leave Type</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16 sm:w-20">ID</TableHead>
                      <TableHead className="min-w-[150px] sm:min-w-[200px]">Leave Type Name</TableHead>
                      <TableHead className="w-24 sm:w-32">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {mockLeaveTypes.map((leaveType) => (
                    <TableRow key={leaveType.id}>
                      <TableCell className="font-mono text-xs">{leaveType.id}</TableCell>
                      <TableCell className="font-medium">{leaveType.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleLeaveTypeAction('edit', leaveType.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:p-2"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline ml-1 sm:ml-2">Edit</span>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleLeaveTypeAction('delete', leaveType.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:p-2"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline ml-1 sm:ml-2">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
              {/* TODO: Add your API call here: await fetch('/api/leave-types') */}
            </TabsContent>

            {/* Leave Days Management */}
            <TabsContent value="leave-days" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search leave days..." className="w-64" />
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by User" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      {allUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.firstName} {user.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by Leave Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Leave Types</SelectItem>
                      {mockLeaveTypes.map((leaveType) => (
                        <SelectItem key={leaveType.id} value={leaveType.id.toString()}>
                          {leaveType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button onClick={() => exportData('leave-days')} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Leave Days
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Leave Days Record</DialogTitle>
                        <DialogDescription>
                          Add leave day allocation for a user
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user_select" className="text-right">User</Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent>
                              {allUsers.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.firstName} {user.lastName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="leave_type_select" className="text-right">Leave Type</Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select leave type" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockLeaveTypes.map((leaveType) => (
                                <SelectItem key={leaveType.id} value={leaveType.id.toString()}>
                                  {leaveType.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="available_days" className="text-right">Available Days</Label>
                          <Input id="available_days" type="number" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="planned_days" className="text-right">Planned Days</Label>
                          <Input id="planned_days" type="number" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="taken_days" className="text-right">Taken Days</Label>
                          <Input id="taken_days" type="number" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="upcoming_days" className="text-right">Upcoming Days</Label>
                          <Input id="upcoming_days" type="number" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="next_year_planned" className="text-right">Next Year Planned</Label>
                          <Input id="next_year_planned" type="number" className="col-span-3" />
                        </div>
                      </div>
                      <Button onClick={() => handleLeaveDaysAction('create')}>Create Leave Days Record</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16 sm:w-20">ID</TableHead>
                      <TableHead className="min-w-[100px] sm:min-w-[120px]">User</TableHead>
                      <TableHead className="hidden sm:table-cell min-w-[100px]">Leave Type</TableHead>
                      <TableHead className="w-20">Available</TableHead>
                      <TableHead className="hidden md:table-cell w-20">Planned</TableHead>
                      <TableHead className="w-16">Taken</TableHead>
                      <TableHead className="hidden lg:table-cell w-20">Upcoming</TableHead>
                      <TableHead className="hidden lg:table-cell w-20">Next Year</TableHead>
                      <TableHead className="w-20 sm:w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {mockLeaveDays.map((leaveDays) => {
                    const user = allUsers.find(u => u.id === leaveDays.userId);
                    const leaveType = mockLeaveTypes.find(lt => lt.id === leaveDays.leaveTypeId);
                    return (
                      <TableRow key={leaveDays.id}>
                        <TableCell className="font-mono text-xs">{leaveDays.id}</TableCell>
                        <TableCell className="font-medium">
                          <div className="min-w-0">
                            <div className="truncate">
                              {user ? `${user.firstName} ${user.lastName}` : `User ${leaveDays.userId}`}
                            </div>
                            <div className="sm:hidden text-xs text-muted-foreground mt-1">
                              {leaveType ? leaveType.name : `Type ${leaveDays.leaveTypeId}`}
                            </div>
                            <div className="md:hidden text-xs text-muted-foreground mt-1">
                              Planned: {leaveDays.planned}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline" className="text-xs">
                            {leaveType ? leaveType.name : `Type ${leaveDays.leaveTypeId}`}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-medium">{leaveDays.available}</TableCell>
                        <TableCell className="hidden md:table-cell text-center">{leaveDays.planned}</TableCell>
                        <TableCell className="text-center font-medium">{leaveDays.taken}</TableCell>
                        <TableCell className="hidden lg:table-cell text-center">{leaveDays.upcoming}</TableCell>
                        <TableCell className="hidden lg:table-cell text-center">{leaveDays.nextYearPlanned}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleLeaveDaysAction('edit', leaveDays.id)}
                              className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:p-2"
                            >
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline ml-1 sm:ml-2">Edit</span>
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleLeaveDaysAction('delete', leaveDays.id)}
                              className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:p-2"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline ml-1 sm:ml-2">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                </Table>
              </div>
              {/* TODO: Add your API call here: await fetch('/api/leave-days') */}
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

      {/* Edit Account Dialog */}
      <Dialog open={editAccountDialog} onOpenChange={setEditAccountDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>
              Update account information
            </DialogDescription>
          </DialogHeader>
          {selectedAccount && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_company_name" className="text-right">Company Name</Label>
                <Input 
                  id="edit_company_name" 
                  defaultValue={selectedAccount.companyName}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_users_count" className="text-right">Users Count</Label>
                <Input 
                  id="edit_users_count" 
                  type="number" 
                  defaultValue={selectedAccount.usersCount}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_billing_address" className="text-right">Billing Address</Label>
                <Textarea 
                  id="edit_billing_address" 
                  defaultValue={selectedAccount.billingAddress}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_subscription_type" className="text-right">Subscription</Label>
                <Select defaultValue={selectedAccount.subscriptionType}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select subscription type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FREE">Free</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <Button onClick={() => {
            console.log('Update account', selectedAccount?.id);
            setEditAccountDialog(false);
          }}>
            Update Account
          </Button>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserDialog} onOpenChange={setEditUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_first_name" className="text-right">First Name</Label>
                <Input 
                  id="edit_first_name" 
                  defaultValue={selectedUser.firstName}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_last_name" className="text-right">Last Name</Label>
                <Input 
                  id="edit_last_name" 
                  defaultValue={selectedUser.lastName}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_email" className="text-right">Email</Label>
                <Input 
                  id="edit_email" 
                  type="email"
                  defaultValue={selectedUser.email}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_user_role" className="text-right">Role</Label>
                <Select defaultValue={selectedUser.userRole}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ACCOUNT_ADMIN">Account Admin</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_department" className="text-right">Department</Label>
                <Input 
                  id="edit_department" 
                  defaultValue={selectedUser.department}
                  className="col-span-3" 
                />
              </div>
            </div>
          )}
          <Button onClick={() => {
            console.log('Update user', selectedUser?.id);
            setEditUserDialog(false);
          }}>
            Update User
          </Button>
        </DialogContent>
      </Dialog>

      {/* Edit Department Dialog */}
      <Dialog open={editDepartmentDialog} onOpenChange={setEditDepartmentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>
              Update department information
            </DialogDescription>
          </DialogHeader>
          {selectedDepartment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_department_name" className="text-right">Department Name</Label>
                <Input 
                  id="edit_department_name" 
                  defaultValue={selectedDepartment.departmentName}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_account_select" className="text-right">Account</Label>
                <Select defaultValue={selectedDepartment.accountId?.toString()}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id.toString()}>
                        {account.companyName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <Button onClick={() => {
            console.log('Update department', selectedDepartment?.id);
            setEditDepartmentDialog(false);
          }}>
            Update Department
          </Button>
        </DialogContent>
      </Dialog>

      {/* Edit Leave Type Dialog */}
      <Dialog open={editLeaveTypeDialog} onOpenChange={setEditLeaveTypeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Leave Type</DialogTitle>
            <DialogDescription>
              Update leave type information
            </DialogDescription>
          </DialogHeader>
          {selectedLeaveType && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_leave_type_name" className="text-right">Type Name</Label>
                <Input 
                  id="edit_leave_type_name" 
                  defaultValue={selectedLeaveType.name}
                  className="col-span-3" 
                  placeholder="e.g., Annual Leave"
                />
              </div>
            </div>
          )}
          <Button onClick={() => {
            console.log('Update leave type', selectedLeaveType?.id);
            setEditLeaveTypeDialog(false);
          }}>
            Update Leave Type
          </Button>
        </DialogContent>
      </Dialog>

      {/* Edit Leave Days Dialog */}
      <Dialog open={editLeaveDaysDialog} onOpenChange={setEditLeaveDaysDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Leave Days</DialogTitle>
            <DialogDescription>
              Update leave days allocation
            </DialogDescription>
          </DialogHeader>
          {selectedLeaveDays && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_user_select" className="text-right">User</Label>
                <Select defaultValue={selectedLeaveDays.userId}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {allUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_leave_type_select" className="text-right">Leave Type</Label>
                <Select defaultValue={selectedLeaveDays.leaveTypeId?.toString()}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockLeaveTypes.map((leaveType) => (
                      <SelectItem key={leaveType.id} value={leaveType.id.toString()}>
                        {leaveType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_available_days" className="text-right">Available Days</Label>
                <Input 
                  id="edit_available_days" 
                  type="number" 
                  defaultValue={selectedLeaveDays.available}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_planned_days" className="text-right">Planned Days</Label>
                <Input 
                  id="edit_planned_days" 
                  type="number" 
                  defaultValue={selectedLeaveDays.planned}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_taken_days" className="text-right">Taken Days</Label>
                <Input 
                  id="edit_taken_days" 
                  type="number" 
                  defaultValue={selectedLeaveDays.taken}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_upcoming_days" className="text-right">Upcoming Days</Label>
                <Input 
                  id="edit_upcoming_days" 
                  type="number" 
                  defaultValue={selectedLeaveDays.upcoming}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit_next_year_planned" className="text-right">Next Year Planned</Label>
                <Input 
                  id="edit_next_year_planned" 
                  type="number" 
                  defaultValue={selectedLeaveDays.nextYearPlanned}
                  className="col-span-3" 
                />
              </div>
            </div>
          )}
          <Button onClick={() => {
            console.log('Update leave days', selectedLeaveDays?.id);
            setEditLeaveDaysDialog(false);
          }}>
            Update Leave Days
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}