
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const DonatorSignup = () => {
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
            <h1 className="text-3xl font-bold mb-1 text-center">Criando a sua <span className="text-solidario-blue">CONTA DOADORA</span></h1>
            <p className="text-gray-600 mb-8 text-center">Preencha os campos abaixo para criar sua conta de doador</p>
            
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  id="cpf"
                  label="Qual o seu CPF?"
                  placeholder="Insira seu CPF"
                  required
                />
                
                <FormField
                  id="phone"
                  label="Qual seu telefone?"
                  type="tel"
                  placeholder="Insira seu telefone"
                  required
                />
              </div>
              
              <FormField
                id="email"
                label="Qual o seu e-mail"
                type="email"
                placeholder="Insira seu e-mail"
                required
              />
              
              <FormField
                id="fullName"
                label="Qual o seu nome completo?"
                placeholder="Insira seu nome completo"
                required
              />
              
              <FormField
                id="cep"
                label="Qual o seu CEP?"
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

export default DonatorSignup;
