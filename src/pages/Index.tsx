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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

const Index = () => {
  const [selectedCause, setSelectedCause] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openCauseDetails = (cause: any) => {
    setSelectedCause(cause);
    setDialogOpen(true);
  };
  // Dados fictícios para o carrossel
  const carouselItems = [
    {
      id: 1,
      title: "Ajude quem precisa",
      description:
        "Suas doações fazem a diferença na vida de muitas pesssoas, ajudar com aquelas que enfrentam momentos de dificuldade.",
      detailedDescription:
        "Através do seu apoio, podemos fornecer recursos essenciais como alimentos, roupas, medicamentos e abrigo para pessoas em situação de vulnerabilidade. Cada doação, independente do valor, contribui para transformar vidas e oferecer esperança àqueles que mais precisam. Nossos projetos atendem desde famílias em situação de pobreza até pessoas em situação de rua, garantindo dignidade e apoio em momentos difíceis.",
      image:
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 2,
      title: "Comunidades fortalecidas",
      description:
        "Apoiar iniciativas que incentivam o desenvolvimento coletivo, como projetos comunitários.",
      detailedDescription:
        "Quando a comunidade se fortalece, todos crescem juntos. Essa causa promove união, geração de renda e oportunidades, transformando bairros em espaços mais justos, acolhedores e cheios de esperança.",
      image:
        "https://images.unsplash.com/photo-1593113598332-cd59a0c3a9a1?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 3,
      title: "Tecnologia",
      description:
        "Disponibilizar equipamentos, internet e treinamentos para jovens e adultos que buscam ingressar no mercado digital.",
      detailedDescription:
        "A inclusão digital é fundamental para reduzir desigualdades no mundo contemporâneo. Nosso programa de tecnologia oferece acesso a computadores, conexão de internet de qualidade e cursos de capacitação em habilidades digitais. Jovens e adultos de comunidades carentes recebem formação em programação, design, marketing digital e outras competências valorizadas no mercado de trabalho, abrindo portas para novas oportunidades profissionais e transformação social através da tecnologia.",
      image:
        "https://maristalab.com.br/wp-content/uploads/2021/04/mlab_doacao.png",
    },
    {
      id: 4,
      title: "Educação para todos",
      description:
        "Ajude a proporcionar acesso à educação para crianças em situação de vulnerabilidade.",
      detailedDescription:
        "A educação é a base para um futuro melhor. Nosso programa educacional atende crianças e adolescentes em situação de vulnerabilidade social, oferecendo reforço escolar, atividades culturais, esportivas e artísticas que complementam o ensino formal. Também fornecemos material escolar, uniformes e apoio pedagógico para garantir que todos tenham condições de aprender e se desenvolver plenamente, independentemente de sua condição socioeconômica.",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 5,
      title: "Alimentação solidária",
      description:
        "Contribua para que famílias em situação de insegurança alimentar tenham acesso a refeições diárias.",
      detailedDescription:
        "A fome é uma realidade para milhões de brasileiros. Nosso programa de alimentação solidária distribui cestas básicas, organiza cozinhas comunitárias e promove hortas urbanas para garantir que famílias em situação de vulnerabilidade tenham acesso a alimentos nutritivos e de qualidade. Também realizamos oficinas de educação alimentar e nutricional, ensinando sobre aproveitamento integral dos alimentos e alimentação saudável com baixo custo.",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 6,
      title: "Saúde e bem-estar",
      description:
        "Apoie projetos que levam atendimento médico e cuidados básicos de saúde a comunidades carentes.",
      detailedDescription:
        "O acesso à saúde é um direito de todos. Nossos projetos de saúde e bem-estar incluem atendimento médico itinerante em comunidades de difícil acesso, campanhas de prevenção de doenças, distribuição de medicamentos e promoção de hábitos saudáveis. Contamos com profissionais voluntários de diversas especialidades que dedicam seu tempo e conhecimento para cuidar daqueles que têm dificuldade em acessar serviços de saúde convencionais.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 7,
      title: "Moradia digna",
      description:
        "Ajude a construir e reformar moradias para famílias em situação de vulnerabilidade social.",
      detailedDescription:
        "Ter um lar seguro e digno é fundamental para o bem-estar de qualquer família. Nosso programa de moradia trabalha na construção e reforma de casas para famílias em situação de vulnerabilidade, melhorando condições de habitabilidade, segurança estrutural e saneamento básico. Utilizamos técnicas de construção sustentável e envolvemos os próprios beneficiários no processo, fortalecendo o senso de comunidade e pertencimento.",
      image:
        "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 8,
      title: "Meio ambiente",
      description:
        "Contribua com projetos de preservação ambiental e desenvolvimento sustentável em comunidades.",
      detailedDescription:
        "A preservação ambiental e o desenvolvimento sustentável são essenciais para garantir um futuro melhor para todos. Nossos projetos ambientais incluem reflorestamento de áreas degradadas, educação ambiental em escolas e comunidades, implementação de sistemas de energia renovável e gestão de resíduos. Trabalhamos para conscientizar sobre a importância da conservação dos recursos naturais e promover práticas sustentáveis que beneficiem tanto o meio ambiente quanto as comunidades locais.",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000",
    },
    {
      id: 9,
      title: "Inclusão digital",
      description:
        "Apoie iniciativas que promovem acesso à tecnologia e inclusão digital para jovens e adultos.",
      detailedDescription:
        "Em um mundo cada vez mais conectado, a inclusão digital é fundamental para reduzir desigualdades. Nosso programa de inclusão digital oferece cursos de informática básica e avançada, acesso a computadores e internet, e capacitação em ferramentas digitais essenciais para o mercado de trabalho. Atendemos jovens e adultos de comunidades carentes, idosos e pessoas com deficiência, promovendo autonomia e novas oportunidades através da tecnologia.",
      image:
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=1000",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Modal de detalhes da causa */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedCause && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedCause.title}
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {selectedCause.description}
                </DialogDescription>
              </DialogHeader>

              <div className="my-4">
                <div className="h-48 overflow-hidden rounded-md mb-4">
                  <img
                    src={selectedCause.image}
                    alt={selectedCause.title}
                    className="w-full h-48 object-cover object-center"
                  />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {selectedCause.detailedDescription}
                </p>
              </div>

              <DialogFooter>
                <Button
                  className="bg-solidario-blue hover:bg-solidario-darkBlue"
                  onClick={() => setDialogOpen(false)}
                >
                  Fechar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

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
            <h2 className="text-3xl font-bold mb-6 text-center">
              Causas em Destaque
            </h2>
            <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Conheça algumas das causas que estão transformando vidas com a
              ajuda da nossa plataforma.
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
                  <CarouselItem
                    key={item.id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <div className="overflow-hidden rounded-lg bg-white shadow-md">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover object-center"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {item.description}
                          </p>
                          <Button
                            className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
                            onClick={() => openCauseDetails(item)}
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
            <h2 className="text-3xl font-bold mb-12 text-center">
              Para quem é
            </h2>

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
                  <h3 className="text-2xl font-bold mb-4">
                    Na Solidario+, transparência e controle são prioridades.
                  </h3>
                  <p className="text-gray-600">
                    Por isso, tanto doadores quanto instituições têm acesso a
                    análises detalhadas para acompanhar suas transações de forma
                    clara e intuitiva.
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-2">Conta Doadora –</h4>
                  <p className="text-gray-600 mb-4">
                    Além de fazer doações para instituições, você também pode
                    criar uma vaquinha para causas específicas ou contribuir
                    para campanhas já existentes. Acompanhe todas as suas
                    doações, com datas e benefícios de cada transação,
                    garantindo total controle sobre seu histórico de
                    contribuições.
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-2">
                    Conta Institucional –
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Gerencie suas doações de forma eficiente, facilitando a
                    gestão dos recursos.
                  </p>
                </div>

                <p className="text-gray-600 mb-8">
                  Junte-se à Solidario+ e transforme vidas com apenas alguns
                  cliques!
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/donate">
                    <Button className="bg-solidario-blue hover:bg-solidario-darkBlue text-white px-8 py-2">
                      Quero Doar
                    </Button>
                  </Link>

                  <Link to="/create-donation">
                    <Button
                      variant="outline"
                      className="border-solidario-blue text-solidario-blue hover:bg-solidario-lightBlue/10 px-8 py-2"
                    >
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
            <h2 className="text-3xl font-bold mb-12 text-center">
              Tipos de Conta
            </h2>

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
                  "Histórico de contribuições acessível para monitoramento.",
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
                  "Histórico de contribuições acessível para monitoramento.",
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
            <p className="text-gray-600 mb-12 text-center">
              O que nossos usuários dizem sobre a plataforma
            </p>

            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {[1, 2, 3].map((item) => (
                  <CarouselItem
                    key={item}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <div className="bg-gray-50 rounded-lg p-6 shadow-sm h-full">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-solidario-blue rounded-full flex items-center justify-center text-white font-bold">
                            {item}
                          </div>
                          <div className="ml-4">
                            <h4 className="font-bold">Nome da Pessoa</h4>
                            <p className="text-sm text-gray-600">
                              Doador / Instituição
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700">
                          "A plataforma Solidario+ mudou a forma como fazemos
                          doações. É fácil, seguro e transparente. Consigo
                          acompanhar todas as minhas contribuições e ver o
                          impacto que estou causando."
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
