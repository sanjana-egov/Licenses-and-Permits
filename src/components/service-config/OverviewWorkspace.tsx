import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Rocket,
  Eye,
  Settings2,
  BarChart3,
  User,
  Briefcase,
  ExternalLink,
  MapPin,
  AlertTriangle,
  LayoutDashboard,
  PenLine,
} from "lucide-react";
import { useOnboarding, type ServiceItem } from "@/contexts/OnboardingContext";
import { allTemplates } from "@/data/serviceTemplates";
import { BoundaryAssignSheet } from "@/components/boundary/BoundaryAssignSheet";
import { copy } from "@/copy";

const getTemplateName = (templateId: string): string => {
  return allTemplates.find((t) => t.id === templateId)?.name ?? "selected";
};

type Mode = "overview" | "configure" | "preview" | "operations" | "deployment";

interface Props {
  service: ServiceItem;
  isLive: boolean;
  onNavigate: (mode: Mode) => void;
}

const renewalLabel = (service: ServiceItem): string => {
  const rp = service.renewalPolicy;
  if (!rp) return copy.overviewWorkspace.renewalPolicy.notEnabled;
  if (rp.mode === "global") return `${rp.globalMonths} Months (Global)`;
  if (rp.mode === "by_category") return copy.overviewWorkspace.renewalPolicy.categoryBased;
  if (rp.mode === "by_subcategory") return copy.overviewWorkspace.renewalPolicy.subcategoryBased;
  return copy.overviewWorkspace.renewalPolicy.configured;
};

const ReadyBadge: React.FC<{ label?: string }> = ({ label = copy.overviewWorkspace.heroBadge.ready }) => (
  <Badge
    variant="secondary"
    className="gap-1 font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-transparent"
  >
    <CheckCircle2 className="h-3 w-3" /> {label}
  </Badge>
);

const ReadinessRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="flex items-start gap-3 py-2.5">
    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
    <div className="text-sm">
      <span className="font-medium text-foreground">{label}</span>
      {value && <span className="text-muted-foreground">: {value}</span>}
    </div>
  </div>
);

const OverviewWorkspace: React.FC<Props> = ({ service, isLive, onNavigate }) => {
  const navigate = useNavigate();
  const { state, setActiveService } = useOnboarding();
  const [assignBoundaryOpen, setAssignBoundaryOpen] = useState(false);

  const modules = service.customModules ?? [];
  const categories = service.templateSetup?.categoriesList ?? [];

  const summarize = (items: string[], max = 4) => {
    if (!items.length) return copy.overviewWorkspace.summarize.none;
    if (items.length <= max) return items.join(", ");
    return `${items.slice(0, max).join(", ")} +${items.length - max} more`;
  };

  const handleGoLive = () => {
    setActiveService(service.id);
    navigate("/go-live");
  };

  return (
    <main className="max-w-5xl w-full mx-auto px-6 py-8 space-y-8 flex-1 min-h-0 overflow-auto">
      {/* HERO */}
      <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
        <CardContent className="p-7 space-y-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <ReadyBadge label={isLive ? copy.overviewWorkspace.heroBadge.live : copy.overviewWorkspace.heroBadge.readyForLaunch} />
            {isLive && (service as any).liveUrl && (
              <a
                href={(service as any).liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-accent hover:underline inline-flex items-center gap-1"
              >
                {(service as any).liveUrl} <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground tracking-tight">{service.name}</h2>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              This service has been generated successfully from the{" "}
              <span className="text-foreground font-medium">{getTemplateName(service.templateId)}</span> template. You can
              publish it immediately using default configurations or review and customize it before
              going live.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {!isLive && (
              <Button onClick={handleGoLive} className="gap-1.5">
                <Rocket className="h-4 w-4" /> {copy.overviewWorkspace.heroButtons.goLive}
              </Button>
            )}
            <Button variant="secondary" onClick={() => onNavigate("preview")} className="gap-1.5">
              <Eye className="h-4 w-4" /> {copy.overviewWorkspace.heroButtons.previewExperience}
            </Button>
            {!isLive && (
              <Button variant="ghost" onClick={() => onNavigate("configure")} className="gap-1.5">
                <Settings2 className="h-4 w-4" /> {copy.overviewWorkspace.heroButtons.customizeService}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SERVICE READINESS */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {copy.overviewWorkspace.serviceReadiness.sectionHeading}
        </h3>
        <Card>
          <CardContent className="p-5 divide-y divide-border/60">
            <div className="pb-1">
              <ReadinessRow label={copy.overviewWorkspace.serviceReadiness.modulesSelected} value={summarize(modules)} />
            </div>
            <div className="py-1">
              <ReadinessRow label={copy.overviewWorkspace.serviceReadiness.businessCategoriesConfigured} value={summarize(categories)} />
            </div>
            <div className="py-1">
              <ReadinessRow label={copy.overviewWorkspace.serviceReadiness.citizenPortalGenerated} />
            </div>
            <div className="py-1">
              <ReadinessRow label={copy.overviewWorkspace.serviceReadiness.employeeWorkspaceGenerated} />
            </div>
            <div className="py-1">
              <ReadinessRow label={copy.overviewWorkspace.serviceReadiness.renewalPolicyConfigured} value={renewalLabel(service)} />
            </div>
            <div className="pt-1 flex items-start gap-3 py-2.5">
              <LayoutDashboard className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
              <div className="text-sm flex items-center gap-2">
                <span className="font-medium text-foreground">{copy.overviewWorkspace.serviceReadiness.dashboard}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded border border-border bg-muted text-muted-foreground font-medium uppercase tracking-wide">{copy.overviewWorkspace.serviceReadiness.dashboardBadge}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* TEMPLATE SETUP SUMMARY */}
      {service.templateSetup && (
        <section className="space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {copy.overviewWorkspace.templateSetup.sectionHeading}
          </h3>
          <Card>
            <CardContent className="p-5">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{copy.overviewWorkspace.templateSetup.templateLabel}</p>
                  <p className="font-medium text-foreground">{getTemplateName(service.templateId)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{copy.overviewWorkspace.templateSetup.modulesLabel}</p>
                  <p className="font-medium text-foreground">{modules.length > 0 ? modules.join(", ") : "None"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{copy.overviewWorkspace.templateSetup.categoriesLabel}</p>
                  <p className="font-medium text-foreground">{categories.length > 0 ? `${categories.length} configured` : "None"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{copy.overviewWorkspace.templateSetup.renewalPolicyLabel}</p>
                  <p className="font-medium text-foreground">{renewalLabel(service)}</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/60">
                <button
                  onClick={() => navigate(`/templates/${service.templateId}/setup`)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
                >
                  <PenLine className="h-3.5 w-3.5" /> {copy.overviewWorkspace.templateSetup.editSetup}
                </button>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* GENERATED EXPERIENCES */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {copy.overviewWorkspace.generatedExperiences.sectionHeading}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <ReadyBadge />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{copy.overviewWorkspace.generatedExperiences.citizenPortalTitle}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {copy.overviewWorkspace.generatedExperiences.citizenPortalDescription}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-accent" />
                </div>
                <ReadyBadge />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{copy.overviewWorkspace.generatedExperiences.employeeWorkspaceTitle}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {copy.overviewWorkspace.generatedExperiences.employeeWorkspaceDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* BOUNDARY CONFIGURATION */}
      {(() => {
        const hierarchies = state.boundaryHierarchies || [];
        const assignedHierarchy = service.boundaryHierarchyId
          ? hierarchies.find((h) => h.id === service.boundaryHierarchyId)
          : null;
        const defaultHierarchy = hierarchies.find((h) => h.isDefault && h.status === "active");
        const displayHierarchy = assignedHierarchy ?? defaultHierarchy;
        const isExplicit = !!service.boundaryHierarchyId;

        return (
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {copy.overviewWorkspace.boundaryConfiguration.sectionHeading}
            </h3>
            <Card>
              <CardContent className="p-5">
                {!displayHierarchy ? (
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-warning">{copy.overviewWorkspace.boundaryConfiguration.noBoundariesTitle}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {copy.overviewWorkspace.boundaryConfiguration.noBoundariesDescription}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <MapPin className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="text-sm font-semibold">{displayHierarchy.name}</span>
                          {!isExplicit && (
                            <Badge variant="secondary" className="text-[10px]">{copy.overviewWorkspace.boundaryConfiguration.systemDefaultBadge}</Badge>
                          )}
                          <Badge
                            variant="outline"
                            className={displayHierarchy.dataMode === "limited" ? "text-[10px] border-warning/50 text-warning" : "text-[10px]"}
                          >
                            {displayHierarchy.dataMode === "geographic" ? copy.overviewWorkspace.boundaryConfiguration.geographicBadge : copy.overviewWorkspace.boundaryConfiguration.limitedBadge}
                          </Badge>
                        </div>
                        {(() => {
                          const opLevel = displayHierarchy.levels.find((l) => l.id === displayHierarchy.operationalLevelId);
                          return opLevel ? (
                            <p className="text-xs text-muted-foreground">
                              Operational level: <span className="font-medium text-foreground">{opLevel.label}</span>
                              {" · "}{displayHierarchy.levels.length} levels
                            </p>
                          ) : null;
                        })()}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 h-8 text-xs"
                      onClick={() => setAssignBoundaryOpen(true)}
                    >
                      {copy.overviewWorkspace.boundaryConfiguration.changeButton}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        );
      })()}

      {/* NEXT ACTIONS */}
      <section className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {copy.overviewWorkspace.nextActions.sectionHeading}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className="hover:shadow-md hover:border-accent/40 transition-all cursor-pointer"
            onClick={() => onNavigate("preview")}
          >
            <CardContent className="p-5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{copy.overviewWorkspace.nextActions.previewExperienceTitle}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {copy.overviewWorkspace.nextActions.previewExperienceDescription}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-md hover:border-accent/40 transition-all cursor-pointer"
            onClick={() => onNavigate("configure")}
          >
            <CardContent className="p-5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Settings2 className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{copy.overviewWorkspace.nextActions.customizeServiceTitle}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {copy.overviewWorkspace.nextActions.customizeServiceDescription}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className={`border-dashed ${isLive ? "hover:shadow-md hover:border-accent/40 transition-all cursor-pointer" : "opacity-60"}`}
            onClick={() => isLive && onNavigate("operations")}
          >
            <CardContent className="p-5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{copy.overviewWorkspace.nextActions.monitorManageTitle}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {isLive
                    ? copy.overviewWorkspace.nextActions.monitorManageDescriptionLive
                    : copy.overviewWorkspace.nextActions.monitorManageDescriptionNotLive}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <BoundaryAssignSheet
        service={service}
        open={assignBoundaryOpen}
        onOpenChange={setAssignBoundaryOpen}
      />
    </main>
  );
};

export default OverviewWorkspace;
