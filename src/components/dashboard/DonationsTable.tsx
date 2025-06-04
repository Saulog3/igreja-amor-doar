
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Donation } from "@/types/database";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DonationsTableProps {
  donations: Donation[];
  showInstitution?: boolean;
}

const DonationsTable = ({ donations, showInstitution = false }: DonationsTableProps) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Doações</CardTitle>
        <CardDescription>
          {donations.length === 0 
            ? "Nenhuma doação encontrada" 
            : `${donations.length} doação(ões) encontrada(s)`
          }
        </CardDescription>
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
                  <th className="text-left py-2">Doador</th>
                  <th className="text-left py-2">Valor</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id} className="border-b">
                    <td className="py-3">
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
                    <td className="py-3">
                      <span className="font-medium">
                        R$ {donation.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3">
                      <Badge className={getStatusColor(donation.payment_status)}>
                        {getStatusText(donation.payment_status)}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm text-gray-500">
                      {donation.created_at && format(
                        new Date(donation.created_at), 
                        "dd/MM/yyyy 'às' HH:mm",
                        { locale: ptBR }
                      )}
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

export default DonationsTable;
