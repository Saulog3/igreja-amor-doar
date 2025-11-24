import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DonationsTable from "@/components/dashboard/DonationsTable";
import DonationsChart from "@/components/dashboard/DonationsChart";
import DonationsPieChart from "@/components/dashboard/DonationsPieChart";
import DonationsLineChart from "@/components/dashboard/DonationsLineChart";
import DetailedDonationsTable from "@/components/dashboard/DetailedDonationsTable";
import DashboardFilters, { FilterValues } from "@/components/dashboard/DashboardFilters";
import { useDonations } from "@/hooks/useDonations";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, DollarSign, Users, TrendingUp, Clock } from "lucide-react";

const MyAccount = () => {
  const { user, profile, loading, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    full_name: "",
    website: "",
    avatar_url: "",
    newEmail: "",
    newPassword: "",
  });
  
  // const [avatarUrl, setAvatarUrl] = useState<string>("");
  const { avatarUrl, setAvatarUrl } = useAuth();
  const [institutionId, setInstitutionId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>({
    startDate: undefined,
    endDate: undefined,
    paymentStatus: undefined,
    minAmount: undefined,
    maxAmount: undefined,
  });

  const [page, setPage] = useState(1);
  const limit = 10; // registros por pági
  

  // Buscar dados de doações apenas se for uma instituição
  const { donations, metrics, loading: donationsLoading, totalCount } = useDonations(
    profile?.is_institution ? institutionId : undefined,
    page,
    limit
  );
    
  // Filtrar doações com base nos filtros aplicados
  const filteredDonations = donations.filter(donation => {
    // Filtro por status
    if (filters.paymentStatus && donation.payment_status !== filters.paymentStatus) {
      return false;
    }
    
    // Filtro por valor mínimo
    if (filters.minAmount && donation.amount < filters.minAmount) {
      return false;
    }
    
    // Filtro por valor máximo
    if (filters.maxAmount && donation.amount > filters.maxAmount) {
      return false;
    }
    
    // Filtro por data inicial
    if (filters.startDate && new Date(donation.created_at) < filters.startDate) {
      return false;
    }
    
    // Filtro por data final
    if (filters.endDate) {
      const endDateWithTime = new Date(filters.endDate);
      endDateWithTime.setHours(23, 59, 59, 999);
      if (new Date(donation.created_at) > endDateWithTime) {
        return false;
      }
    }
    
    return true;
  });

  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
    if (profile) {
      setForm({
        username: profile.username || "",
        full_name: profile.full_name || "",
        website: profile.website || "",
        avatar_url: profile.avatar_url || "",
        newEmail: "",
        newPassword: "",
      });

      const fetchAvatarUrl = async () => {
          const { data } = await supabase
            .from("institutions")
            .select("logo_url")
            .eq("profile_id", user?.id)
            .single();
          if (data) {
            setAvatarUrl(data.logo_url)
          };
        }
      
      // Se for uma instituição, buscar o ID da instituição
      if (profile.is_institution) {
        const fetchInstitutionId = async () => {
          const { data } = await supabase
            .from("institutions")
            .select("id")
            .eq("profile_id", user?.id)
            .single();
          
          if (data) {
            setInstitutionId(data.id);
          }
        };
        fetchInstitutionId();
        fetchAvatarUrl();
      }
    }
    
  }, [user, profile, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(form);
  };

  const handleUpdatePassword = async (newPassword: string) => {
    if (!newPassword) return;
    
    // Lógica para atualizar a senha do usuário
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    
    if (error) {
      console.error("Erro ao atualizar a senha:", error.message);
      alert("Não foi possível atualizar a senha. Tente novamente mais tarde.");
    } else {
      // Senha atualizada com sucesso
      setForm((prev) => ({ ...prev, newPassword: "" }));
      alert("Senha atualizada com sucesso!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-solidario-blue" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={avatarUrl|| ""} alt={profile?.username || "Usuário"} />
                      <AvatarFallback className="text-2xl">
                        {profile?.full_name?.charAt(0) || profile?.username?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle>{profile?.full_name || "Usuário"}</CardTitle>
                    <CardDescription>@{profile?.username || "usuário"}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tipo de Conta</p>
                    <p>{profile?.is_institution ? "Instituição" : "Doador"}</p>
                  </div>
                  {profile?.website && (
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-solidario-blue hover:underline">
                        {profile.website}
                      </a>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={signOut} 
                    variant="outline" 
                    className="w-full text-red-500 hover:text-red-700 border-red-500 hover:border-red-700"
                  >
                    Sair da Conta
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="w-full md:w-2/3">
              <Tabs defaultValue={profile?.is_institution ? "dashboard" : "profile"}>
                <TabsList className={`grid w-full ${profile?.is_institution ? 'grid-cols-4' : 'grid-cols-3'} mb-8`}>
                  {profile?.is_institution && (
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  )}
                  <TabsTrigger value="profile">Meu Perfil</TabsTrigger>
                  <TabsTrigger value="donations">Doações</TabsTrigger>
                  <TabsTrigger value="settings">Configurações</TabsTrigger>
                </TabsList>
                
                {profile?.is_institution && (
                  <TabsContent value="dashboard">
                    <div className="space-y-6">
                      {donationsLoading ? (
                        <div className="flex justify-center py-12">
                          <Loader2 className="h-8 w-8 animate-spin text-solidario-blue" />
                        </div>
                      ) : (
                        <>
                          {/* Filtros */}
                          <DashboardFilters onFilterChange={setFilters} />
                          
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

                          {/* Tabela de doações detalhada */}
                          <DetailedDonationsTable donations={filteredDonations} />

                        </>
                        
                      )}
                    </div>
                  </TabsContent>
                )}
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Editar Perfil</CardTitle>
                      <CardDescription>
                        Atualize suas informações pessoais.
                      </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="full_name">Nome Completo</Label>
                          <Input
                            id="full_name"
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Nome de Usuário</Label>
                          <Input
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="avatar_url">URL da Imagem de Perfil</Label>
                          <Input
                            id="avatar_url"
                            name="avatar_url"
                            value={form.avatar_url}
                            onChange={handleChange}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          type="submit"
                          className="bg-solidario-blue hover:bg-solidario-darkBlue"
                          disabled={loading}
                        >
                          {loading ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>
                
                <TabsContent value="donations">
                  <Card>
                    <CardHeader>
                      <CardTitle>Minhas Doações</CardTitle>
                      <CardDescription>
                        {profile?.is_institution 
                          ? "Doações recebidas pela sua instituição."
                          : "Histórico de suas contribuições."
                        }
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {profile?.is_institution ? (
                        donationsLoading ? (
                          <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-solidario-blue" />
                          </div>
                        ) : (
                          <DetailedDonationsTable donations={donations} />
                        )
                      ) : (
                        
                        <div className="text-center py-12">
                          <p className="text-gray-500">Você ainda não fez nenhuma doação.</p>
                          <Button
                            className="mt-4 bg-solidario-blue hover:bg-solidario-darkBlue"
                            onClick={() => navigate("/donate")}
                          >
                            Fazer uma doação
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configurações da Conta</CardTitle>
                      <CardDescription>
                        Gerencie as configurações da sua conta.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={user?.email || ""}
                          disabled
                        />
                        <p className="text-xs text-gray-500">Para alterar seu email, entre em contato com o suporte.</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                          id="password"
                          type="password"
                          value={form.newPassword || ""}
                          placeholder="Digite sua nova senha"
                          onChange={(e) => setForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                          className="cursor-text"
                        />
                        <Button
                          className="bg-solidario-blue hover:bg-solidario-darkBlue"
                          onClick={() => handleUpdatePassword(form.newPassword)}
                        >
                          Alterar Senha
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyAccount;
