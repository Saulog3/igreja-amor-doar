
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Donation } from "@/types/database";
import { format, subDays, eachDayOfInterval } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DonationsChartProps {
  donations: Donation[];
}

const DonationsChart = ({ donations }: DonationsChartProps) => {
  // Criar dados para os últimos 7 dias
  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date()
  });

  const chartData = last7Days.map(day => {
    const dayDonations = donations.filter(donation => {
      if (!donation.created_at) return false;
      const donationDate = new Date(donation.created_at);
      return (
        donationDate.getDate() === day.getDate() &&
        donationDate.getMonth() === day.getMonth() &&
        donationDate.getFullYear() === day.getFullYear() &&
        donation.payment_status === 'approved'
      );
    });

    const totalAmount = dayDonations.reduce((sum, donation) => sum + donation.amount, 0);

    return {
      date: format(day, "dd/MM", { locale: ptBR }),
      amount: totalAmount,
      count: dayDonations.length
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doações dos Últimos 7 Dias</CardTitle>
        <CardDescription>
          Valores recebidos por dia (apenas doações aprovadas)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Valor']}
                labelFormatter={(label) => `Data: ${label}`}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationsChart;
