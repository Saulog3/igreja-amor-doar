
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';

// Hook para rolar até a âncora após navegação para home
function useScrollToAnchorOnHome() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/' && location.state?.anchor) {
      const anchor = location.state.anchor;
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);
}


const Navbar = () => {
  useScrollToAnchorOnHome();
  const { user, profile, signOut, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  // Função para rolar até a âncora
  function scrollToAnchor(anchor) {
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Handler para links de âncora
  function handleAnchorClick(e, anchor) {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { anchor } });
    } else {
      scrollToAnchor(anchor);
    }
  }



  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Como Funciona", path: "/how-it-works" },
    { label: "Contato", path: "/contact" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/lovlogonew.png"
            alt="Solidario+" 
            className="h-8"
          />
          <span className="ml-2 text-2xl font-bold text-solidario-blue">Solidario+</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          <a
            href="#destaque"
            className="text-gray-700 hover:text-solidario-blue"
            onClick={e => handleAnchorClick(e, 'destaque')}
          >
            Destaque
          </a>
          <a
            href="#como_funciona"
            className="text-gray-700 hover:text-solidario-blue"
            onClick={e => handleAnchorClick(e, 'como_funciona')}
          >
            Como funciona
          </a>
          <a
            href="#depoimentos"
            className="text-gray-700 hover:text-solidario-blue"
            onClick={e => handleAnchorClick(e, 'depoimentos')}
          >
            Depoimentos
          </a>
          <Link to="/contact" className="text-gray-700 hover:text-solidario-blue">
            Contato
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/minha-conta" className="flex items-center gap-2 text-gray-700 hover:text-solidario-blue">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url || ""} alt={profile?.username || ""} />
                  <AvatarFallback>
                    {profile?.full_name?.charAt(0) || profile?.username?.charAt(0) || user.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span>Minha conta</span>
              </Link>
              
              <Link to="/dashboard" className="text-gray-700 hover:text-solidario-blue">
                Dashboard
              </Link>
              
              {isAdmin() && (
                <Link to="/admin" className="text-gray-700 hover:text-solidario-blue">
                  Admin
                </Link>
              )}
            </div>
          ) : (
            <Link to="/auth" className="text-gray-700 hover:text-solidario-blue">
              Entrar / Cadastrar
            </Link>
          )}
          
          <Link to="/donate">
            <Button className="bg-solidario-blue hover:bg-solidario-darkBlue text-white rounded-full">
              Quero Doar
            </Button>
          </Link>
        </div>
        
        <div className="md:hidden flex items-center">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 py-6">
                <Link 
                  to="/" 
                  className="text-xl font-bold text-solidario-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Solidario+
                </Link>
                {/* Links de âncora no menu mobile */}
                <a
                  href="#destaque"
                  className="block text-lg"
                  onClick={e => { handleAnchorClick(e, 'destaque'); setIsMenuOpen(false); }}
                >
                  Destaque
                </a>
                <a
                  href="#como_funciona"
                  className="block text-lg"
                  onClick={e => { handleAnchorClick(e, 'como_funciona'); setIsMenuOpen(false); }}
                >
                  Como funciona
                </a>
                <a
                  href="#depoimentos"
                  className="block text-lg"
                  onClick={e => { handleAnchorClick(e, 'depoimentos'); setIsMenuOpen(false); }}
                >
                  Depoimentos
                </a>
                <Link 
                  to="/contact" 
                  className="block text-lg" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contato
                </Link>
                {user ? (
                  <div className="flex flex-col gap-4 mt-4">
                    <Link 
                      to="/minha-conta" 
                      className="flex items-center gap-2" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url || ""} alt={profile?.username || ""} />
                        <AvatarFallback>
                          {profile?.full_name?.charAt(0) || profile?.username?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{profile?.full_name || user.email}</p>
                        <p className="text-sm text-gray-500">Ver perfil</p>
                      </div>
                    </Link>
                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-2" 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    {isAdmin() && (
                      <Link 
                        to="/admin" 
                        className="flex items-center gap-2" 
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin
                      </Link>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      Sair
                    </Button>
                  </div>
                ) : (
                  <Link 
                    to="/auth" 
                    className="flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full">Entrar / Cadastrar</Button>
                  </Link>
                )}
                <Link 
                  to="/donate" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-solidario-blue hover:bg-solidario-darkBlue mt-4">
                    Quero Doar
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
