import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface LeaveTypeBadgeProps {
  type: 'annual' | 'sick' | 'personal' | 'maternity' | 'emergency';
  className?: string;
}

export function LeaveTypeBadge({ type, className }: LeaveTypeBadgeProps) {
  const variants = {
    annual: "bg-vacation-annual text-white",
    sick: "bg-vacation-sick text-white",
    personal: "bg-vacation-personal text-white", 
    maternity: "bg-vacation-maternity text-white",
    emergency: "bg-vacation-emergency text-white"
  };

  const labels = {
    annual: "Annual Leave",
    sick: "Sick Leave",
    personal: "Personal Leave",
    maternity: "Maternity Leave", 
    emergency: "Emergency Leave"
  };

  return (
    <Badge 
      className={cn(variants[type], className)}
    >
      {labels[type]}
    </Badge>
  );
}