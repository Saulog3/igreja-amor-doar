import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type ProfileType = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  email: string | null;
  website: string | null;
  created_at: string | null;
  updated_at: string | null;
  is_institution: boolean | null;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: ProfileType | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, data: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateProfile: (data: Partial<ProfileType>) => Promise<void>;
  isAdmin: () => boolean;

  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Primeiro configura o listener para mudanças no estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Se houve mudança de estado, carrega o perfil
        if (currentSession?.user && event !== 'INITIAL_SESSION') {
          // Usa setTimeout para evitar deadlock
          setTimeout(() => {
            fetchProfile(currentSession.user.id);
          }, 0);
        }
      }
    );

    // Depois verifica se já existe uma sessão
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Erro ao buscar perfil:", error);
      } else {
        setProfile(data as ProfileType);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Erro ao fazer login: " + error.message);
      } else {
        toast.success("Login realizado com sucesso!");
        navigate("/minha-conta");
      }
    } catch (error: any) {
      toast.error("Erro ao fazer login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, data: any) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: data.full_name,
            username: data.username || email.split("@")[0],
            is_institution: data.is_institution || false,
            // Dados específicos da instituição (se aplicável)
            ...(data.is_institution && {
              institution_description: data.institution_description,
              institution_address: data.institution_address,
              institution_phone: data.institution_phone,
              institution_cnpj: data.institution_cnpj,
            }),
          },
        },
      });

      if (error) {
        toast.error("Erro ao criar conta: " + error.message);
        throw error; // Lança o erro para ser capturado no componente
      }

      if (data.is_institution) {
        toast.success("Solicitação de conta institucional enviada! Verifique seu email para confirmar o cadastro.");
      } else {
        toast.success("Conta criada com sucesso! Verifique seu email para confirmar o cadastro.");
      }
      
      // Não navegar automaticamente para permitir que a mensagem seja exibida
      if (!data.is_institution) {
        navigate("/auth");
      }
    } catch (error: any) {
      toast.error("Erro ao criar conta: " + error.message);
      throw error; // Re-lança o erro para ser capturado no componente
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast.error("Erro ao fazer logout: " + error.message);
      } else {
        // Limpar o estado explicitamente após o logout
        setUser(null);
        setSession(null);
        setProfile(null);
        toast.success("Logout realizado com sucesso!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error("Erro ao fazer logout: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<ProfileType>) => {
    try {
      setLoading(true);
      
      if (!user) {
        toast.error("Usuário não autenticado");
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        toast.error("Erro ao atualizar perfil: " + error.message);
      } else {
        setProfile(profile ? { ...profile, ...data } : null);
        toast.success("Perfil atualizado com sucesso!");
      }
    } catch (error: any) {
      toast.error("Erro ao atualizar perfil: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = () => {
    return user?.email === "saulorg3@gmail.com";
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/atualizar-senha`,
      });

      if (error) {
        toast.error("Erro ao solicitar recuperação de senha: " + error.message);
      } else {
        toast.success("Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.");
      }
    } catch (error: any) {
      toast.error("Erro ao solicitar recuperação de senha: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        toast.error("Erro ao atualizar senha: " + error.message);
      } else {
        toast.success("Senha atualizada com sucesso!");
        navigate("/auth");
      }
    } catch (error: any) {
      toast.error("Erro ao atualizar senha: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    isAdmin,
    avatarUrl,
    setAvatarUrl
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
