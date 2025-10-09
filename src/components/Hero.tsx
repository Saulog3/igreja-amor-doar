
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMemo } from "react";

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

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{renderedTitle}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">{subtitle}</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to={primaryButton.link}>
            <Button className="bg-solidario-blue hover:bg-solidario-darkBlue text-white px-8 py-6 text-lg rounded-md shadow-md transition-all hover:shadow-lg hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-solidario-lightBlue active:scale-95">
              {primaryButton.text}
            </Button>
          </Link>
          
          {secondaryButton && (
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
