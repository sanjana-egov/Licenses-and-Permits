import { useOnboarding } from "@/contexts/OnboardingContext";
import { roleToActor, type StoredAuditEvent } from "@/lib/auditHelpers";

type EventFields = Omit<StoredAuditEvent, "id" | "timestamp" | "category" | "actor" | "result"> & {
  result?: StoredAuditEvent["result"];
};

export function useAuditLog() {
  const { addAuditEvent, state } = useOnboarding();
  const actor = roleToActor(state.currentUserRole);

  return {
    logGovernance: (fields: EventFields) =>
      addAuditEvent({ category: "governance", result: "success", actor, ...fields }),
    logConfig: (fields: EventFields) =>
      addAuditEvent({ category: "config", result: "success", actor, ...fields }),
    logDeployment: (fields: EventFields) =>
      addAuditEvent({ category: "deployment", result: "success", actor, ...fields }),
  };
}
