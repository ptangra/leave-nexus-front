import { useState } from "react";
import { Plus, Filter, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { LeaveTypeBadge } from "@/components/ui/leave-type-badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { currentUser, leaveRequests } from "@/lib/data";
import { Link } from "react-router-dom";

export default function Requests() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const userRequests = leaveRequests.filter(req => req.userId === currentUser.user_id.toString());

  const filteredRequests = userRequests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesType = filterType === 'all' || request.type === filterType;
    const matchesSearch = request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const stats = {
    total: userRequests.length,
    pending: userRequests.filter(r => r.status === 'pending').length,
    approved: userRequests.filter(r => r.status === 'approved').length,
    rejected: userRequests.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Leave Requests</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your vacation requests
          </p>
        </div>
        <Link to="/requests/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <div className="w-4 h-4 rounded-full bg-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <div className="w-4 h-4 rounded-full bg-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search by reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sm:max-w-xs"
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="annual">Annual Leave</SelectItem>
                <SelectItem value="sick">Sick Leave</SelectItem>
                <SelectItem value="personal">Personal Leave</SelectItem>
                <SelectItem value="maternity">Maternity Leave</SelectItem>
                <SelectItem value="emergency">Emergency Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No requests found</h3>
              <p className="text-muted-foreground mb-6">
                {userRequests.length === 0 
                  ? "You haven't submitted any leave requests yet."
                  : "No requests match your current filters."
                }
              </p>
              <Link to="/requests/new">
                <Button>Submit Your First Request</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center space-x-3">
                      <LeaveTypeBadge type={request.type} />
                      <StatusBadge status={request.status} />
                      <span className="text-sm text-muted-foreground">
                        {request.days} {request.days === 1 ? 'day' : 'days'}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-foreground">
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{request.reason}</p>
                    </div>

                    {request.status === 'approved' && request.approvedBy && (
                      <div className="text-sm text-success">
                        ✓ Approved by {request.approvedBy} on {new Date(request.approvedAt!).toLocaleDateString()}
                      </div>
                    )}

                    {request.status === 'rejected' && request.rejectionReason && (
                      <div className="text-sm text-destructive">
                        ✗ Rejected: {request.rejectionReason}
                      </div>
                    )}
                  </div>

                  <div className="text-right text-sm text-muted-foreground">
                    Submitted {new Date(request.startDate).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}