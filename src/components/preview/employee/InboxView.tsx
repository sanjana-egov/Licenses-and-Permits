import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePreview } from "../PreviewContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilePlus, RefreshCw, Filter, X, Search } from "lucide-react";
import { useServiceRoles } from "@/lib/useServiceRoles";
import { copy } from "@/copy";
import SlaBadge, { SLA_STYLES } from "./SlaBadge";
import { getSlaStatus } from "./slaUtils";

export const getStatusStyle = (stateId: string): { bg: string; text: string; dot: string; label?: string } => {
  switch (stateId) {
    case "s1":   return { bg: "bg-sky-100",     text: "text-sky-700",     dot: "bg-sky-500" };
    case "s_dv": return { bg: "bg-amber-100",   text: "text-amber-700",   dot: "bg-amber-500" };
    case "s_ip": return { bg: "bg-cyan-100",    text: "text-cyan-700",    dot: "bg-cyan-500" };
    case "s3":   return { bg: "bg-violet-100",  text: "text-violet-700",  dot: "bg-violet-500" };
    case "s4":   return { bg: "bg-orange-100",  text: "text-orange-700",  dot: "bg-orange-500" };
    case "s5":   return { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" };
    case "s6":   return { bg: "bg-green-100",   text: "text-green-700",   dot: "bg-green-600" };
    case "s7":   return { bg: "bg-rose-100",    text: "text-rose-700",    dot: "bg-rose-500" };
    case "s8":   return { bg: "bg-rose-100",    text: "text-rose-800",    dot: "bg-rose-600" };
    case "s9":   return { bg: "bg-green-100",   text: "text-green-700",   dot: "bg-green-600" };
    default:     return { bg: "bg-muted",        text: "text-muted-foreground", dot: "bg-muted-foreground" };
  }
};

const StagePill: React.FC<{ stateId: string; label: string }> = ({ stateId, label }) => {
  const s = getStatusStyle(stateId);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.bg} ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {label}
    </span>
  );
};

const InboxView: React.FC = () => {
  const { applications, setScreen, role, activeRoleId, screen, workflowTransitions, serviceName } = usePreview();
  const [serviceRoles] = useServiceRoles(useParams().id ?? "service");
  const [query, setQuery] = useState("");

  const roleStateIds = React.useMemo(() => {
    if (role === "citizen") return null;
    const set = new Set<string>();
    workflowTransitions.forEach((t) => {
      if (t.roleId === activeRoleId) set.add(t.fromStateId);
    });
    return Array.from(set);
  }, [workflowTransitions, role, activeRoleId]);

  const explicitFilter = screen.type === "inbox" ? screen.filterStates : undefined;
  const explicitLabel  = screen.type === "inbox" ? screen.filterLabel  : undefined;

  const roleFiltered = explicitFilter
    ? applications.filter((a) => explicitFilter.includes(a.currentStateId))
    : roleStateIds
    ? applications.filter((a) => roleStateIds.includes(a.currentStateId))
    : applications;

  const q = query.trim().toLowerCase();
  const items = q
    ? roleFiltered.filter((a) => {
        const name = (a.formData.fullName || a.formData.applicantName || "").toLowerCase();
        return (
          a.applicationNumber.toLowerCase().includes(q) ||
          name.includes(q) ||
          serviceName.toLowerCase().includes(q) ||
          a.status.toLowerCase().includes(q)
        );
      })
    : roleFiltered;

  const activeRoleName =
    serviceRoles.find((r) => r.id === activeRoleId)?.name ?? (role === "citizen" ? "All" : "Employee");

  const filterLabel = explicitLabel ?? `${activeRoleName} queue`;

  // SLA summary chip counts (over the role-filtered set, before text search)
  const slaCounts = React.useMemo(() => {
    const counts = { ontrack: 0, atrisk: 0, breached: 0 };
    roleFiltered.forEach((a) => {
      if (a.stateEnteredAt) counts[getSlaStatus(a.stateEnteredAt)]++;
    });
    return counts;
  }, [roleFiltered]);

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-background to-sky-50/40">
      <div className="px-6 py-2 text-xs">
        <button onClick={() => setScreen({ type: "employee_home" })} className="text-accent hover:underline">
          {copy.inboxView.breadcrumb.home}
        </button>
        <span className="mx-1 text-muted-foreground">/</span>
        <span className="text-muted-foreground">{copy.inboxView.breadcrumb.inbox}</span>
      </div>

      <div className="px-6 pb-6">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-baseline gap-3">
            <h2 className="text-2xl font-bold text-accent">{copy.inboxView.header.title}</h2>
            <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[11px] font-semibold">
              {items.length} application{items.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">
              <Filter className="h-3 w-3" />
              Showing: {filterLabel}
            </span>
            {explicitFilter && (
              <button
                onClick={() => setScreen({ type: "inbox" })}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-semibold hover:bg-accent/20 transition-colors"
              >
                <X className="h-3 w-3" /> {copy.inboxView.filter.clearButton}
              </button>
            )}
          </div>
        </div>

        {/* SLA summary chips */}
        {roleFiltered.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            {(["ontrack", "atrisk", "breached"] as const).map((status) => {
              const s = SLA_STYLES[status];
              return (
                <span
                  key={status}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${s.bg} ${s.text}`}
                >
                  <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                  {s.label} · {slaCounts[status]}
                </span>
              );
            })}
          </div>
        )}

        {/* Multi-field search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by application number, applicant, service, or stage…"
            className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl bg-card border border-border/50 py-16 text-center">
            <svg className="w-24 h-24 mx-auto mb-3" viewBox="0 0 100 100" fill="none" aria-hidden="true">
              <rect x="20" y="40" width="60" height="40" rx="6" fill="hsl(var(--accent) / 0.1)" stroke="hsl(var(--accent) / 0.3)" strokeWidth="2" />
              <path d="M20 55l15 10h30l15-10" stroke="hsl(var(--accent) / 0.5)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="75" cy="32" r="3" fill="hsl(45 90% 60%)" />
              <path d="M75 25v3M75 36v3M68 32h3M79 32h3" stroke="hsl(45 90% 60%)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-sm font-semibold text-foreground">{copy.inboxView.emptyState.heading}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {q
                ? "No applications match your search."
                : roleStateIds && roleStateIds.length === 0
                ? `No cases assigned to ${activeRoleName} in the current workflow.`
                : copy.inboxView.emptyState.noApplicationsMessage}
            </p>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden bg-card border border-border/50 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-accent/5 to-transparent hover:bg-gradient-to-r hover:from-accent/5 hover:to-transparent">
                  <TableHead className="text-accent font-semibold">{copy.inboxView.table.columnApplicationNumber}</TableHead>
                  <TableHead>Application Type</TableHead>
                  <TableHead>{copy.inboxView.table.columnBusiness}</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>SLA</TableHead>
                  <TableHead>{copy.inboxView.table.columnSubmitted}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((app) => (
                  <TableRow
                    key={app.id}
                    className="cursor-pointer hover:bg-accent/5 border-l-4 border-l-transparent hover:border-l-accent transition-colors"
                    onClick={() => setScreen({ type: "application_review", applicationId: app.id })}
                  >
                    <TableCell className="text-accent text-xs font-mono font-semibold">{app.applicationNumber}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                        app.type === "RENEWAL"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {app.type === "RENEWAL" ? <RefreshCw className="h-2.5 w-2.5" /> : <FilePlus className="h-2.5 w-2.5" />}
                        {app.type === "RENEWAL" ? copy.inboxView.applicationTypeBadge.renewal : copy.inboxView.applicationTypeBadge.new}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-foreground">
                      {app.formData.businessName || app.formData.f5 || copy.inboxView.fallback.emptyBusinessName}
                    </TableCell>
                    <TableCell><StagePill stateId={app.currentStateId} label={app.status} /></TableCell>
                    <TableCell>
                      {app.stateEnteredAt
                        ? <SlaBadge stateEnteredAt={app.stateEnteredAt} />
                        : <span className="text-xs text-muted-foreground">—</span>
                      }
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxView;
