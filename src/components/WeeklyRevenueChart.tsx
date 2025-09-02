import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type PeriodType = "week" | "month" | "year";

interface WeeklyRevenueChartProps {
  className?: string;
}

const WeeklyRevenueChart = ({ className }: WeeklyRevenueChartProps) => {
  const [period, setPeriod] = useState<PeriodType>("week");

  // Dados mockados para exemplo
  const mockData = [
    { "dia": "Seg", "valor": 45 },
    { "dia": "Ter", "valor": 52 },
    { "dia": "Qua", "valor": 47 },
    { "dia": "Qui", "valor": 63 },
    { "dia": "Sex", "valor": 57 },
    { "dia": "Sáb", "valor": 39 },
    { "dia": "Dom", "valor": 28 }
  ];

  // Formatar valor para o tooltip
  const formatTooltipValue = (value: number) => {
    return `R$ ${value.toFixed(2)}k`;
  };

  // Formatar valor para o eixo Y
  const formatYAxis = (value: number) => {
    return `R$${value}k`;
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Arrecadação Semanal</CardTitle>
          <p className="text-sm text-gray-500">Últimos 7 dias</p>
        </div>
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as PeriodType)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Semana</SelectItem>
            <SelectItem value="month">Mês</SelectItem>
            <SelectItem value="year">Ano</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="dia" 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value: number) => [formatTooltipValue(value), 'Valor']}
                labelFormatter={(label) => `Dia: ${label}`}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              />
              <Bar 
                dataKey="valor" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]} 
                barSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyRevenueChart;