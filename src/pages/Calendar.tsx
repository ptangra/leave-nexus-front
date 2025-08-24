import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LeaveTypeBadge } from "@/components/ui/leave-type-badge";
import { leaveRequests, upcomingAbsences } from "@/lib/data";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    // Next month's leading days to fill the grid
    const remainingCells = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
      days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const events = [];
    
    // Check leave requests
    leaveRequests.forEach(request => {
      if (request.status === 'approved' && dateStr >= request.startDate && dateStr <= request.endDate) {
        events.push({
          type: 'leave',
          leaveType: request.type,
          title: `${request.userName} - ${request.type}`,
          user: request.userName
        });
      }
    });
    
    return events;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Calendar</h1>
          <p className="text-muted-foreground mt-1">
            View team absences and leave schedules
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('month')}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('week')}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      {view === 'month' ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {days.map(({ date, isCurrentMonth }, index) => {
                const events = getEventsForDate(date);
                const isToday = date.toDateString() === today.toDateString();
                
                return (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border border-border ${
                      isCurrentMonth ? 'bg-background' : 'bg-muted/30'
                    } ${isToday ? 'ring-2 ring-primary' : ''}`}
                  >
                    <div className={`text-sm font-medium ${
                      isCurrentMonth 
                        ? isToday 
                          ? 'text-primary' 
                          : 'text-foreground'
                        : 'text-muted-foreground'
                    }`}>
                      {date.getDate()}
                    </div>
                    <div className="mt-1 space-y-1">
                      {events.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="text-xs p-1 rounded truncate"
                          style={{
                            backgroundColor: `hsl(var(--vacation-${event.leaveType}))`,
                            color: 'white'
                          }}
                          title={event.title}
                        >
                          {event.user}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Upcoming Absences List */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Absences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAbsences.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">
                  No upcoming absences scheduled
                </p>
              ) : (
                upcomingAbsences.map((absence) => (
                  <div key={absence.id} className="flex items-center justify-between p-4 bg-card-header rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{absence.userName}</span>
                        <LeaveTypeBadge type={absence.type} />
                      </div>
                      <p className="text-sm text-muted-foreground">{absence.department}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(absence.startDate).toLocaleDateString()} - {new Date(absence.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold">{absence.days}</span>
                      <p className="text-sm text-muted-foreground">days</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* All Approved Requests */}
          <Card>
            <CardHeader>
              <CardTitle>All Approved Requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaveRequests.filter(r => r.status === 'approved').map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-card-header rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{request.userName}</span>
                      <LeaveTypeBadge type={request.type} />
                    </div>
                    <p className="text-sm text-muted-foreground">{request.reason}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold">{request.days}</span>
                    <p className="text-sm text-muted-foreground">days</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Type Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-vacation-annual"></div>
              <span className="text-sm">Annual Leave</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-vacation-sick"></div>
              <span className="text-sm">Sick Leave</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-vacation-personal"></div>
              <span className="text-sm">Personal Leave</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-vacation-maternity"></div>
              <span className="text-sm">Maternity Leave</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded bg-vacation-emergency"></div>
              <span className="text-sm">Emergency Leave</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}