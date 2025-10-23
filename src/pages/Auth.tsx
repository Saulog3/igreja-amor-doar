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
      is_institution: false, // Todos os usuários serão registrados como doadores por padrão
    });
  };

  const handleInstitutionSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(email, password, {
      full_name: institutionName,
      username,
      is_institution: true,
      institution_description: institutionDescription,
      institution_address: institutionAddress,
      institution_phone: institutionPhone,
      institution_cnpj: institutionCnpj,
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
              <form onSubmit={handleInstitutionSignUp}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="institutionName">Nome da Instituição</Label>
                    <Input
                      id="institutionName"
                      type="text"
                      placeholder="Nome da sua instituição"
                      value={institutionName}
                      onChange={(e) => setInstitutionName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institutionCnpj">CNPJ</Label>
                    <Input
                      id="institutionCnpj"
                      type="text"
                      placeholder="00.000.000/0000-00"
                      value={institutionCnpj}
                      onChange={(e) => setInstitutionCnpj(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institutionDescription">Descrição</Label>
                    <Input
                      id="institutionDescription"
                      type="text"
                      placeholder="Breve descrição da instituição"
                      value={institutionDescription}
                      onChange={(e) => setInstitutionDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institutionAddress">Endereço</Label>
                    <Input
                      id="institutionAddress"
                      type="text"
                      placeholder="Endereço completo"
                      value={institutionAddress}
                      onChange={(e) => setInstitutionAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institutionPhone">Telefone</Label>
                    <Input
                      id="institutionPhone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={institutionPhone}
                      onChange={(e) => setInstitutionPhone(e.target.value)}
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
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
                    disabled={loading}
                  >
                    {loading ? "Criando conta..." : "Criar conta institucional"}
                  </Button>
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
