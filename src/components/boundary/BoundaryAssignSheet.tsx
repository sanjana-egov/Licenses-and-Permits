import { useState } from "react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star } from "lucide-react";
import { useOnboarding, type ServiceItem } from "@/contexts/OnboardingContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Props {
  service: ServiceItem;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function BoundaryAssignSheet({ service, open, onOpenChange }: Props) {
  const { state, updateService } = useOnboarding();
  const [selectedId, setSelectedId] = useState<string | undefined>(service.boundaryHierarchyId);

  const adminHierarchies = (state.boundaryHierarchies || []).filter(
    (h) => h.status === "active" && h.createdBy === "admin"
  );
  const defaultHierarchy = adminHierarchies.find((h) => h.isDefault);

  function handleSave() {
    updateService(service.id, { boundaryHierarchyId: selectedId });
    toast({
      title: selectedId ? "Hierarchy assigned" : "Reverted to system default",
      description: selectedId
        ? `"${service.name}" will now use the selected hierarchy.`
        : `"${service.name}" will use the system default hierarchy.`,
    });
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col overflow-hidden">
        <SheetHeader className="px-6 py-5 border-b border-border shrink-0">
          <SheetTitle>Assign boundary hierarchy</SheetTitle>
          <p className="text-sm text-muted-foreground">
            Choose a specific hierarchy for <span className="font-medium text-foreground">{service.name}</span>, or use the system default.
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
          {/* Use system default option */}
          <button
            onClick={() => setSelectedId(undefined)}
            className={cn(
              "w-full text-left rounded-xl border-2 p-4 transition-all",
              selectedId === undefined
                ? "border-accent bg-accent/5"
                : "border-border hover:border-foreground/30"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Use system default</span>
              {selectedId === undefined && (
                <Badge className="text-[10px] bg-accent/10 text-accent border-accent/20">Selected</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {defaultHierarchy
                ? `Currently: ${defaultHierarchy.name}`
                : "No default hierarchy configured yet"}
            </p>
            {selectedId === undefined && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                This service will inherit the system default
              </div>
            )}
          </button>

          {adminHierarchies.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">
              No admin hierarchies have been configured yet. Set one up in Application Areas.
            </p>
          )}

          {adminHierarchies.map((h) => {
            const isSelected = selectedId === h.id;
            const opLevel = h.levels.find((l) => l.id === h.operationalLevelId);
            return (
              <button
                key={h.id}
                onClick={() => setSelectedId(h.id)}
                className={cn(
                  "w-full text-left rounded-xl border-2 p-4 transition-all",
                  isSelected ? "border-accent bg-accent/5" : "border-border hover:border-foreground/30"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">{h.name}</span>
                  {h.isDefault && (
                    <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20 gap-1">
                      <Star className="h-2.5 w-2.5" /> Default
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-[10px] ml-auto">
                    {h.dataMode === "geographic" ? "Geographic" : "Limited"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {h.levels.length} levels · Operational: {opLevel?.label ?? "—"} · Source:{" "}
                  {h.source === "preloaded" ? "Pre-loaded (OSM)" : h.source}
                </p>
                {isSelected && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    This hierarchy will be used for this service
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="px-6 py-4 border-t border-border flex justify-end gap-2 shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save assignment</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
