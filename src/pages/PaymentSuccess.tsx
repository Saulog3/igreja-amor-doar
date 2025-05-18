
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  
  // Opcional: registrar o sucesso do pagamento
  useEffect(() => {
    console.log("Pagamento bem-sucedido");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-6 bg-gray-50">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-lg border-0">
            <CardContent className="pt-6 px-6 pb-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold mb-2">Doação Realizada com Sucesso!</h1>
              
              <p className="text-gray-600 mb-6">
                Sua doação foi processada com sucesso. Agradecemos por sua generosidade e apoio.
              </p>
              
              <div className="space-y-3 w-full">
                <Button 
                  className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
                  onClick={() => navigate('/donate')}
                >
                  Fazer outra doação
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/')}
                >
                  Voltar para a página inicial
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

export default PaymentSuccess;
