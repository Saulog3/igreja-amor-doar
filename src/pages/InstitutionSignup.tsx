
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const InstitutionSignup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto max-w-xl">
          <Link to="/" className="flex items-center text-solidario-blue mb-8">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Voltar</span>
          </Link>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-1 text-center">Criando a sua <span className="text-solidario-blue">CONTA INSTITUCIONAL</span></h1>
            <p className="text-gray-600 mb-8 text-center">Preencha os campos abaixo para criar sua conta institucional</p>
            
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  id="cnpj"
                  label="Qual o CNPJ?"
                  placeholder="Insira o CNPJ"
                  required
                />
                
                <FormField
                  id="phone"
                  label="Qual o telefone?"
                  type="tel"
                  placeholder="Insira o telefone"
                  required
                />
              </div>
              
              <FormField
                id="email"
                label="Qual o e-mail da Instituição?"
                type="email"
                placeholder="Insira o e-mail"
                required
              />
              
              <FormField
                id="institutionName"
                label="Qual o nome da Instituição?"
                placeholder="Insira o nome da Instituição"
                required
              />
              
              <FormField
                id="cep"
                label="Qual o CEP?"
                placeholder="Insira seu CEP"
                required
              />
              
              <div className="mt-8">
                <Button type="submit" className="bg-solidario-blue hover:bg-solidario-darkBlue text-white px-8 py-3 w-full">
                  Criar conta
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InstitutionSignup;
