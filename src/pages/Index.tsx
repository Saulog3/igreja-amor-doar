import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import FeatureSection from "@/components/FeatureSection";
import AccountTypeCard from "@/components/AccountTypeCard";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  // Dados fictícios para o carrossel
  const carouselItems = [
    {
      id: 1,
      title: "Ajude quem precisa",
      description: "Suas doações fazem a diferença na vida de muitas pessoas.",
      image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 2,
      title: "Comunidades fortalecidas",
      description: "Apoie projetos sociais e fortaleça comunidades inteiras.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 3,
      title: "Transparência total",
      description: "Acompanhe o impacto de cada centavo doado em tempo real.",
      image: "https://maristalab.com.br/wp-content/uploads/2021/04/mlab_doacao.png",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero
          title="Conectamos pessoas generosas e instituições religiosas"
          subtitle="A plataforma que facilita doações para instituições religiosas de forma segura, transparente e eficiente."
          primaryButton={{ text: "Quero Doar", link: "/donate" }}
          secondaryButton={{ text: "Criar Doação", link: "/create-donation" }}
        />

        {/* Carrossel de imagens */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Causas em Destaque</h2>
            <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Conheça algumas das causas que estão transformando vidas com a ajuda da nossa plataforma.
            </p>
            
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {carouselItems.map((item) => (
                  <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="overflow-hidden rounded-lg bg-white shadow-md">
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-gray-600 mb-4">{item.description}</p>
                          <Button 
                            className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
                          >
                            Saiba mais
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-2">
                <CarouselPrevious className="relative inset-auto mx-2" />
                <CarouselNext className="relative inset-auto mx-2" />
              </div>
            </Carousel>
          </div>
        </section>
        
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Para quem é</h2>
            
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <img 
                  src="/lovable-uploads/novas.jpg" 
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
                  Além de fazer doações para instituições, você também pode criar uma vaquinha para causas específicas ou contribuir para campanhas já existentes. Acompanhe todas as suas doações, com datas e benefícios de cada transação, garantindo total controle sobre seu histórico de contribuições.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-2">Conta Institucional –</h4>
                  <p className="text-gray-600 mb-4">
                  Gerencie suas doações de forma eficiente, facilitando a gestão dos recursos.
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
                  "Apoie arrecadações já em andamento.",
                  "Um gráfico interativo exibe métricas detalhadas.",
                  "Visualização de valores doados, datas e benefícios de cada transação.",
                  "Histórico de contribuições acessível para monitoramento."
                ]}
                buttonText="Criar conta doadora"
                linkTo="/auth"
              />
              
              <AccountTypeCard
                title="Conta Institucional"
                description="Para igrejas e instituições religiosas que recebem doações."
                features={[
                  "Controle suas doações com um painel de análise financeira.",
                  "Acompanhamento em tempo real dos valores recebidos.",
                  "Ferramentas que auxiliam no controle dos recursos.",
                  "Gestão eficiente das doações recebidas, datas e benefícios de cada transação.",
                  "Histórico de contribuições acessível para monitoramento."
                ]}
                buttonText="Criar conta institucional"
                linkTo="/auth"
              />
            </div>
          </div>
        </div>
        
        <section className="py-16 px-6 bg-white overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-2 text-center">Depoimentos</h2>
            <p className="text-gray-600 mb-12 text-center">O que nossos usuários dizem sobre a plataforma</p>
            
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {[1, 2, 3].map((item) => (
                  <CarouselItem key={item} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="bg-gray-50 rounded-lg p-6 shadow-sm h-full">
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
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-2">
                <CarouselPrevious className="relative inset-auto mx-2" />
                <CarouselNext className="relative inset-auto mx-2" />
              </div>
            </Carousel>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
