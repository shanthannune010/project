import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

interface FormData {
  jobTitle: string;
  location: string;
  industry: string;
}

export const SearchForm = ({ onSubmit, isLoading }: SearchFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    location: "",
    industry: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jobTitle || !formData.location || !formData.industry) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="text-foreground font-medium">
            Job Title *
          </Label>
          <Input
            id="jobTitle"
            placeholder="e.g., Software Engineer"
            value={formData.jobTitle}
            onChange={handleChange("jobTitle")}
            disabled={isLoading}
            className="bg-card border-border focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-foreground font-medium">
            Location *
          </Label>
          <Input
            id="location"
            placeholder="e.g., San Francisco, CA"
            value={formData.location}
            onChange={handleChange("location")}
            disabled={isLoading}
            className="bg-card border-border focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry" className="text-foreground font-medium">
            Industry *
          </Label>
          <Input
            id="industry"
            placeholder="e.g., Technology"
            value={formData.industry}
            onChange={handleChange("industry")}
            disabled={isLoading}
            className="bg-card border-border focus:ring-primary"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full gradient-primary hover:opacity-90 transition-opacity shadow-glow"
        size="lg"
      >
        <Search className="mr-2 h-5 w-5" />
        Search Profiles
      </Button>
    </form>
  );
};
