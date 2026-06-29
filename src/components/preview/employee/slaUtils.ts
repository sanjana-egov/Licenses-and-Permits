const SLA_AT_RISK_DAYS = 3;
const SLA_BREACHED_DAYS = 7;

export type SlaStatus = "ontrack" | "atrisk" | "breached";

export function getSlaStatus(stateEnteredAt: number): SlaStatus {
  const ageDays = (Date.now() - stateEnteredAt) / 86_400_000;
  if (ageDays >= SLA_BREACHED_DAYS) return "breached";
  if (ageDays >= SLA_AT_RISK_DAYS) return "atrisk";
  return "ontrack";
}

export function getSlaAgeDays(stateEnteredAt: number): number {
  return Math.floor((Date.now() - stateEnteredAt) / 86_400_000);
}
