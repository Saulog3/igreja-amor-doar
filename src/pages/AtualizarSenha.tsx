import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function AtualizarSenha() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) {
          console.error("getSession:", error);
          setStatus("error");
        } else {
          setStatus("ready");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Senha deve ter ao menos 6 caracteres.");
      return;
    }
    try {
      setSubmitting(true);
      await updatePassword(password);
      // updatePassword já navega para /auth se sucesso (conforme AuthContext)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        {status === "loading" && (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processando link...</span>
          </div>
        )}

        {status === "error" && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Link inválido ou expirado</CardTitle>
              <CardDescription>
                Não foi possível processar o link de recuperação de senha.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-500">
                O link que você está tentando usar é inválido ou já expirou. 
                Por favor, solicite um novo link de recuperação de senha.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate("/auth")}
                className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
              >
                Voltar para login
              </Button>
            </CardFooter>
          </Card>
        )}

        {status === "ready" && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Atualizar senha</CardTitle>
              <CardDescription>
                Digite sua nova senha para atualizar sua conta.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nova senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <p className="text-sm text-gray-500">
                    Sua senha deve ter no mínimo 6 caracteres.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-solidario-blue hover:bg-solidario-darkBlue"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Atualizando...
                    </>
                  ) : (
                    "Atualizar senha"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}