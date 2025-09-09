import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  percentage: string;
  icon: ReactNode;
  iconColor: string;
}

const SummaryCard = ({ title, value, percentage, icon, iconColor }: SummaryCardProps) => {
  return (
    <Card className="rounded-lg shadow-md bg-white overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="rounded-full p-3" style={{ backgroundColor: `${iconColor}15` }}>
            {icon}
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-green-500">+{percentage}</span>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="text-2xl font-bold mt-1.5">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;