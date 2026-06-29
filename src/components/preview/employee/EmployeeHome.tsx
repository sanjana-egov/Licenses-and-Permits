import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { usePreview } from "../PreviewContext";
import { useServiceRoles } from "@/lib/useServiceRoles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  BarChart3,
  Building2,
  CalendarDays,
  Store,
} from "lucide-react";
import { copy } from "@/copy";

type Bucket = "pending" | "inProgress" | "approved" | "rejected";

const mapStateToBucket = (stateId: string): Bucket => {
  if (["s6", "s9"].includes(stateId)) return "approved";
  if (stateId === "s8") return "rejected";
  if (["s1", "s_dv", "s_ip", "s3"].includes(stateId)) return "pending";
  return "inProgress";
};

const BUCKET_META: Record<Bucket, { label: string; dot: string; text: string; bg: string }> = {
  pending:    { label: copy.employeeHome.statusBadges.pendingReview, dot: "bg-amber-500",   text: "text-amber-700",   bg: "bg-amber-50" },
  inProgress: { label: copy.employeeHome.statusBadges.inProgress,    dot: "bg-sky-500",     text: "text-sky-700",     bg: "bg-sky-50" },
  approved:   { label: copy.employeeHome.statusBadges.approved,       dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  rejected:   { label: copy.employeeHome.statusBadges.rejected,       dot: "bg-rose-500",    text: "text-rose-700",    bg: "bg-rose-50" },
};

const EmployeeHome: React.FC = () => {
  const { applications, activeRoleId, serviceName, setScreen, workflowTransitions, workflowStates } = usePreview();
  const [serviceRoles] = useServiceRoles(useParams().id ?? "service");

  // Pending states = states with an outgoing transition assigned to the active role.
  const pendingStates = useMemo(() => {
    const set = new Set<string>();
    workflowTransitions.forEach((t) => {
      if (t.roleId === activeRoleId) set.add(t.fromStateId);
    });
    return Array.from(set);
  }, [workflowTransitions, activeRoleId]);

  const terminalApproved = useMemo(() =>
    workflowStates.filter(s => s.type === "end" && !s.name.toLowerCase().includes("reject")).map(s => s.id),
    [workflowStates]);

  const terminalRejected = useMemo(() =>
    workflowStates.filter(s => s.type === "end" && s.name.toLowerCase().includes("reject")).map(s => s.id),
    [workflowStates]);

  const stats = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter((a) => pendingStates.includes(a.currentStateId)).length;
    const approved = applications.filter((a) => terminalApproved.includes(a.currentStateId)).length;
    const rejected = applications.filter((a) => terminalRejected.includes(a.currentStateId)).length;
    return { total, pending, approved, rejected };
  }, [applications, pendingStates, terminalApproved, terminalRejected]);

  const activeRoleName = serviceRoles.find((r) => r.id === activeRoleId)?.name ?? "Employee";

  const recentRows = useMemo(() => {
    return [...applications]
      .map((a) => {
        const lastAt = a.timeline.length ? a.timeline[a.timeline.length - 1].at : a.createdAt;
        return { app: a, lastAt };
      })
      .sort((x, y) => y.lastAt - x.lastAt)
      .slice(0, 6);
  }, [applications]);

  const metricCards: Array<{
    key: string;
    label: string;
    value: number;
    icon: typeof FileText;
    iconColor: string;
    onClick: () => void;
  }> = [
    {
      key: "total",
      label: copy.employeeHome.metricCards.totalApplications,
      value: stats.total,
      icon: FileText,
      iconColor: "text-primary",
      onClick: () => setScreen({ type: "inbox", filterStates: undefined, filterLabel: "All applications" }),
    },
    {
      key: "pending",
      label: copy.employeeHome.metricCards.pendingReview,
      value: stats.pending,
      icon: Clock,
      iconColor: "text-amber-600",
      onClick: () => setScreen({ type: "inbox", filterStates: pendingStates, filterLabel: "Pending applications" }),
    },
    {
      key: "approved",
      label: copy.employeeHome.metricCards.approved,
      value: stats.approved,
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      onClick: () => setScreen({ type: "inbox", filterStates: terminalApproved, filterLabel: "Approved applications" }),
    },
    {
      key: "rejected",
      label: copy.employeeHome.metricCards.rejected,
      value: stats.rejected,
      icon: XCircle,
      iconColor: "text-rose-600",
      onClick: () => setScreen({ type: "inbox", filterStates: terminalRejected, filterLabel: "Rejected applications" }),
    },
  ];

  const services = [
    {
      id: "trade",
      title: serviceName || copy.employeeHome.serviceCards.defaultServiceTitle,
      icon: Store,
      pending: stats.pending,
      active: true,
    },
    { id: "building", title: copy.employeeHome.serviceCards.buildingPermitTitle, icon: Building2, pending: 0, active: false },
    { id: "event", title: copy.employeeHome.serviceCards.eventPermitTitle, icon: CalendarDays, pending: 0, active: false },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground mb-2">
            {activeRoleName}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {copy.employeeHome.header.pageTitle}
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            {copy.employeeHome.header.pageSubtitle}
          </p>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {metricCards.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.key}
                onClick={c.onClick}
                className="group text-left bg-card border border-border rounded-lg p-5 transition-colors hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <div className="flex items-start justify-between mb-6">
                  <p className="text-sm font-medium text-muted-foreground">{c.label}</p>
                  <Icon className={`h-4 w-4 ${c.iconColor}`} />
                </div>
                <p className="text-4xl font-bold text-foreground tabular-nums">{c.value}</p>
              </button>
            );
          })}
        </div>

        {/* Services */}
        <p className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground mb-3">
          {copy.employeeHome.sectionLabels.services}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {services.map((s) => {
            const Icon = s.icon;
            const subtitle = s.active
              ? `${s.pending} pending review`
              : copy.employeeHome.serviceCards.noPendingSubtitle;
            return (
              <div
                key={s.id}
                className={`bg-card border border-border rounded-lg p-5 ${s.active ? "" : "opacity-60"}`}
              >
                <div className="flex items-start gap-3 mb-5">
                  <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                    <Icon className={`h-5 w-5 ${s.active ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{s.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={!s.active}
                    onClick={() => s.active && setScreen({ type: "inbox" })}
                    className={`flex-1 h-9 rounded-md text-sm font-medium transition-colors ${
                      s.active
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    Inbox · {s.pending}
                  </button>
                  {s.active && (
                    <button
                      type="button"
                      onClick={() => setScreen({ type: "reports" })}
                      className="h-9 w-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                      aria-label="View reports"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground">
            {copy.employeeHome.sectionLabels.recentActivity}
          </p>
          <button
            onClick={() => setScreen({ type: "inbox" })}
            className="text-xs font-medium text-primary hover:underline"
          >
            {copy.employeeHome.recentActivityTable.viewInboxLink}
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{copy.employeeHome.recentActivityTable.columnApplicationId}</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{copy.employeeHome.recentActivityTable.columnApplicant}</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{copy.employeeHome.recentActivityTable.columnService}</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{copy.employeeHome.recentActivityTable.columnStatus}</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">{copy.employeeHome.recentActivityTable.columnLastUpdated}</TableHead>
                <TableHead className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground text-right">{copy.employeeHome.recentActivityTable.columnAction}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentRows.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-10">
                    {copy.employeeHome.recentActivityTable.emptyState}
                  </TableCell>
                </TableRow>
              ) : (
                recentRows.map(({ app, lastAt }) => {
                  const bucket = mapStateToBucket(app.currentStateId);
                  const meta = BUCKET_META[bucket];
                  const isReview = bucket === "pending";
                  return (
                    <TableRow
                      key={app.id}
                      className="border-border hover:bg-muted/40 cursor-pointer"
                      onClick={() => setScreen({ type: "application_review", applicationId: app.id })}
                    >
                      <TableCell className="font-mono text-xs text-foreground">
                        {app.applicationNumber}
                      </TableCell>
                      <TableCell className="text-sm text-foreground">
                        {app.formData.fullName || "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {serviceName}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${meta.bg} ${meta.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                          {meta.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground tabular-nums">
                        {new Date(lastAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setScreen({ type: "application_review", applicationId: app.id });
                          }}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {isReview ? copy.employeeHome.recentActivityTable.actionReview : copy.employeeHome.recentActivityTable.actionView}
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
