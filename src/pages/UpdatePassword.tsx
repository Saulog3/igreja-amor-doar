import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const UpdatePassword = () => {
  const { updatePassword, loading, user } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [linkExpired, setLinkExpired] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Verificar se há erro de OTP expirado na URL
    const hash = location.hash;
    if (hash.includes("error=access_denied") && hash.includes("error_code=otp_expired")) {
      setLinkExpired(true);
      return;
    }

    // Verificar se o usuário está autenticado via token de recuperação
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session && !linkExpired) {
        navigate("/auth");
      }
    };

    checkSession();
  }, [navigate, location.hash, linkExpired]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    await updatePassword(password);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Atualizar Senha</CardTitle>
            <CardDescription>
              {!linkExpired ? "Digite sua nova senha para atualizar." : "O link de recuperação expirou."}
            </CardDescription>
          </CardHeader>
          
          {linkExpired ? (
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Link expirado</AlertTitle>
                <AlertDescription>
                  O link de recuperação de senha expirou ou é inválido. Por favor, solicite um novo link.
                </AlertDescription>
              </Alert>
            </CardContent>
          ) : (
            <form onSubmit={handleUpdatePassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nova Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button
                  type="submit"
                  className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
                  disabled={loading}
                >
                  {loading ? "Atualizando..." : "Atualizar Senha"}
                </Button>
                <Link to="/auth" className="text-sm text-center text-solidario-blue hover:underline">
                  Voltar para o login
                </Link>
              </CardFooter>
            </form>
          )}
          
          {linkExpired && (
            <CardFooter className="flex flex-col space-y-2">
              <Button
                className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
                onClick={() => navigate("/esqueci-senha")}
              >
                Solicitar novo link
              </Button>
              <Link to="/auth" className="text-sm text-center text-solidario-blue hover:underline">
                Voltar para o login
              </Link>
            </CardFooter>
          )}
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default UpdatePassword;