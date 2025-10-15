"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/solidariomais@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error("Erro ao enviar o formulário");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* HEADER */}
        <section className="bg-solidario-blue py-16 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold mb-6 text-white">Entre em Contato</h1>
            <p className="text-xl text-white/90">
              Estamos aqui para ajudar. Entre em contato conosco para qualquer dúvida ou sugestão.
            </p>
          </div>
        </section>

        {/* FORMULÁRIO */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Envie uma mensagem</h2>
                <p className="text-gray-600 mb-8">
                  Preencha o formulário abaixo e entraremos em contato o mais rápido possível.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                  {/* Campos ocultos (opcionais do FormSubmit) */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_subject" value="Nova mensagem do site Solidário+" />

                  {/* Botão de envio */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="bg-solidario-blue hover:bg-solidario-darkBlue text-white font-medium px-8 py-3 rounded-md transition-colors disabled:opacity-50"
                  >
                    {status === "sending" ? "Enviando..." : "Enviar mensagem"}
                  </button>

                  {/* Mensagem de status */}
                  {status === "success" && (
                    <p className="text-green-600 font-medium mt-3">
                      Sua mensagem foi enviada com sucesso para a equipe do Solidário+!
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-600 font-medium mt-3">
                      ❌ Ocorreu um erro ao enviar sua mensagem. Tente novamente.
                    </p>
                  )}
                </form>
              </div>

              {/* LADO DIREITO — Informações de contato */}
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
