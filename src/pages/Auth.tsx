import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Auth = () => {
 const { signIn, signUp, loading } = useAuth();
  const [searchParams] = useSearchParams();

  // Estado de status para o formulário de instituição
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Função de envio do formulário de instituição
  const handleInstitutionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  // Estados específicos para cadastro de instituição
  const [institutionName, setInstitutionName] = useState("");
  const [institutionDescription, setInstitutionDescription] = useState("");
  const [institutionAddress, setInstitutionAddress] = useState("");
  const [institutionPhone, setInstitutionPhone] = useState("");
  const [institutionCnpj, setInstitutionCnpj] = useState("");

  // Todos os usuários serão registrados como doadores por padrão

  // Determina a aba ativa baseada no parâmetro de URL
  const tabParam = searchParams.get('tab');
  const defaultTab = tabParam === 'register' ? 'register' :
                    tabParam === 'institution' ? 'institution' : 'login';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(email, password, {
      full_name: fullName,
      username,
      is_institution: false,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Tabs defaultValue={defaultTab} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Cadastro</TabsTrigger>
            <TabsTrigger value="institution">Instituição</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Entre na sua conta para acessar as funcionalidades da plataforma.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Lembrar-me
                      </label>
                    </div>
                    <Link to="/esqueci-senha" className="text-sm text-solidario-blue hover:underline">
                      Esqueci minha senha
                    </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
                    disabled={loading}
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro</CardTitle>
                <CardDescription>
                  Crie sua conta para começar a usar a plataforma.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Seu nome completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Nome de Usuário</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Seu nome de usuário"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {/* Opção de instituição religiosa removida - gerenciamento feito pelo backend */}
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
                    disabled={loading}
                  >
                    {loading ? "Criando conta..." : "Criar conta"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="institution">
              <Card>
                <CardHeader>
                  <CardTitle>Cadastro de Instituição</CardTitle>
                  <CardDescription>
                    Registre sua instituição religiosa para receber doações.
                  </CardDescription>
                </CardHeader>

                <form onSubmit={handleInstitutionSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="institution_name">Nome da Instituição</Label>
                      <Input
                        id="institution_name"
                        name="institution_name"
                        type="text"
                        placeholder="Nome da sua instituição"
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        name="cnpj"
                        type="text"
                        placeholder="00.000.000/0000-00"
                        value={institutionCnpj}
                        onChange={(e) => setInstitutionCnpj(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Input
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Breve descrição da instituição"
                        value={institutionDescription}
                        onChange={(e) => setInstitutionDescription(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Endereço completo"
                        value={institutionAddress}
                        onChange={(e) => setInstitutionAddress(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={institutionPhone}
                        onChange={(e) => setInstitutionPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="institution_username">Nome de Usuário</Label>
                      <Input
                        id="institution_username"
                        name="username"
                        type="text"
                        placeholder="Seu nome de usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="institution_email">Email</Label>
                      <Input
                        id="institution_email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="institution_password">Senha</Label>
                      <Input
                        id="institution_password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* Campos ocultos do FormSubmit */}
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_subject" value="Nova mensagem do site Solidário+" />
                  </CardContent>

                  <CardFooter>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
                    >
                      {status === "sending" ? "Enviando..." : "Enviar cadastro institucional"}
                    </button>

                    {/* Mensagem de status */}
                    {status === "success" && (
                      <p className="text-green-600 font-medium mt-3">
                        Solicitação de cadastro foi enviada com sucesso para a equipe do Solidário+!
                      </p>
                    )}
                    {status === "error" && (
                      <p className="text-red-600 font-medium mt-3">
                        ❌ Ocorreu um erro ao enviar sua mensagem. Tente novamente.
                      </p>
                    )}
                  </CardFooter>
                </form>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;