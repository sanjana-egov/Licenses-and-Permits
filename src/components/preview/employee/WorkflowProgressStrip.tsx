import React, { useMemo } from "react";
import { Check } from "lucide-react";
import type { WorkflowStateConfig, WorkflowTransitionConfig } from "../PreviewContext";

interface Props {
  states: WorkflowStateConfig[];
  transitions: WorkflowTransitionConfig[];
  currentStateId: string;
}

/** Topological sort: follow transitions greedily from start state(s). */
function topoSort(states: WorkflowStateConfig[], transitions: WorkflowTransitionConfig[]): WorkflowStateConfig[] {
  if (states.length === 0) return [];

  const idToState = new Map(states.map(s => [s.id, s]));
  const outEdges = new Map<string, string[]>();
  transitions.forEach(t => {
    if (!outEdges.has(t.fromStateId)) outEdges.set(t.fromStateId, []);
    outEdges.get(t.fromStateId)!.push(t.toStateId);
  });

  // Start from states with no incoming edges
  const hasIncoming = new Set(transitions.map(t => t.toStateId));
  const roots = states.filter(s => !hasIncoming.has(s.id));
  const start = roots[0] ?? states.find(s => s.type === "start") ?? states[0];

  const ordered: WorkflowStateConfig[] = [];
  const visited = new Set<string>();

  const dfs = (id: string) => {
    if (visited.has(id)) return;
    visited.add(id);
    const st = idToState.get(id);
    if (st) ordered.push(st);
    (outEdges.get(id) ?? []).forEach(dfs);
  };
  dfs(start.id);

  // Append any disconnected states
  states.forEach(s => { if (!visited.has(s.id)) ordered.push(s); });
  return ordered;
}

const WorkflowProgressStrip: React.FC<Props> = ({ states, transitions, currentStateId }) => {
  const ordered = useMemo(() => topoSort(states, transitions), [states, transitions]);

  if (ordered.length === 0) return null;

  const currentIdx = ordered.findIndex(s => s.id === currentStateId);

  return (
    <div className="flex items-center gap-0 overflow-x-auto py-3 px-1 bg-muted/30 rounded-lg">
      {ordered.map((s, idx) => {
        const done    = idx < currentIdx;
        const current = idx === currentIdx;
        return (
          <React.Fragment key={s.id}>
            {/* Step */}
            <div className="flex flex-col items-center gap-1 shrink-0 min-w-[56px] max-w-[72px]">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                done
                  ? "bg-accent border-accent text-primary-foreground"
                  : current
                  ? "bg-background border-accent text-accent"
                  : "bg-background border-muted-foreground/30 text-muted-foreground/50"
              }`}>
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : idx + 1}
              </div>
              <span className={`text-[9px] text-center leading-tight font-medium break-words max-w-full px-0.5 ${
                current ? "text-accent" : done ? "text-foreground" : "text-muted-foreground"
              }`}>
                {s.name}
              </span>
            </div>

            {/* Connector */}
            {idx < ordered.length - 1 && (
              <div className={`h-px flex-1 min-w-[12px] mx-0.5 mb-4 ${done ? "bg-accent" : "bg-muted-foreground/20"}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default WorkflowProgressStrip;
