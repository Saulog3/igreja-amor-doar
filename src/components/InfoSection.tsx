
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface InfoSectionProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryButton?: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
  reversed?: boolean;
  className?: string;
}

const InfoSection = ({
  title,
  description,
  image,
  imageAlt,
  primaryButton,
  secondaryButton,
  reversed = false,
  className
}: InfoSectionProps) => {
  return (
    <section className={cn("py-16 px-6", className)}>
      <div className="container mx-auto max-w-6xl">
        <div className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10`}>
          <div className="flex-1">
            <img src={image} alt={imageAlt} className="rounded-lg w-full max-w-md mx-auto" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-gray-600 mb-8">{description}</p>
            
            {(primaryButton || secondaryButton) && (
              <div className="flex flex-wrap gap-4">
                {primaryButton && (
                  <Link to={primaryButton.link}>
                    <Button className="bg-solidario-blue hover:bg-solidario-darkBlue text-white px-8 py-2">
                      {primaryButton.text}
                    </Button>
                  </Link>
                )}
                
                {secondaryButton && (
                  <Link to={secondaryButton.link}>
                    <Button variant="outline" className="border-solidario-blue text-solidario-blue hover:bg-solidario-lightBlue/10 px-8 py-2">
                      {secondaryButton.text}
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
