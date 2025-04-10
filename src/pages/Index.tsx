
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import FeatureSection from "@/components/FeatureSection";
import AccountTypeCard from "@/components/AccountTypeCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero
          title="Conectamos pessoas generosas e instituições religiosas"
          subtitle="A plataforma que facilita doações para igrejas e instituições religiosas de forma segura, transparente e eficiente."
          primaryButton={{ text: "Quero Doar", link: "/donate" }}
          secondaryButton={{ text: "Criar Doação", link: "/create-donation" }}
        />
        
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Para quem é</h2>
            
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <img 
                  src="/public/lovable-uploads/1dc204c6-0274-4313-ad08-a9d9f2171a69.png" 
                  alt="Pessoas solidárias" 
                  className="rounded-lg w-full"
                />
              </div>
              
              <div className="flex-1">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Na Solidario+, transparência e controle são prioridades.</h3>
                  <p className="text-gray-600">
                    Por isso, tanto doadores quanto instituições têm acesso a análises detalhadas para acompanhar suas transações de forma clara e intuitiva.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-2">Conta Doadora –</h4>
                  <p className="text-gray-600 mb-4">
                    Além de fazer doações para instituições, você também pode criar uma vaquinha para causas específicas ou contribuir para campanhas já existentes. Acompanhe todas as suas doações com um gráfico interativo, que exibe métricas detalhadas, como valores doados, datas e benefícios de cada transação, garantindo total controle sobre seu histórico de contribuições.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-2">Conta Institucional –</h4>
                  <p className="text-gray-600 mb-4">
                    Gerencie suas doações de forma eficiente com um painel de análise financeira, que mostra os valores de entrada em tempo real. Além disso, um gráfico detalhado permite visualizar a evolução dos recebimentos, facilitando a gestão dos recursos.
                  </p>
                </div>
                
                <p className="text-gray-600 mb-8">
                  Junte-se à Solidario+ e transforme vidas com apenas alguns cliques!
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link to="/donate">
                    <Button className="bg-solidario-blue hover:bg-solidario-darkBlue text-white px-8 py-2">
                      Quero Doar
                    </Button>
                  </Link>
                  
                  <Link to="/create-donation">
                    <Button variant="outline" className="border-solidario-blue text-solidario-blue hover:bg-solidario-lightBlue/10 px-8 py-2">
                      Criar Doação
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="bg-gray-50 py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Tipos de Conta</h2>
            
            <div className="flex flex-col md:flex-row gap-10 justify-center">
              <AccountTypeCard
                title="Conta Doadora"
                description="Para pessoas que desejam fazer doações ou criar campanhas."
                features={[
                  "Você pode doar diretamente para instituições de caridade.",
                  "Possibilidade de iniciar uma campanha para uma causa específica.",
                  "Apoiar arrecadações já em andamento.",
                  "Um gráfico interativo exibe métricas detalhadas.",
                  "Visualização de valores doados, datas e benefícios de cada transação.",
                  "Histórico de contribuições acessível para monitoramento."
                ]}
                buttonText="Criar conta doadora"
                linkTo="/donator-signup"
              />
              
              <AccountTypeCard
                title="Conta Institucional"
                description="Para igrejas e instituições religiosas que recebem doações."
                features={[
                  "Controle suas doações com um painel de análise financeira.",
                  "Acompanhamento em tempo real dos valores recebidos.",
                  "Visualize a evolução dos recebimentos com gráfico detalhado.",
                  "Ferramentas que auxiliam no controle dos recursos.",
                  "Gestão eficiente das doações recebidas.",
                  "Histórico completo de transações."
                ]}
                buttonText="Criar conta institucional"
                linkTo="/institution-signup"
              />
            </div>
          </div>
        </div>
        
        <section className="py-16 px-6 bg-white overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-2 text-center">Depoimentos</h2>
            <p className="text-gray-600 mb-12 text-center">O que nossos usuários dizem sobre a plataforma</p>
            
            <div className="flex space-x-6 overflow-x-auto pb-6 snap-x">
              {[1, 2, 3].map((item) => (
                <div key={item} className="min-w-[300px] md:min-w-[400px] bg-gray-50 rounded-lg p-6 shadow-sm snap-center">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-solidario-blue rounded-full flex items-center justify-center text-white font-bold">
                      {item}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold">Nome da Pessoa</h4>
                      <p className="text-sm text-gray-600">Doador / Instituição</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "A plataforma Solidario+ mudou a forma como fazemos doações. É fácil, seguro e transparente. Consigo acompanhar todas as minhas contribuições e ver o impacto que estou causando."
                  </p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
