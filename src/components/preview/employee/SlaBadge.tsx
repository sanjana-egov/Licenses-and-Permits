import React from "react";
import { getSlaStatus, getSlaAgeDays, type SlaStatus } from "./slaUtils";

const SLA_STYLES: Record<SlaStatus, { dot: string; text: string; bg: string; label: string }> = {
  ontrack:  { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50",  label: "On track" },
  atrisk:   { dot: "bg-amber-500",   text: "text-amber-700",   bg: "bg-amber-50",    label: "At risk" },
  breached: { dot: "bg-rose-500",    text: "text-rose-700",    bg: "bg-rose-50",     label: "Breached" },
};

interface Props {
  stateEnteredAt: number;
}

const SlaBadge: React.FC<Props> = ({ stateEnteredAt }) => {
  const status = getSlaStatus(stateEnteredAt);
  const days = getSlaAgeDays(stateEnteredAt);
  const s = SLA_STYLES[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.bg} ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label} · {days}d
    </span>
  );
};

export { SLA_STYLES };
export default SlaBadge;
