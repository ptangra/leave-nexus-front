import { NavLink, useLocation } from "react-router-dom";
import { 
  Calendar, 
  Home, 
  Clock, 
  Users, 
  Settings, 
  Bell,
  LogOut,
  PlusCircle,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/data";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'My Requests', href: '/requests', icon: Clock },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'New Request', href: '/requests/new', icon: PlusCircle },
];

const adminNavigation = [
  { name: 'Team Management', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const superAdminNavigation = [
  { name: 'Super Admin', href: '/super-admin', icon: Shield },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    // TODO: Implement actual logout
    console.log('Logout clicked');
  };

  const getNavClassName = (href: string) => {
    const isActive = location.pathname === href;
    return cn(
      "flex items-center gap-3 text-sm font-medium transition-colors",
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    );
  };

  const getSuperAdminClassName = (href: string) => {
    const isActive = location.pathname === href;
    return cn(
      "flex items-center gap-3 text-sm font-medium transition-colors",
      isActive
        ? "bg-destructive text-destructive-foreground"
        : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
    );
  };

  return (
    <Sidebar 
      className="border-r border-border" 
      variant="sidebar"
      collapsible="offcanvas"
    >
      <SidebarHeader className="border-b border-border">
        <div className="flex h-16 items-center px-3 sm:px-6">
          <NavLink to="/" className="text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors">
            {isCollapsed ? "VP" : "VacationPro"}
          </NavLink>
        </div>
        
        {/* User info */}
        <div className="p-2 sm:p-4">
          <NavLink to="/profile" className="flex items-center space-x-3 hover:bg-muted/50 rounded-lg p-2 transition-colors">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
              {currentUser.avatar}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                  {currentUser.name} {currentUser.last_name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {currentUser.department}
                </p>
              </div>
            )}
          </NavLink>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                     <NavLink to={item.href} className={getNavClassName(item.href)}>
                       <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                       {!isCollapsed && <span className="text-xs sm:text-sm">{item.name}</span>}
                     </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin section */}
        {(currentUser.role === 'ADMIN' || currentUser.role === 'ACCOUNT_ADMIN') && (
          <SidebarGroup>
            <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
              Administration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                       <NavLink to={item.href} className={getNavClassName(item.href)}>
                         <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                         {!isCollapsed && <span className="text-xs sm:text-sm">{item.name}</span>}
                       </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Super Admin section */}
        {currentUser.role === 'ADMIN' && (
          <SidebarGroup>
            <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
              System
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {superAdminNavigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                       <NavLink to={item.href} className={getSuperAdminClassName(item.href)}>
                         <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                         {!isCollapsed && <span className="text-xs sm:text-sm">{item.name}</span>}
                       </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
               <Button
                 variant="ghost"
                 size="sm"
                 onClick={handleLogout}
                 className="w-full justify-start text-muted-foreground hover:text-foreground"
               >
                 <LogOut className="h-4 w-4 flex-shrink-0" />
                 {!isCollapsed && <span className="ml-2 sm:ml-3 text-xs sm:text-sm">Sign out</span>}
               </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}