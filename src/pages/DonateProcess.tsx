
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Institution } from "@/types/database";

const DonateProcess = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(10);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        if (!id) {
          navigate('/donate');
          return;
        }

        // Usando 'from' com tipagem any para contornar o erro de TypeScript
        const { data, error } = await (supabase as any)
          .from("institutions")
          .select("id, name, description, logo_url")
          .eq("id", id)
          .single();

        if (error || !data) {
          throw error || new Error("Instituição não encontrada");
        }

        setInstitution(data);
      } catch (error: any) {
        toast({
          title: "Erro ao carregar instituição",
          description: error.message,
          variant: "destructive",
        });
        navigate('/donate');
      } finally {
        setLoading(false);
      }
    };

    fetchInstitution();
  }, [id, navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder para futura integração com o Mercado Pago
    toast({
      title: "Integração pendente",
      description: `Futuramente será integrado com o Mercado Pago para processar doação de R$ ${donationAmount.toFixed(2)} para ${institution?.name}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 px-6 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-gray-300 rounded w-64 mb-4 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-12 px-6">
        <div className="container mx-auto max-w-3xl">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate('/donate')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para instituições
          </Button>

          {institution && (
            <>
              <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div className="md:w-1/3">
                  <img
                    src={institution.logo_url || "https://images.unsplash.com/photo-1504675975031-96dbf10b5078?q=80&w=1770&auto=format&fit=crop"}
                    alt={institution.name}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-2/3">
                  <h1 className="text-3xl font-bold mb-2">{institution.name}</h1>
                  <p className="text-gray-600 mb-4">{institution.description}</p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Faça sua doação</CardTitle>
                  <CardDescription>
                    Escolha um valor para doar para {institution.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="donation-amount">Valor da doação (R$)</Label>
                        <Input
                          id="donation-amount"
                          type="number"
                          min="5"
                          step="5"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {[10, 20, 50, 100, 200].map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant="outline"
                            className={`${
                              donationAmount === amount
                                ? "bg-solidario-blue text-white"
                                : ""
                            }`}
                            onClick={() => setDonationAmount(amount)}
                          >
                            R$ {amount}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
                    >
                      Continuar para pagamento
                    </Button>
                    
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Em breve, a integração com o Mercado Pago estará disponível para processar sua doação com segurança.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DonateProcess;
