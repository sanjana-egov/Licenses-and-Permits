import React from "react";
import { X, FlaskConical } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardFilterProvider, useDashboardFilter } from "@/lib/reportsFilter";
import { WARDS, ZONE_BY_ID } from "@/lib/capeTownGeo";
import { ExecutiveSummary } from "./tabs/ExecutiveSummary";
import { BusinessLandscape } from "./tabs/BusinessLandscape";
import { ApplicationsRenewals } from "./tabs/ApplicationsRenewals";
import { Revenue } from "./tabs/Revenue";
import { ProcessEfficiency } from "./tabs/ProcessEfficiency";

function ActiveFilterBar() {
  const { filter, setZone, setWard, setCategory, setStage, reset, hasAny } =
    useDashboardFilter();
  if (!hasAny) return null;

  const chips: { label: string; clear: () => void }[] = [];
  if (filter.zoneId)
    chips.push({ label: `Zone: ${ZONE_BY_ID[filter.zoneId].name}`, clear: () => setZone(null) });
  if (filter.wardId) {
    const w = WARDS.find((w) => w.id === filter.wardId);
    if (w) chips.push({ label: `Ward: ${w.name}`, clear: () => setWard(null) });
  }
  if (filter.category)
    chips.push({ label: `Category: ${filter.category}`, clear: () => setCategory(null) });
  if (filter.stage)
    chips.push({ label: `Stage: ${filter.stage}`, clear: () => setStage(null) });

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-card px-3 py-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Active filters
      </span>
      {chips.map((c) => (
        <Badge key={c.label} variant="secondary" className="gap-1.5 pr-1.5">
          {c.label}
          <button
            type="button"
            onClick={c.clear}
            className="rounded hover:bg-background/60 p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="h-6 text-xs ml-auto"
        onClick={reset}
      >
        Clear all
      </Button>
    </div>
  );
}

interface Props {
  serviceName: string;
}

export function ServiceMonitorDashboard({ serviceName }: Props) {
  return (
    <DashboardFilterProvider>
      <div className="space-y-5">
        {/* Mock data disclaimer */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-300/60 bg-amber-50/70 dark:bg-amber-950/20 dark:border-amber-700/40 px-4 py-3.5">
          <FlaskConical className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              This dashboard shows mock data for reference
            </p>
            <p className="text-xs text-amber-700/80 dark:text-amber-400/70 mt-0.5 leading-relaxed">
              Real application data will appear here once{" "}
              <span className="font-medium">{serviceName}</span> is live and
              citizens start submitting applications. All figures, names, and
              locations shown below are simulated.
            </p>
          </div>
        </div>

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Operational Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            City of Cape Town · {serviceName} · FY 24-25 · ZAR
          </p>
        </div>

        <ActiveFilterBar />

        <Tabs defaultValue="exec" className="w-full">
          <TabsList className="h-auto flex-wrap">
            <TabsTrigger value="exec">Executive Summary</TabsTrigger>
            <TabsTrigger value="landscape">Business Landscape</TabsTrigger>
            <TabsTrigger value="apps">Applications & Renewals</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="process">Process Efficiency</TabsTrigger>
          </TabsList>

          <TabsContent value="exec" className="mt-5">
            <ExecutiveSummary />
          </TabsContent>
          <TabsContent value="landscape" className="mt-5">
            <BusinessLandscape />
          </TabsContent>
          <TabsContent value="apps" className="mt-5">
            <ApplicationsRenewals />
          </TabsContent>
          <TabsContent value="revenue" className="mt-5">
            <Revenue />
          </TabsContent>
          <TabsContent value="process" className="mt-5">
            <ProcessEfficiency />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardFilterProvider>
  );
}
