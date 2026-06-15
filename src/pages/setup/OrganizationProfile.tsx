import React from "react";
import { Building2, Globe, Briefcase, Languages, Palette, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { copy } from "@/copy";

const fields = [
  { key: "orgName", label: copy.organizationProfile.fieldLabels.orgName, icon: Building2, fallback: copy.organizationProfile.fallbackValues.notSet },
  { key: "country", label: copy.organizationProfile.fieldLabels.country, icon: Globe, fallback: copy.organizationProfile.fallbackValues.notSet },
  { key: "department", label: copy.organizationProfile.fieldLabels.department, icon: Briefcase, fallback: copy.organizationProfile.fallbackValues.notSet },
  { key: "language", label: copy.organizationProfile.fieldLabels.language, icon: Languages, fallback: copy.organizationProfile.fallbackValues.notSet },
  { key: "themeColor", label: copy.organizationProfile.fieldLabels.themeColor, icon: Palette, fallback: copy.organizationProfile.fallbackValues.notSet },
  { key: "logoUrl", label: copy.organizationProfile.fieldLabels.logo, icon: Image, fallback: copy.organizationProfile.fallbackValues.noLogoUploaded },
] as const;

const OrganizationProfile: React.FC = () => {
  const { state } = useOnboarding();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{copy.organizationProfile.header.pageTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {copy.organizationProfile.header.pageDescription}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{copy.organizationProfile.card.sectionTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map(({ key, label, icon: Icon, fallback }) => {
            const value = state[key as keyof typeof state] as string;
            const hasValue = value && value.trim().length > 0;

            return (
              <div key={key} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">{label}</p>
                  {key === "themeColor" && hasValue ? (
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-5 h-5 rounded border border-border" style={{ backgroundColor: value }} />
                      <span className="text-sm text-foreground">{value}</span>
                    </div>
                  ) : key === "logoUrl" && hasValue ? (
                    <img src={value} alt={copy.organizationProfile.imageAlt.orgLogo} className="h-10 mt-1 rounded" />
                  ) : (
                    <p className={`text-sm ${hasValue ? "text-foreground" : "text-muted-foreground italic"}`}>
                      {hasValue ? value : fallback}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationProfile;
