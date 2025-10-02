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
import { stringify } from "querystring";
// Removendo importação do uuid que estava causando erro


const DonateProcess = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(10);
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        if (!id) {
          navigate('/donate');
          return;
        }

        const { data, error } = await supabase
          .from("institutions")
          .select("id, name, description, logo_url")
          .eq("id", id)
          .single();

        if (error || !data) {
          throw error || new Error("Instituição não encontrada");
        }

        console.log('Instituição encontrada:', data);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      console.log('Iniciando processo de doação...');

      
      // Gerando um ID único sem depender do pacote uuid
      const paymentID = `payment-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        // Agora registrar a doação no banco com o payment_id
      const { data: donationData, error: donationError } = await supabase
        .from("donations")
        .insert({
          institution_id: id!,
          amount: donationAmount,
          donor_name: donorName || null,
          donor_email: donorEmail || null,
          payment_method: 'mercado_pago',
          payment_status: 'pending',
          payment_id: paymentID
        })
        .select()
        .single();

      if (donationError) {
        console.error('Erro ao registrar doação:', donationError);
        throw donationError;
      }

      console.log('Doação registrada:', donationData);

      toast({
        title: "Doação iniciada!",
        description: `Sua doação de R$ ${donationAmount.toFixed(2)} foi enviada para processamento.`,
      });
      
      // Primeiro, processar o pagamento no Mercado Pago
      const response = await fetch("https://65d5psjqh3.execute-api.sa-east-1.amazonaws.com/prod/mercado_pago", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          unit_price: donationAmount,
          external_reference: `${id}-${Date.now()}`, // Usar uma referência única temporária
        }),
      });

      console.log('Resposta do Mercado Pago:', response);

      if (!response.ok) {
        await updatePayment(paymentID, 'cancelled');
        throw new Error("Erro ao processar doação");
      }

      const paymentData = await response.json();
      console.log('Dados do pagamento:', paymentData);

      if (!paymentData.response || !paymentData.response.init_point) {
        console.error("init_point não encontrado na resposta");
        throw new Error("Erro na configuração do pagamento");
      }



      // Redirecionar para o Mercado Pago
      window.location.href = paymentData.response.init_point;
      
    } catch (error: any) {
      console.error('Erro no processo de doação:', error);
      toast({
        title: "Erro ao doar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="donor-name">Nome (opcional)</Label>
                        <Input
                          id="donor-name"
                          type="text"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Seu nome"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="donor-email">E-mail (opcional)</Label>
                        <Input
                          id="donor-email"
                          type="email"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="seu@email.com"
                          className="mt-1"
                        />
                      </div>
                    </div>

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
                          required
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
                      disabled={submitting}
                    >
                      {submitting ? "Processando..." : "Continuar para pagamento"}
                    </Button>
                    
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Você será redirecionado para o Mercado Pago para completar o pagamento com segurança.
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

const updatePayment = async (paymentId: string, status: string) => {
  const { data, error } = await supabase
    .from('donations')
    .update({ payment_status: status as "pending" | "approved" | "rejected" | "cancelled" | "refunded" })
    .eq('payment_id', paymentId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar pagamento:', error);
    throw error;
  }

  return data;
};

export default DonateProcess;
