import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { LoadingState } from "@/components/LoadingState";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { Linkedin } from "lucide-react";

interface FormData {
  jobTitle: string;
  location: string;
  industry: string;
}

interface ProfileResult {
  Name: string;
  Location: string;
  "Job Title": string;
  Company: string;
  Description: string;
  "Linkedin URL": string;
  "Linkedin Followers"?: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ProfileResult[]>([]);
  const { toast } = useToast();

  const handleSearch = async (formData: FormData) => {
    setIsLoading(true);
    setResults([]);

    try {
      const response = await fetch(
        "https://automation.invarianceai.io/webhook/shanthan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job_title: formData.jobTitle,
            location: formData.location,
            industry: formData.industry,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      const data = await response.json();
      
      // Handle both single object and array responses
      const resultsArray = Array.isArray(data) ? data : [data];
      setResults(resultsArray);

      toast({
        title: "Success!",
        description: `Found ${resultsArray.length} profile${resultsArray.length !== 1 ? "s" : ""}`,
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Error",
        description: "Failed to search profiles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 gradient-secondary opacity-50"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 gradient-primary rounded-2xl shadow-glow">
              <Linkedin className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            LinkedIn Profile Finder
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover professional profiles matching your search criteria in seconds
          </p>
        </div>

        {!isLoading && results.length === 0 && (
          <div className="animate-slide-up">
            <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
          </div>
        )}

        {isLoading && <LoadingState />}

        {!isLoading && results.length > 0 && (
          <div>
            <ResultsDisplay results={results} />
            <div className="text-center mt-8">
              <button
                onClick={() => setResults([])}
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                ← New Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
