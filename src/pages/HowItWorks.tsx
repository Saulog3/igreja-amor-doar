
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureSection from "@/components/FeatureSection";

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-solidario-blue py-16 px-6">
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

export default HowItWorks;
