import type { GovernanceEvent, ConfigActivityEvent, Deployment } from "@/data/auditLogs";

export interface StoredAuditEvent {
  id: string;
  timestamp: string;
  category: "governance" | "config" | "deployment";
  action: string;
  actor: string;
  entity: string;
  entityType: string;
  service?: string;
  module?: string;
  result: "success" | "warning" | "failed";
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  notes?: string;
}

let _counter = 1000;

export function makeAuditId(category: StoredAuditEvent["category"]): string {
  _counter += 1;
  const n = String(_counter);
  if (category === "governance") return `AUD-G-${n}`;
  if (category === "config") return `AUD-C-${n}`;
  return `DEP-${n}`;
}

export function roleToActor(role: string): string {
  if (role === "super_admin") return "Super Admin";
  if (role === "admin") return "Platform Admin";
  if (role === "service_owner") return "Service Owner";
  return "Admin";
}

export function toGovernanceEvent(e: StoredAuditEvent): GovernanceEvent {
  return {
    id: e.id,
    timestamp: e.timestamp,
    user: e.actor,
    action: e.action,
    entity: e.entity,
    scope: "Workspace",
    result: e.result,
    environment: "production",
    ip: "—",
    affectedServices: e.service ? [e.service] : [],
    before: e.before ?? null,
    after: e.after ?? null,
    related: [],
    category: "governance",
  };
}

export function toConfigEvent(e: StoredAuditEvent): ConfigActivityEvent {
  return {
    id: e.id,
    timestamp: e.timestamp,
    serviceId: e.service?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ?? "",
    serviceName: (e.service ?? "Platform") as ConfigActivityEvent["serviceName"],
    module: (e.module ?? "Forms") as ConfigActivityEvent["module"],
    actor: e.actor,
    summary: e.action,
    version: "—",
    environment: "production",
    affected: e.module ? [e.module] : [],
    before: e.before ?? {},
    after: e.after ?? {},
    notes: e.notes ?? "",
    publishedBy: e.actor,
  };
}

export function toDeployment(e: StoredAuditEvent): Deployment {
  return {
    id: e.id,
    version: "—",
    timestamp: e.timestamp,
    publishedBy: e.actor,
    environment: "production",
    status: e.result === "success" ? "published" : e.result === "failed" ? "failed" : "draft",
    serviceId: e.service?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ?? "",
    serviceName: (e.service ?? "Platform") as Deployment["serviceName"],
    impactedServices: e.service ? [e.service as Deployment["serviceName"]] : [],
    changedModules: [],
    durationSec: 0,
    notes: e.notes ? [e.notes] : [],
    warnings: [],
    runtimeHealth: "healthy",
  };
}
