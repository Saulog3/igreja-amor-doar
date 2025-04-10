
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AccountTypeCardProps {
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  linkTo: string;
}

const AccountTypeCard = ({ title, description, features, buttonText, linkTo }: AccountTypeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-solidario-blue mr-3">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link to={linkTo}>
        <Button className="w-full py-3 bg-solidario-blue hover:bg-solidario-darkBlue text-white rounded-md">
          {buttonText}
        </Button>
      </Link>
    </div>
  );
};

export default AccountTypeCard;
