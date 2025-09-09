import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, DollarSign, Users, TrendingUp, Clock } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DonationsTable from "@/components/dashboard/DonationsTable";
import DonationsChart from "@/components/dashboard/DonationsChart";
import DonationsPieChart from "@/components/dashboard/DonationsPieChart";
import DonationsLineChart from "@/components/dashboard/DonationsLineChart";
import DetailedDonationsTable from "@/components/dashboard/DetailedDonationsTable";
import DashboardFilters, { FilterValues } from "@/components/dashboard/DashboardFilters";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useDonations } from "@/hooks/useDonations";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    startDate: undefined,
    endDate: undefined,
    paymentStatus: undefined,
    minAmount: undefined,
    maxAmount: undefined,
  });

  // Usar o hook de doações
  const { donations, loading: donationsLoading, refetch } = useDonations();

  // Redirecionar se não estiver logado
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);
  
  // Função para atualizar os dados
  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Dados atualizados",
        description: "Os dados do dashboard foram atualizados com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao atualizar os dados. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Função para exportar dados
  const handleExport = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados estão sendo preparados para exportação.",
    });
    // Implementação da exportação seria feita aqui
  };

  // Função para alternar a visibilidade dos filtros
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  // Filtrar doações com base nos filtros
  const filteredDonations = donations.filter((donation) => {
    // Filtro de data inicial
    if (filters.startDate && donation.created_at) {
      const donationDate = new Date(donation.created_at);
      if (donationDate < filters.startDate) return false;
    }

    // Filtro de data final
    if (filters.endDate && donation.created_at) {
      const donationDate = new Date(donation.created_at);
      if (donationDate > filters.endDate) return false;
    }

    // Filtro de status de pagamento
    if (filters.paymentStatus && donation.payment_status !== filters.paymentStatus) {
      return false;
    }

    // Filtro de valor mínimo
    if (filters.minAmount !== undefined && donation.amount < filters.minAmount) {
      return false;
    }

    // Filtro de valor máximo
    if (filters.maxAmount !== undefined && donation.amount > filters.maxAmount) {
      return false;
    }

    return true;
  });

  // Calcular métricas
  const metrics = {
    totalAmount: filteredDonations
      .filter((d) => d.payment_status === "approved")
      .reduce((sum, donation) => sum + donation.amount, 0),
    totalDonations: filteredDonations.filter((d) => d.payment_status === "approved").length,
    uniqueDonors: new Set(
      filteredDonations
        .filter((d) => d.payment_status === "approved")
        .map((d) => d.donor_email)
        .filter(Boolean)
    ).size,
    pendingAmount: filteredDonations
      .filter((d) => d.payment_status === "pending")
      .reduce((sum, donation) => sum + donation.amount, 0),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          <DashboardHeader 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onRefresh={handleRefresh}
            onExport={handleExport}
            onFilterToggle={handleFilterToggle}
          />
          
          <div className="space-y-6">
            {donationsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-solidario-blue" />
              </div>
            ) : (
              <>
                {/* Filtros */}
                {showFilters && <DashboardFilters onFilterChange={setFilters} />}
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsContent value="overview" className="space-y-6">
                    {/* Métricas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <DashboardCard
                        title="Total Arrecadado"
                        value={`R$ ${metrics.totalAmount.toFixed(2)}`}
                        icon={DollarSign}
                        description="Doações aprovadas"
                      />
                      <DashboardCard
                        title="Total de Doações"
                        value={metrics.totalDonations}
                        icon={TrendingUp}
                        description="Doações concluídas"
                      />
                      <DashboardCard
                        title="Doadores Únicos"
                        value={metrics.uniqueDonors}
                        icon={Users}
                        description="Pessoas diferentes"
                      />
                      <DashboardCard
                        title="Pendentes"
                        value={`R$ ${metrics.pendingAmount.toFixed(2)}`}
                        icon={Clock}
                        description="Aguardando aprovação"
                      />
                    </div>

                    {/* Gráficos */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <DonationsChart donations={filteredDonations} />
                      <DonationsPieChart donations={filteredDonations} />
                    </div>
                    
                    <DonationsLineChart donations={filteredDonations} />
                  </TabsContent>
                  
                  <TabsContent value="donations" className="space-y-6">
                    {/* Tabela de doações detalhada */}
                    <DetailedDonationsTable donations={filteredDonations} />
                  </TabsContent>
                  
                  <TabsContent value="analytics" className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">Análise de Doações</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <DonationsPieChart donations={filteredDonations} />
                          <DonationsLineChart donations={filteredDonations} />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;