import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Donation } from "@/types/database";

interface DonationsPieChartProps {
  donations: Donation[];
}

const DonationsPieChart = ({ donations }: DonationsPieChartProps) => {
  // Dados mockados para o gráfico de rosca
  const donutData = [
    { "categoria": "Assistência Social", "valor": 500000, "cor": "#EF4444" },
    { "categoria": "Cultura", "valor": 300000, "cor": "#8B5CF6" },
    { "categoria": "Educação", "valor": 700000, "cor": "#3B82F6" },
    { "categoria": "Esporte", "valor": 200000, "cor": "#06B6D4" },
    { "categoria": "Meio Ambiente", "valor": 400000, "cor": "#F59E0B" },
    { "categoria": "Saúde", "valor": 720000, "cor": "#10B981" }
  ];

  // Calcular total
  const total = donutData.reduce((sum, item) => sum + item.valor, 0);

  // Formatar valor para exibição
  const formatValue = (value: number) => {
    return `R$ ${(value / 1000).toFixed(0)}k`;
  };

  // Formatar valor para o tooltip
  const formatTooltipValue = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR')}`;
  };

  // Formatar total para exibição
  const formatTotal = (value: number) => {
    return `R$ ${(value / 1000000).toFixed(1).replace('.', ',')}M`;
  };

  return (
    <Card className="rounded-lg bg-white shadow-sm border border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">Distribuição por Categoria</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Total: {formatTotal(total)}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          {/* Gráfico de Rosca */}
          <div className="w-[280px] h-[280px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="valor"
                >
                  {donutData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.cor}
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [formatTooltipValue(value), 'Valor']}
                  labelFormatter={(label) => `Categoria: ${label}`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legenda */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            {donutData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2 flex-shrink-0" 
                  style={{ backgroundColor: entry.cor }}
                />
                <span className="text-sm text-gray-700 truncate">{entry.categoria}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationsPieChart;