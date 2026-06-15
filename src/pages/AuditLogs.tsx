import React, { useMemo, useState } from "react";
import { Download, FileDown, ShieldAlert, KeyRound, RotateCcw, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AuditProvider,
  type UnifiedEvent,
  useGovernance,
  useConfigActivity,
  useDeployments,
} from "@/components/audit/AuditContext";
import { AuditFilterBar } from "@/components/audit/AuditFilterBar";
import { UnifiedAuditTable } from "@/components/audit/UnifiedAuditTable";
import { AuditDetailDrawer } from "@/components/audit/AuditDetailDrawer";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { copy } from "@/copy";

function exportCsv(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) {
    toast.error(copy.auditLogs.toasts.nothingToExport);
    return;
  }
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      headers
        .map((h) => {
          const v = r[h];
          const s = typeof v === "object" ? JSON.stringify(v) : String(v ?? "");
          return `"${s.replace(/"/g, '""')}"`;
        })
        .join(","),
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  toast.success(`Exported ${rows.length} records`);
}

const HeaderActions: React.FC = () => {
  const govEvents = useGovernance();
  const cfgEvents = useConfigActivity();
  const depEvents = useDeployments();
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={() =>
          exportCsv(`audit-logs-${Date.now()}.csv`, [
            ...govEvents.map((g) => ({ domain: "governance", ...g })),
            ...cfgEvents.map((g) => ({ domain: "config", ...g })),
            ...depEvents.map((g) => ({ domain: "deployment", ...g })),
          ])
        }
      >
        <Download className="h-3.5 w-3.5" /> {copy.auditLogs.buttons.exportLogs}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={() => {
          const report = `Audit Report\nGenerated: ${new Date().toLocaleString()}\nGovernance: ${govEvents.length}\nConfig: ${cfgEvents.length}\nDeployments: ${depEvents.length}\n`;
          const blob = new Blob([report], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `audit-report-${Date.now()}.txt`;
          a.click();
          URL.revokeObjectURL(url);
          toast.success(copy.auditLogs.toasts.auditReportDownloaded);
        }}
      >
        <FileDown className="h-3.5 w-3.5" /> {copy.auditLogs.buttons.downloadAuditReport}
      </Button>
    </div>
  );
};

const InsightStrip: React.FC = () => {
  const govEvents = useGovernance();
  const cfgEvents = useConfigActivity();
  const depEvents = useDeployments();

  const stats = useMemo(() => {
    const dayMs = 24 * 60 * 60 * 1000;
    const now = Date.now();
    const failedSignins = govEvents.filter(
      (g) => g.action.toLowerCase().includes("sign-in") && g.result === "failed" && now - new Date(g.timestamp).getTime() < dayMs,
    ).length;
    const permChanges = govEvents.filter(
      (g) =>
        (g.action.toLowerCase().includes("permission") || g.action.toLowerCase().includes("role")) &&
        now - new Date(g.timestamp).getTime() < dayMs,
    ).length;
    const rollbacks = depEvents.filter((d) => d.status === "rolled_back" || d.status === "failed").length;
    const servicesModified = new Set(
      cfgEvents.filter((e) => now - new Date(e.timestamp).getTime() < dayMs).map((e) => e.serviceName),
    ).size;
    return [
      { Icon: ShieldAlert, value: failedSignins, label: copy.auditLogs.insightStrip.failedSignIns, tone: "destructive" as const },
      { Icon: KeyRound, value: permChanges, label: copy.auditLogs.insightStrip.permissionChangesToday, tone: "warning" as const },
      { Icon: RotateCcw, value: rollbacks, label: copy.auditLogs.insightStrip.deploymentRollbacks, tone: "warning" as const },
      { Icon: Settings2, value: servicesModified, label: copy.auditLogs.insightStrip.servicesModified, tone: "neutral" as const },
    ];
  }, [govEvents, cfgEvents, depEvents]);

  return (
    <div className="rounded-lg border bg-card">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
        {stats.map(({ Icon, value, label, tone }, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <div
              className={cn(
                "h-8 w-8 rounded-md flex items-center justify-center shrink-0",
                tone === "destructive" && "bg-destructive/10 text-destructive",
                tone === "warning" && "bg-warning/10 text-warning",
                tone === "neutral" && "bg-muted text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-lg font-semibold text-foreground leading-tight tabular-nums">{value}</div>
              <div className="text-[11px] text-muted-foreground truncate">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AuditLogsInner: React.FC = () => {
  const [selected, setSelected] = useState<UnifiedEvent | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-5 border-b">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">{copy.auditLogs.header.title}</h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            {copy.auditLogs.header.description}
          </p>
        </div>
        <HeaderActions />
      </div>

      <InsightStrip />

      {/* Unified surface: filter bar + table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <AuditFilterBar showCategory showQuickViews />
        <UnifiedAuditTable
          selectedId={selected?.id}
          onSelect={(e) => {
            setSelected(e);
            setOpen(true);
          }}
        />
      </div>

      <AuditDetailDrawer event={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
};

const AuditLogs: React.FC = () => (
  <AuditProvider>
    <AuditLogsInner />
  </AuditProvider>
);

export default AuditLogs;
