import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Briefcase, Building2, User, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProfileResult {
  Name: string;
  Location: string;
  "Job Title": string;
  Company: string;
  Description: string;
  "Linkedin URL": string;
  "Linkedin Followers"?: string;
}

interface ResultsDisplayProps {
  results: ProfileResult[];
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const [selections, setSelections] = useState<Record<number, boolean | null>>({});
  const [showDeepDive, setShowDeepDive] = useState(false);

  if (!results || results.length === 0) {
    return null;
  }

  const handleSelection = (index: number, value: boolean) => {
    setSelections(prev => ({ ...prev, [index]: value }));
  };

  const allSelected = results.every((_, index) => selections[index] !== undefined && selections[index] !== null);
  const selectedProfiles = results.filter((_, index) => selections[index] === true);

  const handleDeepDive = () => {
    setShowDeepDive(true);
  };

  const handleBackToSelection = () => {
    setShowDeepDive(false);
  };

  if (showDeepDive) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in px-4">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block">
            <Badge variant="default" className="text-sm px-6 py-2 mb-4 animate-scale-in">
              Deep Dive Analysis
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Selected Candidates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Detailed insights on {selectedProfiles.length} top {selectedProfiles.length === 1 ? "candidate" : "candidates"}
          </p>
          <Button
            variant="outline"
            onClick={handleBackToSelection}
            className="mt-4 hover:scale-105 transition-transform"
          >
            ← Back to Selection
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {selectedProfiles.map((profile, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-300 hover:shadow-glow hover:-translate-y-2 border-2 border-border bg-card animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Header with Gradient */}
              <div className="gradient-primary p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-white mb-1">
                        {profile.Name}
                      </h3>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        Candidate #{index + 1}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Professional Details Grid */}
                <div className="grid gap-4">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg transition-all hover:bg-muted/70">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">Position</p>
                      <p className="text-foreground font-semibold text-base leading-tight">{profile["Job Title"]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg transition-all hover:bg-muted/70">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">Company</p>
                      <p className="text-foreground font-semibold text-base leading-tight">{profile.Company}</p>
                    </div>
                  </div>

                  {profile["Linkedin Followers"] && (
                    <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg transition-all hover:bg-muted/70">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">Network</p>
                        <p className="text-foreground font-semibold text-base leading-tight">{profile["Linkedin Followers"]} followers</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description Section */}
                <div className="p-5 bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg border border-border/50">
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Professional Summary</h4>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed pl-8">
                    {profile.Description}
                  </p>
                </div>

                {/* Action Button */}
                <Button
                  variant="default"
                  className="w-full group shadow-lg hover:shadow-glow transition-all duration-300"
                  size="lg"
                  asChild
                >
                  <a
                    href={profile["Linkedin URL"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <span>View Full LinkedIn Profile</span>
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:scale-110 transition-all" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="text-center pt-8 pb-4">
          <div className="inline-block p-6 bg-muted/50 rounded-2xl border border-border/50">
            <p className="text-muted-foreground text-sm">
              <span className="font-semibold text-foreground text-lg">{selectedProfiles.length}</span> {selectedProfiles.length === 1 ? "candidate" : "candidates"} ready for further review
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Select Candidates
        </h2>
        <p className="text-muted-foreground">
          Review {results.length} {results.length === 1 ? "profile" : "profiles"} and select your choices
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((profile, index) => (
          <Card
            key={index}
            className={`overflow-hidden transition-all border-2 ${
              selections[index] === true 
                ? "border-primary shadow-glow" 
                : selections[index] === false
                ? "border-destructive/50 opacity-60"
                : "border-border hover:border-primary/50"
            }`}
          >
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-foreground truncate">
                      {profile.Name}
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-2 pl-10">
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground font-medium truncate">{profile["Job Title"]}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground truncate">{profile.Company}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                asChild
              >
                <a
                  href={profile["Linkedin URL"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  View Profile
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>

              <div className="flex gap-2 pt-2">
                <Button
                  variant={selections[index] === true ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => handleSelection(index, true)}
                >
                  Yes
                </Button>
                <Button
                  variant={selections[index] === false ? "destructive" : "outline"}
                  className="flex-1"
                  onClick={() => handleSelection(index, false)}
                >
                  No
                </Button>
              </div>

              {selections[index] !== undefined && selections[index] !== null && (
                <Badge 
                  variant={selections[index] ? "default" : "destructive"}
                  className="w-full justify-center"
                >
                  {selections[index] ? "Selected" : "Not Selected"}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {allSelected && selectedProfiles.length > 0 && (
        <div className="text-center pt-8 animate-fade-in">
          <Button
            onClick={handleDeepDive}
            size="lg"
            className="px-8 shadow-glow hover:scale-105 transition-transform"
          >
            Deep Dive ({selectedProfiles.length} {selectedProfiles.length === 1 ? "Profile" : "Profiles"})
          </Button>
        </div>
      )}
    </div>
  );
};
