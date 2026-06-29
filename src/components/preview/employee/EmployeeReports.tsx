import React, { useMemo } from "react";
import { usePreview } from "../PreviewContext";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { getSlaStatus } from "./slaUtils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { FileText, Clock, CheckCircle2 } from "lucide-react";

const SLA_COLORS = { ontrack: "#10b981", atrisk: "#f59e0b", breached: "#f43f5e" };
const BAR_COLOR = "hsl(var(--accent))";

const EmployeeReports: React.FC = () => {
  const { applications, workflowStates, serviceName } = usePreview();
  const { state } = useOnboarding();
  const orgName = state.orgName;

  // KPI counts
  const total = applications.length;

  const terminalApproved = useMemo(() =>
    new Set(workflowStates.filter(s => s.isTerminal && !s.name.toLowerCase().includes("reject")).map(s => s.id)),
    [workflowStates]);

  const terminalRejected = useMemo(() =>
    new Set(workflowStates.filter(s => s.isTerminal && s.name.toLowerCase().includes("reject")).map(s => s.id)),
    [workflowStates]);

  const approved = applications.filter(a => terminalApproved.has(a.currentStateId)).length;
  const pending  = applications.filter(a =>
    !terminalApproved.has(a.currentStateId) && !terminalRejected.has(a.currentStateId)
  ).length;

  // Applications by stage — config-driven from workflowStates
  const stageData = useMemo(() => {
    const countMap = new Map<string, number>();
    applications.forEach(a => countMap.set(a.currentStateId, (countMap.get(a.currentStateId) ?? 0) + 1));
    return workflowStates
      .map(s => ({ name: s.name, count: countMap.get(s.id) ?? 0 }))
      .filter(d => d.count > 0);
  }, [applications, workflowStates]);

  // SLA status distribution
  const slaCounts = useMemo(() => {
    const c = { ontrack: 0, atrisk: 0, breached: 0 };
    applications.forEach(a => {
      if (a.stateEnteredAt) c[getSlaStatus(a.stateEnteredAt)]++;
    });
    return [
      { name: "On track",  value: c.ontrack,  color: SLA_COLORS.ontrack  },
      { name: "At risk",   value: c.atrisk,   color: SLA_COLORS.atrisk   },
      { name: "Breached",  value: c.breached, color: SLA_COLORS.breached },
    ].filter(d => d.value > 0);
  }, [applications]);

  const KPI_CARDS = [
    { label: "Total Applications", value: total,    Icon: FileText,     color: "text-accent",     bg: "bg-accent/10" },
    { label: "Pending",            value: pending,  Icon: Clock,        color: "text-amber-600",  bg: "bg-amber-50"  },
    { label: "Approved",           value: approved, Icon: CheckCircle2, color: "text-emerald-600",bg: "bg-emerald-50"},
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-background to-sky-50/40 p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Operational Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {orgName && `${orgName} · `}{serviceName}
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        {KPI_CARDS.map(({ label, value, Icon, color, bg }) => (
          <div key={label} className="rounded-xl border bg-card p-4 shadow-sm flex items-center gap-4">
            <span className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </span>
            <div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Applications by Stage */}
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-sm font-semibold text-foreground mb-4">Applications by Stage</p>
          {stageData.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-10">No applications yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={stageData} margin={{ top: 0, right: 8, left: -10, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))" }}
                />
                <Bar dataKey="count" fill={BAR_COLOR} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* SLA Status */}
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-sm font-semibold text-foreground mb-4">SLA Status</p>
          {slaCounts.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-10">No SLA data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={slaCounts}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {slaCounts.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))" }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span style={{ fontSize: 11 }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeReports;
