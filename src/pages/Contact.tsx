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
            <h1 className="text-4xl font-bold mb-6 text-white">
              Entre em Contato
            </h1>
            <p className="text-xl text-white/90">
              Estamos aqui para ajudar. Entre em contato conosco para qualquer
              dúvida ou sugestão.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Envie uma mensagem</h2>
                <p className="text-gray-600 mb-8">
                  Preencha o formulário abaixo e entraremos em contato o mais
                  rápido possível.
                </p>

                <form
                  action="https://formsubmit.co/k4yo2020@gmail.com"
                  method="POST"
                  className="space-y-6"
                  >
                  {/* Campo: Nome */}
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Nome completo
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Digite seu nome completo"
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solidario-blue"
                    />
                  </div>

                  {/* Campo: E-mail */}
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Digite seu e-mail"
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solidario-blue"
                    />
                  </div>

                  {/* Campo: Assunto */}
                  <div>
                    <label htmlFor="subject" className="block mb-2 font-medium">
                      Assunto
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Digite o assunto"
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solidario-blue"
                    />
                  </div>

                  {/* Campo: Mensagem */}
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Digite sua mensagem"
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solidario-blue"
                    />
                  </div>

                  {/* Campos ocultos do FormSubmit */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_subject" value="Nova mensagem do site Solidário+" />
                  <input type="hidden" name="_next" value="https://solidariomais.com.br/obrigado" />

                  {/* Botão */}
                  <button
                    type="submit"
                    className="bg-solidario-blue hover:bg-solidario-darkBlue text-white font-medium px-8 py-3 rounded-md transition-colors"
                  >
                    Enviar mensagem
                  </button>
                </form>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Informações de Contato
                </h2>
                <p className="text-gray-600 mb-8">
                  Você também pode entrar em contato conosco diretamente através
                  dos canais abaixo.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-solidario-blue/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-solidario-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-gray-600">solidariomais@gmail.com</p>
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
                        Av. Paulista, 1000
                        <br />
                        São Paulo, SP
                        <br />
                        CEP 01310-100
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="font-bold mb-4">Horário de atendimento</h3>
                  <p className="text-gray-600 mb-2">
                    Segunda a Sexta: 9h às 18h
                  </p>
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
