
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Institution } from "@/types/database";
import { PlusCircle } from "lucide-react";
import InstitutionTable from "@/components/admin/InstitutionTable";
import AddInstitutionDialog from "@/components/admin/AddInstitutionDialog";
import { useAuth } from "@/contexts/AuthContext";

const Admin = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  
  // Redirecionar se o usuário não estiver autenticado ou não for admin
  useEffect(() => {
    if (!user) {
      toast({
        title: "Acesso restrito",
        description: "Você precisa estar logado para acessar esta página.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!isAdmin()) {
      toast({
        title: "Acesso negado",
        description: "Apenas administradores podem acessar esta página.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, navigate, toast, isAdmin]);

  const fetchInstitutions = async () => {
    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from("institutions")
        .select("*")
        .order("name");

      if (error) {
        throw error;
      }

      setInstitutions(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar instituições",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const handleAddSuccess = () => {
    setDialogOpen(false);
    fetchInstitutions();
    toast({
      title: "Instituição adicionada",
      description: "A instituição foi adicionada com sucesso.",
    });
  };

  const handleDeleteSuccess = () => {
    fetchInstitutions();
    toast({
      title: "Instituição removida",
      description: "A instituição foi removida com sucesso.",
    });
  };

  const handleUpdateSuccess = () => {
    fetchInstitutions();
    toast({
      title: "Instituição atualizada",
      description: "A instituição foi atualizada com sucesso.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Administração de Instituições</h1>
              <p className="text-gray-600 mt-2">
                Gerencie as instituições cadastradas na plataforma
              </p>
            </div>
            <Button 
              onClick={() => setDialogOpen(true)}
              className="bg-solidario-blue hover:bg-solidario-darkBlue"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Instituição
            </Button>
          </div>

          <InstitutionTable 
            institutions={institutions}
            loading={loading}
            onDeleteSuccess={handleDeleteSuccess}
            onUpdateSuccess={handleUpdateSuccess}
          />

          <AddInstitutionDialog 
            open={dialogOpen} 
            onOpenChange={setDialogOpen}
            onSuccess={handleAddSuccess} 
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
