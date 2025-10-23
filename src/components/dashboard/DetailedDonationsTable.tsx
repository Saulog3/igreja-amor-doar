import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Donation } from "@/types/database";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye, Download, Filter } from "lucide-react";

interface DetailedDonationsTableProps {
  donations: Donation[];
  showInstitution?: boolean;
}

const DetailedDonationsTable = ({ donations, showInstitution = false }: DetailedDonationsTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  const getPaymentMethodText = (method?: string) => {
    switch (method) {
      case 'credit_card':
        return 'Cartão de Crédito';
      case 'debit_card':
        return 'Cartão de Débito';
      case 'pix':
        return 'PIX';
      case 'bank_transfer':
        return 'Transferência Bancária';
      case 'mercado_pago':
        return 'Mercado Pago';
      default:
        return method || 'Não informado';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Histórico Detalhado de Doações</CardTitle>
          <CardDescription>
            {donations.length === 0 
              ? "Nenhuma doação encontrada" 
              : `${donations.length} doação(ões) encontrada(s)`
            }
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {donations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhuma doação encontrada
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-sm text-gray-500">ID</th>
                  <th className="text-left py-3 px-2 font-medium text-sm text-gray-500">Doador</th>
                  <th className="text-left py-3 px-2 font-medium text-sm text-gray-500">Valor</th>
                  <th className="text-left py-3 px-2 font-medium text-sm text-gray-500">Método</th>
                  <th className="text-left py-3 px-2 font-medium text-sm text-gray-500">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-sm text-gray-500">Data</th>
                  <th className="text-right py-3 px-2 font-medium text-sm text-gray-500">Ações</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">
                      <span className="font-mono text-xs">
                        {donation.id.substring(0, 8)}...
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div>
                        <p className="font-medium">
                          {donation.donor_name || 'Anônimo'}
                        </p>
                        {donation.donor_email && (
                          <p className="text-sm text-gray-500">
                            {donation.donor_email}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="font-medium">
                        R$ {donation.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm">
                      {getPaymentMethodText(donation.payment_method)}
                    </td>
                    <td className="py-3 px-2">
                      <Badge className={getStatusColor(donation.payment_status)}>
                        {getStatusText(donation.payment_status)}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-500">
                      {donation.created_at && format(
                        new Date(donation.created_at), 
                        "dd/MM/yyyy 'às' HH:mm",
                        { locale: ptBR }
                      )}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailedDonationsTable;