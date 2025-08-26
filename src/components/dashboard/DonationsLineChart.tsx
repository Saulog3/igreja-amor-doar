import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Donation } from "@/types/database";
import { format, subMonths, eachMonthOfInterval, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DonationsLineChartProps {
  donations: Donation[];
}

const DonationsLineChart = ({ donations }: DonationsLineChartProps) => {
  // Criar dados para os últimos 6 meses
  const last6Months = eachMonthOfInterval({
    start: subMonths(new Date(), 5),
    end: new Date()
  });

  const chartData = last6Months.map(month => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);

    const monthDonations = donations.filter(donation => {
      if (!donation.created_at) return false;
      const donationDate = new Date(donation.created_at);
      return (
        donationDate >= monthStart &&
        donationDate <= monthEnd &&
        donation.payment_status === 'approved'
      );
    });

    const totalAmount = monthDonations.reduce((sum, donation) => sum + donation.amount, 0);

    return {
      month: format(month, "MMM/yyyy", { locale: ptBR }),
      amount: totalAmount,
      count: monthDonations.length
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendência de Doações</CardTitle>
        <CardDescription>
          Valores recebidos nos últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Valor']}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationsLineChart;