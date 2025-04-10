
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-solidario-blue py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-6 text-white">Entre em Contato</h1>
            <p className="text-xl text-white/90">
              Estamos aqui para ajudar. Entre em contato conosco para qualquer dúvida ou sugestão.
            </p>
          </div>
        </section>
        
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Envie uma mensagem</h2>
                <p className="text-gray-600 mb-8">
                  Preencha o formulário abaixo e entraremos em contato o mais rápido possível.
                </p>
                
                <form>
                  <FormField
                    id="name"
                    label="Nome completo"
                    placeholder="Digite seu nome completo"
                    required
                  />
                  
                  <FormField
                    id="email"
                    label="E-mail"
                    type="email"
                    placeholder="Digite seu e-mail"
                    required
                  />
                  
                  <FormField
                    id="subject"
                    label="Assunto"
                    placeholder="Digite o assunto"
                    required
                  />
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block mb-2">
                      Mensagem
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Digite sua mensagem"
                      rows={6}
                      className="w-full rounded-md"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="bg-solidario-blue hover:bg-solidario-darkBlue text-white px-8 py-3">
                    Enviar mensagem
                  </Button>
                </form>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6">Informações de Contato</h2>
                <p className="text-gray-600 mb-8">
                  Você também pode entrar em contato conosco diretamente através dos canais abaixo.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-solidario-blue/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-solidario-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-gray-600">solidariomaisdministracao@solidario.com.br</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-solidario-blue/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-solidario-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Telefone</h3>
                      <p className="text-gray-600">(11) 99999-9999</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-solidario-blue/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-solidario-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Endereço</h3>
                      <p className="text-gray-600">
                        Av. Paulista, 1000<br />
                        São Paulo, SP<br />
                        CEP 01310-100
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="font-bold mb-4">Horário de atendimento</h3>
                  <p className="text-gray-600 mb-2">Segunda a Sexta: 9h às 18h</p>
                  <p className="text-gray-600">Sábados: 9h às 13h</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
