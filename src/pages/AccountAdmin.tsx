import { useState } from "react";
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  MoreHorizontal,
  UserPlus,
  Shield,
  Building2,
  Calendar,
  CalendarDays
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { 
  users, 
  currentUser, 
  holidays, 
  countries, 
  nationalHolidays,
  type User, 
  type Holiday 
} from "@/lib/data";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function AccountAdmin() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddDepartmentOpen, setIsAddDepartmentOpen] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [isAddHolidayOpen, setIsAddHolidayOpen] = useState(false);
  const [isAddNationalHolidaysOpen, setIsAddNationalHolidaysOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedNationalHolidays, setSelectedNationalHolidays] = useState<string[]>([]);
  const [customHoliday, setCustomHoliday] = useState({
    name: "",
    date: undefined as Date | undefined,
    description: "",
    recurring: false
  });
  
  const [newUser, setNewUser] = useState({
    name: "",
    last_name: "",
    email: "",
    role: "USER" as User['role'],
    department: "",
    isDepartmentHead: false,
  });

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "all" || user.department === selectedDepartment;
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

  // Get unique departments and roles for filters
  const departments = Array.from(new Set(users.map(user => user.department)));
  const roles = ["USER", "ACCOUNT_ADMIN", "ADMIN"] as const;

  const handleAddUser = async () => {
    try {
      // TODO: Replace with actual API call
      // await api.createUser(newUser);
      console.log('Creating user:', newUser);
      
      toast({
        title: "User Created",
        description: `${newUser.name} ${newUser.last_name} has been added successfully.`,
      });
      
      setIsAddUserOpen(false);
      setNewUser({
        name: "",
        last_name: "",
        email: "",
        role: "USER",
        department: "",
        isDepartmentHead: false,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEditUser = async () => {
    if (!editingUser) return;
    
    try {
      // TODO: Replace with actual API call
      // await api.updateUser(editingUser.user_id, editingUser);
      console.log('Updating user:', editingUser);
      
      toast({
        title: "User Updated",
        description: `${editingUser.name} ${editingUser.last_name} has been updated successfully.`,
      });
      
      setIsEditUserOpen(false);
      setEditingUser(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async (user: User) => {
    if (user.user_id === currentUser.user_id) {
      toast({
        title: "Cannot Delete",
        description: "You cannot delete your own account.",
        variant: "destructive"
      });
      return;
    }

    try {
      // TODO: Replace with actual API call
      // await api.deleteUser(user.user_id);
      console.log('Deleting user:', user);
      
      toast({
        title: "User Deleted",
        description: `${user.name} ${user.last_name} has been removed from the account.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddDepartment = async () => {
    if (!newDepartmentName.trim()) return;
    
    try {
      // TODO: Replace with actual API call
      // await api.createDepartment({ name: newDepartmentName });
      console.log('Creating department:', newDepartmentName);
      
      toast({
        title: "Department Created",
        description: `${newDepartmentName} department has been added successfully.`,
      });
      
      setIsAddDepartmentOpen(false);
      setNewDepartmentName("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create department. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteDepartment = async (departmentName: string) => {
    const usersInDepartment = users.filter(user => user.department === departmentName);
    
    if (usersInDepartment.length > 0) {
      toast({
        title: "Cannot Delete Department",
        description: `Cannot delete ${departmentName} because it has ${usersInDepartment.length} users assigned to it.`,
        variant: "destructive"
      });
      return;
    }

    try {
      // TODO: Replace with actual API call
      // await api.deleteDepartment(departmentName);
      console.log('Deleting department:', departmentName);
      
      toast({
        title: "Department Deleted",
        description: `${departmentName} department has been removed.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete department. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddCustomHoliday = async () => {
    if (!customHoliday.name || !customHoliday.date) return;
    
    try {
      // TODO: Replace with actual API call
      const newHoliday: Holiday = {
        id: Date.now().toString(),
        name: customHoliday.name,
        date: format(customHoliday.date, 'yyyy-MM-dd'),
        type: 'custom',
        description: customHoliday.description,
        recurring: customHoliday.recurring
      };
      
      console.log('Creating custom holiday:', newHoliday);
      
      toast({
        title: "Holiday Added",
        description: `${customHoliday.name} has been added to the company calendar.`,
      });
      
      setIsAddHolidayOpen(false);
      setCustomHoliday({
        name: "",
        date: undefined,
        description: "",
        recurring: false
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add holiday. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddNationalHolidays = async () => {
    if (!selectedCountry || selectedNationalHolidays.length === 0) return;
    
    try {
      const countryHolidays = nationalHolidays[selectedCountry];
      const newHolidays: Holiday[] = selectedNationalHolidays.map(holidayName => {
        const holiday = countryHolidays.find(h => h.name === holidayName);
        return {
          id: Date.now().toString() + Math.random(),
          name: holiday!.name,
          date: `2024-${holiday!.date}`,
          type: 'national' as const,
          country: selectedCountry,
          description: holiday!.description,
          recurring: true
        };
      });
      
      console.log('Adding national holidays:', newHolidays);
      
      toast({
        title: "National Holidays Added",
        description: `${selectedNationalHolidays.length} national holidays have been added to the company calendar.`,
      });
      
      setIsAddNationalHolidaysOpen(false);
      setSelectedCountry("");
      setSelectedNationalHolidays([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add national holidays. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteHoliday = async (holiday: Holiday) => {
    try {
      // TODO: Replace with actual API call
      console.log('Deleting holiday:', holiday);
      
      toast({
        title: "Holiday Deleted",
        description: `${holiday.name} has been removed from the company calendar.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete holiday. Please try again.",
        variant: "destructive"
      });
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Account Administration</h1>
          <p className="text-muted-foreground">Manage users and permissions for your account</p>
        </div>
        
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">First Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={newUser.last_name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, last_name: e.target.value }))}
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john.doe@company.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newUser.department}
                  onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Engineering"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newUser.role} onValueChange={(value: User['role']) => setNewUser(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ACCOUNT_ADMIN">Account Admin</SelectItem>
                    {currentUser.role === 'ADMIN' && (
                      <SelectItem value="ADMIN">System Admin</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDepartmentHead"
                  checked={newUser.isDepartmentHead}
                  onChange={(e) => setNewUser(prev => ({ ...prev, isDepartmentHead: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isDepartmentHead" className="text-sm">
                  Department Head
                </Label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>
                  Create User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === 'ACCOUNT_ADMIN').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Department Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Department Management</CardTitle>
          <Dialog open={isAddDepartmentOpen} onOpenChange={setIsAddDepartmentOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Department</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="department_name">Department Name</Label>
                  <Input
                    id="department_name"
                    value={newDepartmentName}
                    onChange={(e) => setNewDepartmentName(e.target.value)}
                    placeholder="Engineering"
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDepartmentOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddDepartment}>
                    Create Department
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => {
              const userCount = users.filter(user => user.department === dept).length;
              return (
                <Card key={dept}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{dept}</h3>
                        <p className="text-sm text-muted-foreground">
                          {userCount} user{userCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleDeleteDepartment(dept)}
                            className="text-destructive"
                            disabled={userCount > 0}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Department
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Holiday Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Company Holiday Calendar</CardTitle>
          <div className="flex space-x-2">
            <Dialog open={isAddNationalHolidaysOpen} onOpenChange={setIsAddNationalHolidaysOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add National Holidays
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add National Holidays</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedCountry && (
                    <div className="space-y-2">
                      <Label>Select Holidays</Label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {nationalHolidays[selectedCountry]?.map((holiday) => (
                          <div key={holiday.name} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={holiday.name}
                              checked={selectedNationalHolidays.includes(holiday.name)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedNationalHolidays(prev => [...prev, holiday.name]);
                                } else {
                                  setSelectedNationalHolidays(prev => prev.filter(h => h !== holiday.name));
                                }
                              }}
                              className="rounded border-gray-300"
                            />
                            <Label htmlFor={holiday.name} className="text-sm flex-1">
                              {holiday.name} ({holiday.date})
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddNationalHolidaysOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddNationalHolidays}
                      disabled={!selectedCountry || selectedNationalHolidays.length === 0}
                    >
                      Add Selected Holidays
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={isAddHolidayOpen} onOpenChange={setIsAddHolidayOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Custom Holiday
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Custom Holiday</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="holiday_name">Holiday Name</Label>
                    <Input
                      id="holiday_name"
                      value={customHoliday.name}
                      onChange={(e) => setCustomHoliday(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Company Foundation Day"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !customHoliday.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {customHoliday.date ? format(customHoliday.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={customHoliday.date}
                          onSelect={(date) => setCustomHoliday(prev => ({ ...prev, date }))}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="holiday_description">Description (Optional)</Label>
                    <Input
                      id="holiday_description"
                      value={customHoliday.description}
                      onChange={(e) => setCustomHoliday(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Special company celebration"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={customHoliday.recurring}
                      onChange={(e) => setCustomHoliday(prev => ({ ...prev, recurring: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="recurring" className="text-sm">
                      Recurring annually
                    </Label>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddHolidayOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddCustomHoliday}
                      disabled={!customHoliday.name || !customHoliday.date}
                    >
                      Add Holiday
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {holidays.map((holiday) => (
              <Card key={holiday.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{holiday.name}</h3>
                        <Badge variant={holiday.type === 'national' ? 'default' : 'secondary'} className="text-xs">
                          {holiday.type === 'national' ? (holiday.country || 'National') : 'Custom'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {format(new Date(holiday.date), 'MMMM do, yyyy')}
                      </p>
                      {holiday.description && (
                        <p className="text-xs text-muted-foreground">{holiday.description}</p>
                      )}
                      {holiday.recurring && (
                        <p className="text-xs text-muted-foreground mt-1">🔄 Recurring annually</p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleDeleteHoliday(holiday)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Holiday
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
            {holidays.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No holidays configured. Add national holidays or create custom company holidays.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map(role => (
                  <SelectItem key={role} value={role}>{getRoleLabel(role)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Leave Balance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="font-medium">{user.name} {user.last_name}</div>
                          <div className="text-sm text-muted-foreground">ID: {user.user_id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                     <TableCell>
                       <div className="flex flex-col gap-1">
                         <Badge variant={getRoleBadgeVariant(user.role)}>
                           {getRoleLabel(user.role)}
                         </Badge>
                         {user.isDepartmentHead && (
                           <Badge variant="outline" className="text-xs">
                             Dept. Head
                           </Badge>
                         )}
                       </div>
                     </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{user.totalLeave - user.usedLeave} days available</div>
                        <div className="text-muted-foreground">
                          {user.usedLeave}/{user.totalLeave} used
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingUser(user);
                              setIsEditUserOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user)}
                            className="text-destructive"
                            disabled={user.user_id === currentUser.user_id}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit_name">First Name</Label>
                  <Input
                    id="edit_name"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_last_name">Last Name</Label>
                  <Input
                    id="edit_last_name"
                    value={editingUser.last_name}
                    onChange={(e) => setEditingUser(prev => prev ? ({ ...prev, last_name: e.target.value }) : null)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit_email">Email</Label>
                <Input
                  id="edit_email"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser(prev => prev ? ({ ...prev, email: e.target.value }) : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit_department">Department</Label>
                <Input
                  id="edit_department"
                  value={editingUser.department}
                  onChange={(e) => setEditingUser(prev => prev ? ({ ...prev, department: e.target.value }) : null)}
                />
              </div>
              
               <div className="space-y-2">
                 <Label htmlFor="edit_role">Role</Label>
                 <Select 
                   value={editingUser.role} 
                   onValueChange={(value: User['role']) => setEditingUser(prev => prev ? ({ ...prev, role: value }) : null)}
                 >
                   <SelectTrigger>
                     <SelectValue placeholder="Select role" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="USER">User</SelectItem>
                     <SelectItem value="ACCOUNT_ADMIN">Account Admin</SelectItem>
                     {currentUser.role === 'ADMIN' && (
                       <SelectItem value="ADMIN">System Admin</SelectItem>
                     )}
                   </SelectContent>
                 </Select>
               </div>
               
               <div className="flex items-center space-x-2">
                 <input
                   type="checkbox"
                   id="edit_isDepartmentHead"
                   checked={editingUser.isDepartmentHead || false}
                   onChange={(e) => setEditingUser(prev => prev ? ({ ...prev, isDepartmentHead: e.target.checked }) : null)}
                   className="rounded border-gray-300"
                 />
                 <Label htmlFor="edit_isDepartmentHead" className="text-sm">
                   Department Head
                 </Label>
               </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditUser}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}