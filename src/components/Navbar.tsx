
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const Navbar = () => {
  const { user, profile, signOut, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Como Funciona", path: "/how-it-works" },
    { label: "Doar", path: "/donate" },
    { label: "Contato", path: "/contact" },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/public/lovable-uploads/48f3b4d0-0aff-4dc2-a4df-30fc566aa36e.png"
            alt="Solidario+" 
            className="h-8"
          />
          <span className="ml-2 text-2xl font-bold text-solidario-blue">Solidario+</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/how-it-works" className="text-gray-700 hover:text-solidario-blue">
            Como funciona
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-solidario-blue">
            Contato
          </Link>
          <Link to="/donate" className="text-gray-700 hover:text-solidario-blue">
            Doar
          </Link>
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Buscar"
              className="pl-10 rounded-full border-gray-300 w-40 md:w-64 focus:border-solidario-blue focus:ring-solidario-blue"
            />
          </div>
          
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
                
                {user ? (
                  <div className="flex flex-col gap-4">
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
                
                <div className="space-y-4 mt-4">
                  <Link 
                    to="/how-it-works" 
                    className="block text-lg" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Como funciona
                  </Link>
                  <Link 
                    to="/contact" 
                    className="block text-lg" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contato
                  </Link>
                  <Link 
                    to="/donate" 
                    className="block text-lg" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Doar
                  </Link>
                </div>
                
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
};

export default Navbar;
