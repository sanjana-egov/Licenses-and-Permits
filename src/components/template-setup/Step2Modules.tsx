import React from "react";
import { ArrowRight, Lock, FileCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { copy } from "@/copy";
import type { RenewalPolicyState } from "./Step4RenewalPolicy";

interface Props {
  renewalEnabled: boolean;
  onRenewalChange: (v: boolean) => void;
  renewalPolicy: RenewalPolicyState;
  setRenewalPolicy: (p: RenewalPolicyState) => void;
  categories: string[];
  subcategories: { name: string; parent: string }[];
  onContinue: () => void;
}

type RenewalMode = "global" | "by_category" | "by_subcategory";

const MonthsInput: React.FC<{ value: number; onChange: (n: number) => void }> = ({
  value,
  onChange,
}) => (
  <div className="flex items-center gap-2">
    <Input
      type="number"
      min={1}
      value={Number.isFinite(value) && value > 0 ? value : ""}
      onChange={(e) => {
        const n = parseInt(e.target.value, 10);
        onChange(Number.isFinite(n) && n > 0 ? n : 0);
      }}
      className="h-8 w-24"
    />
    <span className="text-sm text-muted-foreground">months</span>
  </div>
);

const ModeBtn: React.FC<{
  active: boolean;
  label: string;
  description: string;
  onClick: () => void;
}> = ({ active, label, description, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "text-left px-3 py-2.5 rounded-md border text-sm transition-all",
      active
        ? "border-accent bg-accent/5 ring-1 ring-accent"
        : "border-input hover:border-accent/40 hover:bg-muted/20",
    )}
  >
    <div className="font-medium text-foreground leading-tight">{label}</div>
    <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
  </button>
);

const Step2Modules: React.FC<Props> = ({
  renewalEnabled,
  onRenewalChange,
  renewalPolicy,
  setRenewalPolicy,
  categories,
  subcategories,
  onContinue,
}) => {
  const hasCategories = categories.length > 0;
  const hasSubcategories = subcategories.length > 0;

  const setMode = (mode: RenewalMode) => setRenewalPolicy({ ...renewalPolicy, mode });
  const setGlobal = (n: number) => setRenewalPolicy({ ...renewalPolicy, globalMonths: n });
  const setCatValue = (cat: string, n: number) =>
    setRenewalPolicy({
      ...renewalPolicy,
      perCategory: { ...renewalPolicy.perCategory, [cat]: n },
    });
  const setSubValue = (key: string, n: number) =>
    setRenewalPolicy({
      ...renewalPolicy,
      perSubcategory: { ...renewalPolicy.perSubcategory, [key]: n },
    });

  const canContinue =
    !renewalEnabled ||
    (() => {
      if (renewalPolicy.mode === "global") return renewalPolicy.globalMonths > 0;
      if (renewalPolicy.mode === "by_category")
        return categories.every((c) => (renewalPolicy.perCategory[c] ?? 0) > 0);
      if (renewalPolicy.mode === "by_subcategory")
        return subcategories.every(
          (s) => (renewalPolicy.perSubcategory[`${s.parent}::${s.name}`] ?? 0) > 0,
        );
      return false;
    })();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">
          {copy.step2Modules.header.heading}
        </h1>
        <p className="text-base text-muted-foreground mt-2">
          {copy.step2Modules.header.subheading}
        </p>
      </div>

      <div className="space-y-3">
        {/* Issuance — always on */}
        <Card className="p-5 bg-muted/40 border-accent/20">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center shrink-0">
              <FileCheck className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-foreground">
                  {copy.step2Modules.issuanceCard.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide bg-background border px-1.5 py-0.5 rounded text-muted-foreground">
                  <Lock className="h-3 w-3" /> {copy.step2Modules.issuanceCard.badgeLabel}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {copy.step2Modules.issuanceCard.description}
              </p>
            </div>
          </div>
        </Card>

        {/* Renewal — toggleable + inline fields */}
        <Card
          className={cn(
            "p-5 transition-all",
            renewalEnabled ? "border-accent bg-accent/5" : "hover:border-accent/40 hover:bg-muted/20",
          )}
        >
          <div
            className="flex items-start gap-4 cursor-pointer"
            onClick={() => onRenewalChange(!renewalEnabled)}
          >
            <div
              className={cn(
                "w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-colors",
                renewalEnabled
                  ? "bg-accent/10 border-accent/15 text-accent"
                  : "bg-muted text-muted-foreground border-transparent",
              )}
            >
              <RefreshCw className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-foreground">
                  {copy.step2Modules.renewalCard.title}
                </h3>
                <Switch
                  checked={renewalEnabled}
                  onCheckedChange={onRenewalChange}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {copy.step2Modules.renewalCard.description}
              </p>
            </div>
          </div>

          {/* Dependent renewal config fields */}
          {renewalEnabled && (
            <div className="mt-4 pt-4 border-t border-accent/20 ml-15 pl-1 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Renewal validity
              </p>

              {/* No categories: single duration */}
              {!hasCategories && (
                <div className="space-y-1.5">
                  <p className="text-sm text-foreground">
                    How long after issuance should renewal be allowed?
                  </p>
                  <MonthsInput value={renewalPolicy.globalMonths} onChange={setGlobal} />
                </div>
              )}

              {/* Has categories: mode selection + inputs */}
              {hasCategories && (
                <div className="space-y-3">
                  <p className="text-sm text-foreground">How does renewal validity vary?</p>
                  <div
                    className={cn(
                      "grid gap-2",
                      hasSubcategories ? "grid-cols-3" : "grid-cols-2",
                    )}
                  >
                    <ModeBtn
                      active={renewalPolicy.mode === "global"}
                      label="Same for all"
                      description="One duration for every license"
                      onClick={() => setMode("global")}
                    />
                    <ModeBtn
                      active={renewalPolicy.mode === "by_category"}
                      label="By category"
                      description="Each category has its own duration"
                      onClick={() => setMode("by_category")}
                    />
                    {hasSubcategories && (
                      <ModeBtn
                        active={renewalPolicy.mode === "by_subcategory"}
                        label="By subcategory"
                        description="Each subcategory has its own duration"
                        onClick={() => setMode("by_subcategory")}
                      />
                    )}
                  </div>

                  {renewalPolicy.mode === "global" && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-sm text-muted-foreground">
                        How long after issuance should renewal be allowed?
                      </p>
                      <MonthsInput value={renewalPolicy.globalMonths} onChange={setGlobal} />
                    </div>
                  )}

                  {renewalPolicy.mode === "by_category" && (
                    <div className="rounded-md border border-border overflow-hidden">
                      <div className="grid grid-cols-[1fr_auto] px-3 py-2 bg-muted/30 text-xs font-semibold text-muted-foreground">
                        <span>Category</span>
                        <span>Months</span>
                      </div>
                      <div className="divide-y divide-border">
                        {categories.map((c) => (
                          <div
                            key={c}
                            className="grid grid-cols-[1fr_auto] items-center px-3 py-2 gap-3"
                          >
                            <span className="text-sm text-foreground">{c}</span>
                            <MonthsInput
                              value={renewalPolicy.perCategory[c] ?? 12}
                              onChange={(n) => setCatValue(c, n)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {renewalPolicy.mode === "by_subcategory" && (
                    <div className="rounded-md border border-border overflow-hidden">
                      <div className="grid grid-cols-[1fr_1fr_auto] px-3 py-2 bg-muted/30 text-xs font-semibold text-muted-foreground">
                        <span>Subcategory</span>
                        <span>Parent</span>
                        <span>Months</span>
                      </div>
                      <div className="divide-y divide-border">
                        {subcategories.map((s) => {
                          const k = `${s.parent}::${s.name}`;
                          return (
                            <div
                              key={k}
                              className="grid grid-cols-[1fr_1fr_auto] items-center px-3 py-2 gap-3"
                            >
                              <span className="text-sm text-foreground">{s.name}</span>
                              <span className="text-sm text-muted-foreground">{s.parent}</span>
                              <MonthsInput
                                value={renewalPolicy.perSubcategory[k] ?? 12}
                                onChange={(n) => setSubValue(k, n)}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={onContinue} size="lg" className="gap-1.5" disabled={!canContinue}>
          {copy.step2Modules.buttons.continue} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Step2Modules;
