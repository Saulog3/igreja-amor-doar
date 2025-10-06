
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstitutionCard from "@/components/InstitutionCard";
import { useToast } from "@/hooks/use-toast";
import { Institution } from "@/types/database";

const Donate = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        // Usando 'from' com tipagem any para contornar o erro de TypeScript
        // enquanto o Supabase não atualiza os tipos automaticamente
        const { data, error } = await (supabase as any)
          .from("institutions")
          .select("id, name, description, logo_url")
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

    fetchInstitutions();
  }, [toast]);

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
          ) : institutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {institutions.map((institution) => (
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
