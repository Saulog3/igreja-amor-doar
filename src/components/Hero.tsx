
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

interface HeroProps {
  title: string;
  subtitle: string;
  primaryButton: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
}

const Hero = ({ title, subtitle, primaryButton, secondaryButton }: HeroProps) => {
  // Destaque de "pessoas generosas" em azul
  const renderedTitle = useMemo(() => {
    const target = "pessoas generosas";
    const lower = title.toLowerCase();
    const idx = lower.indexOf(target);
    if (idx === -1) return title;
    const before = title.slice(0, idx);
    const middle = title.slice(idx, idx + target.length);
    const after = title.slice(idx + target.length);
    return (
      <>
        {before}
        <span className="text-solidario-blue">{middle}</span>
        {after}
      </>
    );
  }, [title]);

  // Carrossel de imagens com autoplay e controles manuais
  const images = [
    "/lovable-uploads/1.jpg",
    "/lovable-uploads/2.jpg",
    "/lovable-uploads/3.jpg",
    "/lovable-uploads/4.jpg",
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 7000); // mostra cada imagem por mais tempo
    return () => clearInterval(id);
  }, [images.length]);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  // Clique na própria imagem: metade esquerda volta, metade direita avança
  const onImageAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) prev();
    else next();
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6">
      <div className="container mx-auto max-w-6xl text-center">
        {/* Carrossel acima do título */}
        <div className="mx-auto mb-10 w-full relative rounded-xl overflow-hidden shadow-md bg-white">
          <div className="h-56 md:h-80 lg:h-[22rem] xl:h-[26rem]" onClick={onImageAreaClick}>
            {images.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`Slide ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: idx === current ? 1 : 0 }}
                loading="lazy"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/10" />
          <div className="absolute bottom-3 left-3 flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 w-2 rounded-full cursor-pointer ${idx === current ? "bg-solidario-blue" : "bg-solidario-lightBlue"}`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">{renderedTitle}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">{subtitle}</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to={primaryButton.link}>
            <Button className="bg-solidario-blue hover:bg-solidario-darkBlue text-white px-8 py-6 text-lg rounded-md shadow-md transition-all hover:shadow-lg hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-solidario-lightBlue active:scale-95">
              {primaryButton.text}
            </Button>
          </Link>
          
          {/* Botão de criar doação temporariamente invisível */}
          {false && secondaryButton && (
            <Link to={secondaryButton.link}>
              <Button variant="outline" className="border-solidario-blue text-solidario-blue hover:bg-solidario-lightBlue/10 px-8 py-6 text-lg rounded-md transition-all hover:shadow-md hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-solidario-lightBlue active:scale-95">
                {secondaryButton.text}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
