
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const PaymentError = () => {
  const navigate = useNavigate();
  
  // Opcional: registrar o erro do pagamento
  useEffect(() => {
    console.log("Erro no pagamento");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-6 bg-gray-50">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-lg border-0">
            <CardContent className="pt-6 px-6 pb-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <X className="h-8 w-8 text-red-600" />
              </div>
              
              <h1 className="text-2xl font-bold mb-2">Oops! Ocorreu um Problema</h1>
              
              <p className="text-gray-600 mb-4">
                Parece que houve um problema ao processar sua doação.
              </p>
              
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Erro no processamento</AlertTitle>
                <AlertDescription>
                  O pagamento não pôde ser concluído. Por favor, tente novamente ou use outro método de pagamento.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3 w-full">
                <Button 
                  className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
                  onClick={() => window.history.back()}
                >
                  Tentar novamente
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/donate')}
                >
                  Voltar para doações
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentError;
