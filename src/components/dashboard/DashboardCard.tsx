
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  className?: string;
  color?: string;
}

const DashboardCard = ({ title, value, icon: Icon, description, className, color = "#3b82f6" }: DashboardCardProps) => {
  return (
    <Card className={`${className} border-0 shadow-sm`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
            <div className="text-2xl font-bold mt-1">{value}</div>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <div className="rounded-full p-3" style={{ backgroundColor: `${color}20` }}>
            <Icon className="h-5 w-5" style={{ color: color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
