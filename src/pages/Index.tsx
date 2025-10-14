import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1000",
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

        {/* Elfsight AI Chatbot Component */}
        <div className="elfsight-app-0b0d22bf-44d7-4067-975c-7666a6cffcd6" data-elfsight-app-lazy></div>

        {/* Carrossel de imagens */}
        <div className="elfsight-app-0b0d22bf-44d7-4067-975c-7666a6cffcd6" data-elfsight-app-lazy></div>

        {/* Carrossel de imagens */}
        <section className="py-16 px-6 bg-gray-50" id="destaque">
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
              <div className="flex-1 relative overflow-hidden rounded-lg">
                <div className="carousel-container h-[300px]">
                  {[
                    "/lovable-uploads/novas.jpg",
                    "/lovable-uploads/espirita.jpg",
                    "/lovable-uploads/mesquita.jpg",
                    "/lovable-uploads/paz.jpg",
                    "/lovable-uploads/pessoas.jpg"
                  ].map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Imagem ${index + 1}`}
                      className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg carousel-slide-${index}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">
                    Na Solidario+, transparência e controle são prioridades.
                  </h3>
                  <p className="text-gray-600">
                    Por isso, tanto doadores quanto instituições têm acesso a análises detalhadas,
                    permitindo acompanhar todas as transações de forma clara, intuitiva e segura.
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-2">Conta Doadora</h4>
                  <p className="text-gray-600 mb-4">
                    Contribua com instituições religiosas e causas solidárias já cadastradas na plataforma.
                    Você pode realizar doações, acompanhar seus valores, datas e benefícios e visualizar 
                    métricas detalhadas sobre suas contribuições, tudo reunido em um histórico completo 
                    para garantir total transparência.
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-2">
                    Conta Institucional
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Receba e gerencie doações de forma eficiente com um painel exclusivo de análise financeira.
                    Acompanhe valores em tempo real, visualize métricas e mantenha o controle total dos recursos recebidos.
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
                  {false && (
                    <Link to="/create-donation">
                      <Button
                        variant="outline"
                        className="border-solidario-blue text-solidario-blue hover:bg-solidario-lightBlue/10 px-8 py-2"
                      >
                        Criar Doação
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="flex-grow" >
          <section className="bg-solidario-blue py-16 px-6" id="como_funciona">
            <div className="container mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold mb-6 text-white">Como Funciona</h1>
              <p className="text-xl text-white/90 mb-8">
                Entenda como a Solidario+ conecta doadores e instituições religiosas de forma simples, transparente e eficiente.
              </p>
            </div>
          </section>
          
          <FeatureSection
            title="Para Doadores"
            subtitle="Como você pode contribuir e acompanhar suas doações"
            items={[
              {
                title: "Crie sua conta",
                description: "Registre-se em menos de 2 minutos com seus dados."
              },
              {
                title: "Escolha como doar",
                description: "Doe diretamente para a instituição que você faz parte."
              },
              {
                title: "Faça sua doação",
                description: "Escolha o valor e a forma de pagamento de sua preferência."
              },
              {
                title: "Acompanhe o impacto",
                description: "Visualize todas as suas doações e o impacto que você está causando."
              },
              {
                title: "Receba comprovantes",
                description: "Obtenha comprovantes fiscais e recibos para suas contribuições."
              },
              {
                title: "Compartilhe",
                description: "Convide amigos e família para apoiar causas importantes."
              }
            ]}
          />
          
          <FeatureSection
            title="Para Instituições"
            subtitle="Como sua instituição pode ser cadastrada em nossa plataforma, e receber e gerenciar doações"
            className="bg-gray-50"
            items={[
              {
                title: "Como se cadastrar",
                description: "A instituição deve preencher um formulário de solicitação."
              },
              {
                title: "Como tenho acesso",
                description: "Após a aprovação, o Solidário+ enviará o login e senha de acesso."
              },
              {
                title: "Crie doações",
                description: "Lance doações específicas para projetos ou necessidades especiais."
              },
              {
                title: "Receba doações",
                description: "Comece a receber doações de pessoas em todo o país."
              },
              {
                title: "Gerencie recursos",
                description: "Use nosso painel para acompanhar entradas e administrar recursos."
              },
              {
                title: "Compartilhe os resultados",
                description: "Compartilhe atualizações e resultados com seus apoiadores."
              }
            ]}
          />
        </main>

        <div className="bg-gray-50 py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Tipos de Conta
            </h2>

            <div className="flex flex-col md:flex-row gap-10 justify-center">
              <AccountTypeCard
                title="Conta Doadora"
                description="Destinada a pessoas que desejam contribuir com causas e instituições já cadastradas na plataforma."
                features={[
                  "Faça doações diretamente para instituições de religiosas.",
                  "Explore e apoie arrecadações em andamento.",
                  "Navegue pelas páginas de diferentes religiões e causas.",
                  "Acompanhe suas contribuições em um histórico detalhado.",
                  "Veja gráficos interativos com métricas sobre suas doações.",
                  "Consulte valores doados, datas e benefícios de cada transação.",
                ]}
                buttonText="Criar conta doadora"
                linkTo="/auth?tab=register"
              />

              <AccountTypeCard
                title="Conta Institucional"
                description="Destinada a instituições religiosas que desejam receber doações por meio do Solidário+."
                features={[
                  "Controle suas doações com um painel de análise financeira.",
                  "Crie e receba doações diretamente pela plataforma Solidário+.",
                  "Acompanhe em tempo real os valores arrecadados.",
                  "Tenha acesso a um painel de análise financeira (dashboard) exclusivo.",
                  "Visualize métricas detalhadas sobre transações, valores e datas.",
                  "Consulte o histórico completo de doações recebidas."
                ]}
                buttonText="Criar conta institucional"
                linkTo="/auth?tab=institution"
              />
            </div>
          </div>
        </div>

        <section className="py-16 px-6 bg-white overflow-hidden" id="depoimentos">
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
                {[
                  {
                    name: "Maria Santos",
                    role: "Doadora",
                    institution: "Igreja Nossa Senhora da Paz",
                    testimonial: "A plataforma Solidario+ mudou a forma como fazemos doações. É fácil, seguro e transparente. Consigo acompanhar todas as minhas contribuições e ver o impacto que estou causando.",
                    initial: "M"
                  },
                  {
                    name: "João Silva",
                    role: "Doador",
                    institution: "Igreja Batista Esperança",
                    testimonial: "Excelente plataforma! Finalmente posso doar com segurança e transparência. O sistema de acompanhamento das doações é fantástico e me dá confiança total.",
                    initial: "J"
                  },
                  {
                    name: "Ana Costa",
                    role: "Doadora",
                    institution: "Igreja Metodista Central",
                    testimonial: "Uso a plataforma há 6 meses e estou muito satisfeita. É muito prático poder fazer doações online e receber relatórios detalhados de como meu dinheiro está sendo usado.",
                    initial: "A"
                  },
                  {
                    name: "Carlos Oliveira",
                    role: "Pastor",
                    institution: "Igreja Assembleia de Deus",
                    testimonial: "Como pastor, posso dizer que esta plataforma revolucionou nossa gestão de doações. Temos total transparência e nossos fiéis confiam mais no processo.",
                    initial: "C"
                  },
                  {
                    name: "Fernanda Lima",
                    role: "Doadora",
                    institution: "Igreja Católica São José",
                    testimonial: "Simplesmente perfeita! A interface é intuitiva e o processo de doação é muito seguro. Recomendo para todos que querem contribuir de forma responsável.",
                    initial: "F"
                  },
                  {
                    name: "Roberto Mendes",
                    role: "Tesoureiro",
                    institution: "Igreja Presbiteriana do Brasil",
                    testimonial: "A transparência oferecida pela plataforma é impressionante. Como tesoureiro da igreja, posso gerenciar todas as doações de forma eficiente e clara.",
                    initial: "R"
                  }
                ].map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <div className="bg-gray-50 rounded-lg p-6 shadow-sm h-full">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-solidario-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {testimonial.initial}
                          </div>
                          <div className="ml-4">
                            <h4 className="font-bold">{testimonial.name}</h4>
                            <p className="text-sm text-gray-600">
                              {testimonial.role} - {testimonial.institution}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700">
                          "{testimonial.testimonial}"
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

        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-2">Quais são as taxas cobradas?</h3>
                <p className="text-gray-600">
                  A Solidario+ cobra uma pequena taxa administrativa de 5% sobre cada doação para manter a plataforma funcionando. Taxas de processamento de pagamento são cobradas separadamente pelos nossos parceiros de pagamento.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-2">Como posso fazer uma doação recorrente?</h3>
                <p className="text-gray-600">
                  Ao fazer sua doação, você pode marcar a opção "Doação mensal" e escolher o período desejado. Você pode cancelar ou modificar suas doações recorrentes a qualquer momento em seu painel.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-2">Minha instituição religiosa precisa ter CNPJ?</h3>
                <p className="text-gray-600">
                  Sim, para receber doações através da plataforma, sua instituição precisa ter um CNPJ válido e documentação que comprove sua legitimidade.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-2">Como são feitos os repasses para as instituições?</h3>
                <p className="text-gray-600">
                  Os repasses são feitos automaticamente a cada 15 dias para a conta bancária cadastrada pela instituição, descontadas as taxas aplicáveis.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-bold mb-2">Posso fazer doações anônimas?</h3>
                <p className="text-gray-600">
                  Sim, você pode escolher a opção de doação anônima ao fazer sua contribuição. Seus dados pessoais não serão compartilhados com a instituição beneficiada.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
