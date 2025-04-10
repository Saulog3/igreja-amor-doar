
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Navbar = () => {
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
          <Link to="/discover" className="text-gray-700 hover:text-solidario-blue">
            Descubra
          </Link>
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Buscar"
              className="pl-10 rounded-full border-gray-300 w-40 md:w-64 focus:border-solidario-blue focus:ring-solidario-blue"
            />
          </div>
          <Link to="/login" className="text-gray-700 hover:text-solidario-blue">
            Minha conta
          </Link>
          <Link to="/donate">
            <Button className="bg-solidario-blue hover:bg-solidario-darkBlue text-white rounded-full">
              Quero Doar
            </Button>
          </Link>
        </div>
        
        <div className="md:hidden flex items-center">
          <button className="mobile-menu-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
