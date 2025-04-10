
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 text-solidario-blue">404</h1>
          <h2 className="text-3xl font-bold mb-6">Página não encontrada</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida. Volte para a página inicial.
          </p>
          <Link to="/">
            <Button className="bg-solidario-blue hover:bg-solidario-darkBlue text-white px-8 py-3">
              Voltar para a página inicial
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
