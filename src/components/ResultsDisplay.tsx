import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, MapPin, Briefcase, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileResult {
  Name: string;
  Location: string;
  "Job Title": string;
  Company: string;
  Description: string;
  "Linkedin URL": string;
}

interface ResultsDisplayProps {
  results: ProfileResult[];
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Search Results
        </h2>
        <p className="text-muted-foreground">
          Found {results.length} {results.length === 1 ? "profile" : "profiles"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((profile, index) => (
          <Card
            key={index}
            className="overflow-hidden transition-all hover:shadow-glow hover:-translate-y-1 border-border bg-card"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <User className="h-5 w-5" />
                    <h3 className="font-semibold text-lg text-foreground">
                      {profile.Name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Briefcase className="h-4 w-4" />
                    <span>{profile["Job Title"]}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Building2 className="h-4 w-4" />
                    <span>{profile.Company}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{profile.Location}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3">
                {profile.Description}
              </p>

              <Button
                variant="default"
                className="w-full group"
                asChild
              >
                <a
                  href={profile["Linkedin URL"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  View LinkedIn Profile
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
