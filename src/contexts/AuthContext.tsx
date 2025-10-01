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
  updateProfile: (data: Partial<ProfileType>) => Promise<void>;
  isAdmin: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
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
            is_institution: false, // Todos os usuários serão registrados como doadores por padrão
          },
        },
      });

      if (error) {
        toast.error("Erro ao criar conta: " + error.message);
        return;
      }

      // Instituições agora são gerenciadas pelo backend
      toast.success("Conta criada com sucesso! Verifique seu email para confirmar o cadastro.");
      navigate("/auth");
    } catch (error: any) {
      toast.error("Erro ao criar conta: " + error.message);
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

  const value = {
    session,
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAdmin,
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
