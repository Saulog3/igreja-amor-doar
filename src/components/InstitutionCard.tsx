
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface InstitutionCardProps {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
}

const InstitutionCard = ({ id, name, description, logoUrl }: InstitutionCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={logoUrl || "https://images.unsplash.com/photo-1504675975031-96dbf10b5078?q=80&w=1770&auto=format&fit=crop"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-1">
        <CardDescription className="line-clamp-3">
          {description || "Instituição religiosa cadastrada na nossa plataforma."}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-2">
        <Link to={`/donate/${id}`} className="w-full">
          <Button className="w-full bg-solidario-blue hover:bg-solidario-darkBlue">
            Doar <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default InstitutionCard;
