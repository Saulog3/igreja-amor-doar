
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-solidario-blue text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/contact" className="text-white hover:underline">
              Entre em contato
            </Link>
          </div>
          
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>solidariomaisdministracao@solidario.com.br</p>
          </div>
          
          <div className="text-center md:text-right">
            <p>(11) 99999-9999</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-6 pt-6 text-center">
          <p>© {currentYear} - Todos direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
