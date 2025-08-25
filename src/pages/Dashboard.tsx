import { Calendar, Clock, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { LeaveTypeBadge } from "@/components/ui/leave-type-badge";
import { currentUser, leaveRequests, upcomingAbsences } from "@/lib/data";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const userRequests = leaveRequests.filter(req => req.userId === currentUser.user_id.toString());
  const pendingRequests = userRequests.filter(req => req.status === 'pending');
  const remainingLeave = currentUser.totalLeave - currentUser.usedLeave;

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {currentUser.name}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of your vacation status and team updates.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Leave</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{remainingLeave}</div>
            <p className="text-xs text-muted-foreground">
              out of {currentUser.totalLeave} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Used This Year</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{currentUser.usedLeave}</div>
            <p className="text-xs text-muted-foreground">
              days taken
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Absences</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{upcomingAbsences.length}</div>
            <p className="text-xs text-muted-foreground">
              upcoming this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Who's Away */}
        <Card>
          <CardHeader>
            <CardTitle>Who's Away</CardTitle>
            <p className="text-sm text-muted-foreground">
              Upcoming team absences
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAbsences.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming absences</p>
            ) : (
              upcomingAbsences.map((absence) => (
                <div key={absence.id} className="flex items-center justify-between p-3 bg-card-header rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{absence.userName}</span>
                      <LeaveTypeBadge type={absence.type} />
                    </div>
                    <p className="text-sm text-muted-foreground">{absence.department}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(absence.startDate).toLocaleDateString()} - {new Date(absence.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{absence.days} days</span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Recent Requests</CardTitle>
              <p className="text-sm text-muted-foreground">
                Your latest leave requests
              </p>
            </div>
            <Link to="/requests">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {userRequests.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground mb-4">No requests yet</p>
                <Link to="/requests/new">
                  <Button>Submit Your First Request</Button>
                </Link>
              </div>
            ) : (
              userRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-card-header rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <LeaveTypeBadge type={request.type} />
                      <StatusBadge status={request.status} />
                    </div>
                    <p className="text-sm font-medium">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{request.reason}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{request.days} days</span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link to="/requests/new">
              <Button>
                Request Leave
              </Button>
            </Link>
            <Link to="/calendar">
              <Button variant="outline">
                View Calendar
              </Button>
            </Link>
            <Link to="/requests">
              <Button variant="outline">
                My Requests
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}