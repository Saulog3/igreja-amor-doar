import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Donation } from "@/types/database";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Eye, Download, Filter } from "lucide-react";

interface DetailedDonationsTableProps {
  donations: Donation[]; // Lista completa e filtrada do Dashboard
  showInstitution?: boolean;
  onFilterClick: () => void;
}

const ITEMS_PER_PAGE = 10;

const DetailedDonationsTable = ({ donations, showInstitution = false, onFilterClick}: DetailedDonationsTableProps) => {
  
  // 1. ESTADO INTERNO DA PAGINAÇÃO
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = donations.length;

  // 2. CÁLCULO DA PAGINAÇÃO
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedDonations = donations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };  

  const exportToCSV = (data: Donation[]) => {
    if (data.length === 0) return;

    // 1. Criar o cabeçalho CSV
    const headers = ["ID", "Doador Nome", "Doador Email", "Valor", "Método", "Status", "Data"];
    
    // 2. Mapear os dados para linhas CSV
    const csvRows = data.map(d => [
      d.id,
      d.donor_name || 'Anônimo',
      d.donor_email || '',
      d.amount.toFixed(2).replace('.', ','), // Usar vírgula como separador decimal
      getPaymentMethodText(d.payment_method),
      getStatusText(d.payment_status),
      d.created_at ? format(new Date(d.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR }) : ''
    ].map(item => `"${item}"`).join(',')); // Envolver campos com aspas para lidar com vírgulas internas

    const csvContent = [
      headers.join(','),
      ...csvRows
    ].join('\n');

    // 3. Criar e baixar o arquivo
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' }); 
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `doacoes_exportadas_${format(new Date(), 'yyyyMMdd')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const { toast } = useToast();
  const handleExport = () => {
    exportToCSV(donations);
    
    toast({
          title: "Exportação Concluída!",
          description: "Você precisa estar logado para adicionar uma instituição.",
          variant: "success"
        });
  };

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
            {/* Exibe o total de itens FILTRADOS (donations.length) */}
            {totalItems === 0 
              ? "Nenhuma doação encontrada" 
              : `${totalItems} doação(ões) encontrada(s)`
            }
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleExport}> {/* <--- AÇÃO DE EXPORTAR */}
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {totalItems === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhuma doação encontrada
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                  <tr className="border-b">
                      {/* Usar w-20 ou w-1/12 para o ID */}
                      <th className="text-left py-3 px-2 font-medium text-sm text-gray-500 w-20">ID</th>
                      {/* Aumentar significativamente a largura do Doador */}
                      <th className="text-left py-3 px-2 font-medium text-sm text-gray-500 w-1/4">Doador</th> 
                      <th className="text-left py-3 px-2 font-medium text-sm text-gray-500">Valor</th>
                      <th className="text-left py-3 px-2 font-medium text-sm text-gray-500">Método</th>
                      <th className="text-left py-3 px-2 font-medium text-sm text-gray-500">Status</th>
                      <th className="text-left py-3 px-2 font-medium text-sm text-gray-500">Data</th>
                      <th className="text-right py-3 px-2 font-medium text-sm text-gray-500">Ações</th>
                  </tr>
              </thead>
              <tbody>
                {/* 3. USA APENAS OS ITENS PAGINADOS */}
                {paginatedDonations.map((donation) => (
                  <tr key={donation.id} className="border-b hover:bg-transparent">
                      {/* Célula do ID */}
                      <td className="py-3 px-2 text-sm"> 
                          <span className="font-mono text-xs">
                              {donation.id.substring(0, 8)}...
                          </span>
                      </td>
                    {/* Célula do Doador - Mantida a largura na coluna */}
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
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={previousPage}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Anterior
              </button>

              <span className="text-sm">
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage >= totalPages} // Corrigido para garantir que não avance além do total
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DetailedDonationsTable;