import { type InputHTMLAttributes } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Label } from "./ui/label";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
}

function SearchInput({
  placeholder = "Buscar",
  value,
  setValue,
  className,
  ...rest
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      <Label className="capitalize">{placeholder}</Label>
      <div className={cn("relative w-full", className)}>
        <Input
          type="text"
          value={value}
          placeholder={`${placeholder}...`}
          onChange={handleChange}
          className="pl-10"
          {...rest}
        />
        <Search className="absolute left-3 right-0 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
      </div>
    </div>
  );
}

export default SearchInput;
