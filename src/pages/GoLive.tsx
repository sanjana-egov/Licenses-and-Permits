import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAuditLog } from "@/hooks/useAuditLog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShieldCheck, Palette, Plug, Languages, Rocket, Check, Sparkles, MapPin } from "lucide-react";
import RoleAccessSetup from "@/components/go-live/RoleAccessSetup";
import BoundaryGoLiveStep from "@/components/go-live/BoundaryGoLiveStep";
import GoLiveSuccess from "@/components/go-live/GoLiveSuccess";
import { copy } from "@/copy";

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  icon: typeof ShieldCheck;
  required: boolean;
  component: React.FC<{ onComplete: () => void; onBack: () => void }>;
}

const GoLive: React.FC = () => {
  const { state, updateService } = useOnboarding();
  const { logDeployment } = useAuditLog();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    const initial: string[] = [];
    const activeHierarchies = (state.boundaryHierarchies || []).filter((h) => h.status === "active");
    if (activeHierarchies.length > 0) initial.push("boundaries");
    return initial;
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [comingSoonFor, setComingSoonFor] = useState<string | null>(null);

  const activeService = state.services.find((s) => s.id === state.activeServiceId);

  const checklist: ChecklistItem[] = [
    { id: "boundaries", label: copy.goLive.requiredItems.boundarySetupLabel, description: copy.goLive.requiredItems.boundarySetupDescription, icon: MapPin, required: true, component: BoundaryGoLiveStep },
    { id: "access", label: copy.goLive.requiredItems.userAccessLabel, description: copy.goLive.requiredItems.userAccessDescription, icon: ShieldCheck, required: true, component: RoleAccessSetup },
  ];

  const requiredComplete = checklist.filter((item) => item.required).every((item) => completedItems.includes(item.id));

  const handleItemComplete = (id: string) => {
    setCompletedItems((prev) => [...prev, id]);
    setActiveStep(null);
  };

  const handleGoLive = () => {
    if (activeService) {
      updateService(activeService.id, { isLive: true, status: "live" });
      logDeployment({
        action: "Service published",
        entity: activeService.name,
        entityType: "Service",
        service: activeService.name,
      });
    }
    setShowSuccess(true);
  };

  if (showSuccess) return <GoLiveSuccess />;

  if (activeStep) {
    const item = checklist.find((c) => c.id === activeStep);
    if (item) {
      const Comp = item.component;
      return <Comp onComplete={() => handleItemComplete(item.id)} onBack={() => setActiveStep(null)} />;
    }
  }

  return (
    <div className="bg-background px-4 py-12">
      <div className="max-w-lg mx-auto">
        <Button
          variant="ghost"
          onClick={() => {
            const sid = activeService?.id ?? state.activeServiceId;
            if (sid) navigate(`/service/${sid}/configure`);
            else navigate("/services");
          }}
          className="gap-1 mb-6 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" /> {copy.common.buttons.back}
        </Button>
        <div className="text-center mb-8 animate-slide-up">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Rocket className="h-7 w-7 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{copy.goLive.header.pageTitle}</h2>
          <p className="text-sm text-muted-foreground">
            {activeService ? `Launch "${activeService.name}" by completing the steps below.` : "Complete the required steps below, then launch your application."}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{copy.goLive.checklistSections.requiredSectionLabel}</p>
          {checklist.filter((c) => c.required).map((item) => {
            const Icon = item.icon;
            const isComplete = completedItems.includes(item.id);
            return (
              <Card key={item.id} className={`cursor-pointer transition-all hover:shadow-md ${isComplete ? "border-accent/30 bg-accent/5" : ""}`} onClick={() => !isComplete && setActiveStep(item.id)}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isComplete ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>
                      {isComplete ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isComplete ? "text-accent" : "text-foreground"}`}>{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  {isComplete ? (
                    <Badge variant="outline" className="bg-accent/15 text-accent border-accent/30 text-xs">{copy.common.badges.done}</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">{copy.common.badges.required}</Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}

          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-4">{copy.goLive.checklistSections.optionalSectionLabel}</p>
          {[
            { icon: Palette, label: copy.goLive.optionalItems.customizeThemeLabel, description: copy.goLive.optionalItems.customizeThemeDescription, onClick: () => navigate("/config/branding") },
            { icon: Plug, label: copy.goLive.optionalItems.integrationsLabel, description: copy.goLive.optionalItems.integrationsDescription, onClick: () => setComingSoonFor("Integrations") },
            { icon: Languages, label: copy.goLive.optionalItems.additionalLanguagesLabel, description: copy.goLive.optionalItems.additionalLanguagesDescription, onClick: () => setComingSoonFor("Additional Languages") },
          ].map((item) => (
            <Card key={item.label} className="cursor-pointer transition-all hover:shadow-md" onClick={item.onClick}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs text-muted-foreground">{copy.common.badges.optional}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={!!comingSoonFor} onOpenChange={(o) => !o && setComingSoonFor(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <DialogTitle>{copy.goLive.comingSoonDialog.dialogTitle}</DialogTitle>
              <DialogDescription>
                {comingSoonFor} will be available in an upcoming release. Stay tuned!
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className="mt-8">
          <Button onClick={handleGoLive} disabled={!requiredComplete} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2 h-12 text-base">
            <Rocket className="h-5 w-5" /> {copy.goLive.actions.goLiveButton}
          </Button>
          {!requiredComplete && (
            <p className="text-xs text-center text-muted-foreground mt-2">{copy.goLive.actions.incompleteNotice}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoLive;
