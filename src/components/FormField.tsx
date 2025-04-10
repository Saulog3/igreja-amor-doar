
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}

const FormField = ({ id, label, type = "text", placeholder, required = false }: FormFieldProps) => {
  return (
    <div className="mb-6">
      <Label htmlFor={id} className="block mb-2">{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md"
      />
    </div>
  );
};

export default FormField;
