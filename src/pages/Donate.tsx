
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstitutionCard from "@/components/InstitutionCard";
import { useToast } from "@/hooks/use-toast";
import { Institution } from "@/types/database";
import { Input } from "@/components/ui/input"; // 👈 certifique-se que esse componente existe
import { Search } from "lucide-react"; // 👈 ícone

const Donate = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // 👈 estado da busca
  const { toast } = useToast();

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("institutions")
          .select("id, name, description, logo_url")
          .order("name");

        if (error) throw error;
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

    fetchInstitutions();
  }, [toast]);

  // 🔍 Filtrar instituições pelo nome
  const filteredInstitutions = institutions.filter((institution) =>
    institution.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Faça uma Doação</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha uma instituição religiosa para realizar sua doação. 
              Todas as instituições abaixo foram verificadas pela nossa plataforma.
            </p>
          </div>

          {/* 🔍 Campo de busca */}
          <div className="relative flex items-center mb-10">
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // 👈 atualiza busca
              className="pl-10 rounded-full border-gray-300 w-40 md:w-64 focus:border-solidario-blue focus:ring-solidario-blue"
            />
          </div>

          {/* Renderização das instituições */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
                </div>
              ))}
            </div>
          ) : filteredInstitutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInstitutions.map((institution) => (
                <InstitutionCard
                  key={institution.id}
                  id={institution.id}
                  name={institution.name}
                  description={institution.description}
                  logoUrl={
                    institution.name.includes("Assembleia de Deus Ministério Ferreira")
                      ? "https://lh3.googleusercontent.com/proxy/jB2GLDzFw6WoCE0slkA4y7sK6BexQiw1vu0NmZIRlq6m_cexGkYB6IX8tekjKeq7Z-4fOZInhkIZzSUfQgfSNDaMjY8vgufT7nvnj3Bbw80WALqpME_zAwT86RWZknBNn9HKKShSjPZTEthWbKKr4B9Z0HN0FQURnfmTtQ=s680-w680-h510-rw"
                      : institution.name.includes("Mesquita Al-Nur")
                        ? "/lovable-uploads/mesquita.jpg"
                        : institution.logo_url
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhuma instituição encontrada.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;
