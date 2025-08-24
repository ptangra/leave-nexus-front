import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    pending: "bg-warning text-warning-foreground",
    approved: "bg-success text-success-foreground", 
    rejected: "bg-destructive text-destructive-foreground"
  };

  return (
    <Badge 
      className={cn(variants[status], className)}
      variant="secondary"
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}