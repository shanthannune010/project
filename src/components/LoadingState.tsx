import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const FACTS = [
  "LinkedIn has over 900 million members worldwide.",
  "The average LinkedIn user spends 17 minutes per month on the platform.",
  "LinkedIn is available in over 200 countries and territories.",
  "94% of B2B marketers use LinkedIn for content distribution.",
  "LinkedIn's algorithm prioritizes content with high engagement in the first hour.",
  "The most active time on LinkedIn is Tuesday through Thursday, 10 AM - 12 PM.",
  "LinkedIn profiles with photos receive 21x more profile views.",
  "Companies with complete LinkedIn pages get 30% more weekly views.",
];

export const LoadingState = () => {
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % FACTS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 gradient-primary rounded-full blur-xl opacity-50 animate-pulse"></div>
        <Loader2 className="h-16 w-16 text-primary animate-spin relative" />
      </div>
      
      <h3 className="text-2xl font-semibold mb-4 text-foreground">
        Searching LinkedIn Profiles
      </h3>
      
      <div className="max-w-md text-center">
        <p className="text-muted-foreground text-sm mb-2">Did you know?</p>
        <p className="text-foreground animate-fade-in" key={currentFact}>
          {FACTS[currentFact]}
        </p>
      </div>
    </div>
  );
};
