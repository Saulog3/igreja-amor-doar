import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Donation } from "@/types/database";

interface DonationsPieChartProps {
  donations: Donation[];
}

const DonationsPieChart = ({ donations }: DonationsPieChartProps) => {
  // Função para obter o texto do status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprovado';
      case 'pending':
        return 'Pendente';
      case 'rejected':
        return 'Rejeitado';
      case 'cancelled':
        return 'Cancelado';
      case 'refunded':
        return 'Reembolsado';
      default:
        return status;
    }
  };

  // Agrupar doações por status
  const statusCounts = donations.reduce((acc, donation) => {
    const status = donation.payment_status;
    if (!acc[status]) {
      acc[status] = {
        count: 0,
        amount: 0,
      };
    }
    acc[status].count += 1;
    acc[status].amount += donation.amount;
    return acc;
  }, {} as Record<string, { count: number; amount: number }>);

  // Preparar dados para o gráfico
  const pieData = Object.entries(statusCounts).map(([status, data]) => ({
    name: getStatusText(status),
    value: data.amount,
    count: data.count,
  }));

  // Cores para cada status
  const COLORS = {
    approved: "#10b981", // verde
    pending: "#f59e0b", // amarelo
    rejected: "#ef4444", // vermelho
    cancelled: "#6b7280", // cinza
    refunded: "#3b82f6", // azul
  };

  const getStatusColor = (status: string) => {
    return COLORS[status as keyof typeof COLORS] || "#6b7280";
  };

  // Formatar valor para o tooltip
  const formatTooltipValue = (value: number) => {
    return `R$ ${value.toFixed(2)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Doações</CardTitle>
        <CardDescription>
          Valores por status de pagamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => {
                  const status = Object.keys(statusCounts)[index];
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getStatusColor(status)} 
                    />
                  );
                })}
              </Pie>
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationsPieChart;