import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileSpreadsheet,
  X,
  Lock,
  FileCheck,
  RefreshCw,
  Download,
  Plus,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useOnboarding,
  type ServiceItem,
  type TemplateSetup,
  type RenewalPolicy,
} from "@/contexts/OnboardingContext";
import { toast } from "@/hooks/use-toast";
import { parseCategoriesCsv, parseSubcategoriesCsv } from "@/lib/csvParse";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { seedFormSteps, saveFormSteps } from "@/lib/formStorage";
import type { RenewalPolicyState } from "@/components/template-setup/Step4RenewalPolicy";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: ServiceItem;
}

type EntryMode = "manual" | "csv";

const CATEGORIES_SAMPLE_CSV = "Category Name\nRetail\nManufacturing\nHospitality\n";
const SUBCATEGORIES_SAMPLE_CSV =
  "Subcategory Name,Parent Category\nRestaurant,Hospitality\nBakery,Retail\nGarment Factory,Manufacturing\n";

const downloadSample = (filename: string, csv: string) => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const YesNo: React.FC<{ value: boolean; onChange: (v: boolean) => void }> = ({
  value,
  onChange,
}) => (
  <div className="inline-flex rounded-md border border-input p-0.5 bg-background">
    {[
      { v: true, label: "Yes" },
      { v: false, label: "No" },
    ].map((o) => (
      <button
        key={o.label}
        type="button"
        onClick={() => onChange(o.v)}
        className={cn(
          "px-4 py-1 text-sm rounded-sm transition-colors",
          value === o.v
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {o.label}
      </button>
    ))}
  </div>
);

const ModeTabs: React.FC<{ mode: EntryMode; setMode: (m: EntryMode) => void }> = ({
  mode,
  setMode,
}) => (
  <div className="inline-flex rounded-md border border-input p-0.5 bg-muted/30 text-xs">
    {(["manual", "csv"] as EntryMode[]).map((m) => (
      <button
        key={m}
        type="button"
        onClick={() => setMode(m)}
        className={cn(
          "px-3 py-1 rounded-sm transition-colors font-medium",
          mode === m
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {m === "manual" ? "Enter manually" : "Upload CSV"}
      </button>
    ))}
  </div>
);

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

type RenewalMode = "global" | "by_category" | "by_subcategory";

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
      "text-left px-3 py-2 rounded-md border text-xs transition-all",
      active
        ? "border-accent bg-accent/5 ring-1 ring-accent"
        : "border-input hover:border-accent/40 hover:bg-muted/20",
    )}
  >
    <div className="font-medium text-foreground">{label}</div>
    <div className="text-muted-foreground mt-0.5">{description}</div>
  </button>
);

const arraysEqual = <T,>(a: T[] = [], b: T[] = []) =>
  a.length === b.length && JSON.stringify(a) === JSON.stringify(b);

const MasterTemplateConfigurator: React.FC<Props> = ({ open, onOpenChange, service }) => {
  const { updateService } = useOnboarding();

  const initialSetup: TemplateSetup =
    service.templateSetup ?? { hasCategories: false, hasSubcategories: false };
  const initialRenewal = service.customModules.includes("Renewal");
  const initialPolicy: RenewalPolicyState = service.renewalPolicy ?? {
    mode: "global",
    globalMonths: 12,
    perCategory: {},
    perSubcategory: {},
  };

  const [name, setName] = useState(service.name);
  const [renewalEnabled, setRenewalEnabled] = useState(initialRenewal);
  const [setup, setSetup] = useState<TemplateSetup>(initialSetup);
  const [policy, setPolicy] = useState<RenewalPolicyState>(initialPolicy);

  // Entry modes
  const [catMode, setCatMode] = useState<EntryMode>("manual");
  const [subMode, setSubMode] = useState<EntryMode>("manual");

  // CSV pending (parsed but not yet confirmed)
  const [catPending, setCatPending] = useState<string[] | null>(null);
  const [catFileName, setCatFileName] = useState("");
  const [subPending, setSubPending] = useState<{ name: string; parent: string }[] | null>(null);
  const [subFileName, setSubFileName] = useState("");

  // Manual entry inputs
  const [newCategory, setNewCategory] = useState("");
  const [newSubName, setNewSubName] = useState("");
  const [newSubParent, setNewSubParent] = useState("");

  useEffect(() => {
    if (open) {
      setName(service.name);
      setRenewalEnabled(service.customModules.includes("Renewal"));
      setSetup(service.templateSetup ?? { hasCategories: false, hasSubcategories: false });
      setPolicy(
        service.renewalPolicy ?? {
          mode: "global",
          globalMonths: 12,
          perCategory: {},
          perSubcategory: {},
        },
      );
      setCatMode("manual");
      setSubMode("manual");
      setCatPending(null);
      setCatFileName("");
      setSubPending(null);
      setSubFileName("");
      setNewCategory("");
      setNewSubName("");
      setNewSubParent("");
    }
  }, [open, service]);

  const categoriesList = setup.categoriesList ?? [];
  const subcategoriesList = setup.subcategoriesList ?? [];

  // Auto-clean policy when categories disappear
  useEffect(() => {
    if (!setup.hasCategories && policy.mode !== "global") {
      setPolicy((p) => ({ ...p, mode: "global", perCategory: {}, perSubcategory: {} }));
    }
    if (!setup.hasSubcategories && policy.mode === "by_subcategory") {
      setPolicy((p) => ({ ...p, mode: "global", perSubcategory: {} }));
    }
  }, [setup.hasCategories, setup.hasSubcategories]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Category helpers ────────────────────────────────────────────────────────

  const handleCatFile = async (f: File) => {
    setCatFileName(f.name);
    try {
      const list = await parseCategoriesCsv(f);
      setCatPending(list);
    } catch {
      toast({ title: "Could not parse file", description: "Use the sample CSV format.", variant: "destructive" });
      setCatPending([]);
    }
  };

  const confirmCats = () => {
    if (!catPending) return;
    setSetup((s) => ({
      ...s,
      categoriesList: catPending,
      categoriesFileName: catFileName,
      subcategoriesList: (s.subcategoriesList ?? []).filter((sub) =>
        catPending.includes(sub.parent),
      ),
    }));
    setCatPending(null);
  };

  const addCategory = () => {
    const t = newCategory.trim();
    if (!t) return;
    if (categoriesList.some((c) => c.toLowerCase() === t.toLowerCase())) {
      toast({ title: "Category already exists", variant: "destructive" });
      return;
    }
    setSetup((s) => ({ ...s, categoriesList: [...(s.categoriesList ?? []), t] }));
    setNewCategory("");
  };

  const removeCategory = (c: string) => {
    setSetup((s) => ({
      ...s,
      categoriesList: (s.categoriesList ?? []).filter((x) => x !== c),
      subcategoriesList: (s.subcategoriesList ?? []).filter((sub) => sub.parent !== c),
    }));
  };

  // ── Subcategory helpers ─────────────────────────────────────────────────────

  const handleSubFile = async (f: File) => {
    setSubFileName(f.name);
    try {
      const list = await parseSubcategoriesCsv(f);
      setSubPending(list);
    } catch {
      toast({ title: "Could not parse file", description: "Use the sample CSV format.", variant: "destructive" });
      setSubPending([]);
    }
  };

  const confirmSubs = () => {
    if (!subPending) return;
    setSetup((s) => ({ ...s, subcategoriesList: subPending, subcategoriesFileName: subFileName }));
    setSubPending(null);
  };

  const addSubcategory = () => {
    const name = newSubName.trim();
    const parent = newSubParent.trim();
    if (!name || !parent) return;
    if (subcategoriesList.some((s) => s.name === name && s.parent === parent)) {
      toast({ title: "Subcategory already exists", variant: "destructive" });
      return;
    }
    setSetup((s) => ({
      ...s,
      subcategoriesList: [...(s.subcategoriesList ?? []), { name, parent }],
    }));
    setNewSubName("");
    setNewSubParent("");
  };

  const removeSubcategory = (name: string, parent: string) => {
    setSetup((s) => ({
      ...s,
      subcategoriesList: (s.subcategoriesList ?? []).filter(
        (sub) => !(sub.name === name && sub.parent === parent),
      ),
    }));
  };

  // ── Renewal policy helpers ──────────────────────────────────────────────────

  const setRenewalMode = (mode: RenewalMode) => setPolicy((p) => ({ ...p, mode }));
  const setGlobal = (n: number) => setPolicy((p) => ({ ...p, globalMonths: n }));
  const setCatValue = (cat: string, n: number) =>
    setPolicy((p) => ({ ...p, perCategory: { ...p.perCategory, [cat]: n } }));
  const setSubValue = (key: string, n: number) =>
    setPolicy((p) => ({ ...p, perSubcategory: { ...p.perSubcategory, [key]: n } }));

  // ── Save validation ─────────────────────────────────────────────────────────

  const canSave = (() => {
    if (!name.trim()) return false;
    if (setup.hasCategories && categoriesList.length === 0) return false;
    if (setup.hasCategories && setup.hasSubcategories && subcategoriesList.length === 0)
      return false;
    if (renewalEnabled && policy.mode === "global" && (!policy.globalMonths || policy.globalMonths <= 0))
      return false;
    return true;
  })();

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const customModules = ["Issuance", ...(renewalEnabled ? ["Renewal"] : [])];
    const cleanSetup: TemplateSetup = {
      hasCategories: setup.hasCategories,
      hasSubcategories: setup.hasCategories ? setup.hasSubcategories : false,
      categoriesFileName: setup.hasCategories ? setup.categoriesFileName : undefined,
      subcategoriesFileName:
        setup.hasCategories && setup.hasSubcategories ? setup.subcategoriesFileName : undefined,
      categoriesList: setup.hasCategories ? categoriesList : undefined,
      subcategoriesList:
        setup.hasCategories && setup.hasSubcategories ? subcategoriesList : undefined,
    };

    const cleanPolicy: RenewalPolicy | undefined = renewalEnabled
      ? {
          mode: policy.mode,
          globalMonths: policy.globalMonths || 12,
          perCategory: setup.hasCategories ? policy.perCategory : {},
          perSubcategory:
            setup.hasCategories && setup.hasSubcategories ? policy.perSubcategory : {},
        }
      : undefined;

    updateService(service.id, {
      name: trimmed,
      customModules,
      templateSetup: cleanSetup,
      renewalPolicy: cleanPolicy,
      workflowScope: "shared",
    });

    const prevCats = service.templateSetup?.categoriesList ?? [];
    const prevSubs = (service.templateSetup?.subcategoriesList ?? []).map(
      (s) => `${s.parent}::${s.name}`,
    );
    const nextSubs = (cleanSetup.subcategoriesList ?? []).map((s) => `${s.parent}::${s.name}`);
    const listsChanged =
      !arraysEqual(prevCats, cleanSetup.categoriesList ?? []) ||
      !arraysEqual(prevSubs, nextSubs);

    if (listsChanged) {
      saveFormSteps(service.id, "Issuance", seedFormSteps("Issuance", cleanSetup));
      if (renewalEnabled) {
        saveFormSteps(service.id, "Renewal", seedFormSteps("Renewal", cleanSetup));
      }
    }

    toast({ title: "Master template updated", description: "Service settings saved." });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>Master Template Configuration</SheetTitle>
          <SheetDescription>
            Edit the foundational architecture, structure, and policies of this service.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* ── Service Name ──────────────────────────────────────────────── */}
          <div className="space-y-2">
            <Label htmlFor="svc-name">Service name</Label>
            <Input id="svc-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          {/* ── Modules ───────────────────────────────────────────────────── */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Modules</h3>
              <p className="text-xs text-muted-foreground mt-0.5">System-supported journeys.</p>
            </div>
            <div className="rounded-md border border-border divide-y">
              {/* Issuance */}
              <div className="flex items-center gap-3 p-3 bg-muted/30">
                <FileCheck className="h-4 w-4 text-accent shrink-0" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground flex items-center gap-2">
                    Issuance
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide bg-background border px-1.5 py-0.5 rounded text-muted-foreground">
                      <Lock className="h-3 w-3" /> Default
                    </span>
                  </div>
                </div>
              </div>

              {/* Renewal toggle */}
              <div>
                <div className="flex items-center gap-3 p-3">
                  <RefreshCw
                    className={cn(
                      "h-4 w-4 shrink-0",
                      renewalEnabled ? "text-accent" : "text-muted-foreground",
                    )}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">Renewal</div>
                    <p className="text-xs text-muted-foreground">
                      Allow citizens to renew existing licenses.
                    </p>
                  </div>
                  <Switch checked={renewalEnabled} onCheckedChange={setRenewalEnabled} />
                </div>

                {/* Inline renewal fields */}
                {renewalEnabled && (
                  <div className="mx-3 mb-3 pt-3 border-t border-border space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      Renewal validity
                    </p>

                    {!setup.hasCategories && (
                      <div className="space-y-1.5">
                        <p className="text-xs text-muted-foreground">
                          How long after issuance should renewal be allowed?
                        </p>
                        <MonthsInput value={policy.globalMonths} onChange={setGlobal} />
                      </div>
                    )}

                    {setup.hasCategories && (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          How does renewal validity vary?
                        </p>
                        <div
                          className={cn(
                            "grid gap-2",
                            setup.hasSubcategories ? "grid-cols-3" : "grid-cols-2",
                          )}
                        >
                          <ModeBtn
                            active={policy.mode === "global"}
                            label="Same for all"
                            description="One duration"
                            onClick={() => setRenewalMode("global")}
                          />
                          <ModeBtn
                            active={policy.mode === "by_category"}
                            label="By category"
                            description="Per category"
                            onClick={() => setRenewalMode("by_category")}
                          />
                          {setup.hasSubcategories && (
                            <ModeBtn
                              active={policy.mode === "by_subcategory"}
                              label="By subcategory"
                              description="Per subcategory"
                              onClick={() => setRenewalMode("by_subcategory")}
                            />
                          )}
                        </div>

                        {policy.mode === "global" && (
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Validity period</p>
                            <MonthsInput value={policy.globalMonths} onChange={setGlobal} />
                          </div>
                        )}

                        {policy.mode === "by_category" && categoriesList.length > 0 && (
                          <div className="rounded-md border border-border overflow-hidden">
                            <div className="grid grid-cols-[1fr_auto] px-3 py-1.5 bg-muted/30 text-xs font-semibold text-muted-foreground">
                              <span>Category</span><span>Months</span>
                            </div>
                            <div className="divide-y divide-border">
                              {categoriesList.map((c) => (
                                <div key={c} className="grid grid-cols-[1fr_auto] items-center px-3 py-1.5 gap-3">
                                  <span className="text-sm text-foreground">{c}</span>
                                  <MonthsInput
                                    value={policy.perCategory[c] ?? 12}
                                    onChange={(n) => setCatValue(c, n)}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {policy.mode === "by_subcategory" && subcategoriesList.length > 0 && (
                          <div className="rounded-md border border-border overflow-hidden">
                            <div className="grid grid-cols-[1fr_1fr_auto] px-3 py-1.5 bg-muted/30 text-xs font-semibold text-muted-foreground">
                              <span>Subcategory</span><span>Parent</span><span>Months</span>
                            </div>
                            <div className="divide-y divide-border">
                              {subcategoriesList.map((s) => {
                                const k = `${s.parent}::${s.name}`;
                                return (
                                  <div key={k} className="grid grid-cols-[1fr_1fr_auto] items-center px-3 py-1.5 gap-3">
                                    <span className="text-sm text-foreground">{s.name}</span>
                                    <span className="text-xs text-muted-foreground">{s.parent}</span>
                                    <MonthsInput
                                      value={policy.perSubcategory[k] ?? 12}
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
              </div>
            </div>
          </div>

          {/* ── Structure ─────────────────────────────────────────────────── */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Structure</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Categories and subcategories for license classification.
              </p>
            </div>

            <div className="rounded-md border border-border divide-y">
              {/* Categories */}
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm font-medium text-foreground">Categories enabled</div>
                  <YesNo
                    value={setup.hasCategories}
                    onChange={(v) =>
                      setSetup((s) => ({
                        ...s,
                        hasCategories: v,
                        hasSubcategories: v ? s.hasSubcategories : false,
                        categoriesList: v ? s.categoriesList : undefined,
                        subcategoriesList: v ? s.subcategoriesList : undefined,
                      }))
                    }
                  />
                </div>

                {setup.hasCategories && (
                  <div className="space-y-2 pt-1 border-t border-border">
                    <ModeTabs mode={catMode} setMode={setCatMode} />

                    {catMode === "manual" ? (
                      /* Manual entry */
                      <>
                        <div className="flex gap-2">
                          <Input
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") { e.preventDefault(); addCategory(); }
                            }}
                            placeholder="Add category…"
                            className="h-8"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={addCategory}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        {categoriesList.length > 0 && (
                          <div className="space-y-1">
                            {categoriesList.map((c) => (
                              <div
                                key={c}
                                className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-1.5"
                              >
                                <span className="text-sm text-foreground">{c}</span>
                                <button
                                  type="button"
                                  onClick={() => removeCategory(c)}
                                  className="text-muted-foreground hover:text-destructive transition-colors"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : catPending !== null ? (
                      /* CSV pending confirmation */
                      <div className="space-y-2">
                        <div className="rounded-md border border-border overflow-hidden">
                          <div className="px-3 py-2 bg-muted/30 text-xs font-semibold text-foreground">
                            {catPending.length} categories parsed from {catFileName}
                          </div>
                          <div className="divide-y divide-border max-h-40 overflow-y-auto">
                            {catPending.map((c) => (
                              <div key={c} className="flex items-center justify-between px-3 py-1.5">
                                <span className="text-sm text-foreground">{c}</span>
                                <button
                                  type="button"
                                  onClick={() => setCatPending(catPending.filter((x) => x !== c))}
                                  className="text-muted-foreground hover:text-destructive transition-colors"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => { setCatPending(null); setCatFileName(""); }}
                          >
                            Re-upload
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            onClick={confirmCats}
                            disabled={catPending.length === 0}
                            className="gap-1.5"
                          >
                            <Check className="h-3.5 w-3.5" /> Confirm
                          </Button>
                        </div>
                      </div>
                    ) : categoriesList.length > 0 ? (
                      /* Confirmed from CSV */
                      <div className="flex items-center justify-between rounded-md border border-accent/30 bg-accent/5 px-3 py-2">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-accent shrink-0" />
                          <span className="text-sm font-medium text-foreground">{catFileName || "Uploaded file"}</span>
                          <span className="text-xs text-muted-foreground">· {categoriesList.length} categories</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => {
                            setCatFileName("");
                            setSetup((s) => ({ ...s, categoriesList: [], subcategoriesList: [] }));
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      /* Dropzone */
                      <div className="space-y-1.5">
                        <label
                          htmlFor="mc-cat-upload"
                          className="flex items-center justify-center gap-2 p-4 rounded-md border-2 border-dashed border-input hover:border-accent/50 hover:bg-muted/30 cursor-pointer transition-colors text-sm"
                        >
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="text-accent font-medium">Upload file</span>
                          <span className="text-muted-foreground">CSV</span>
                          <input
                            id="mc-cat-upload"
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) void handleCatFile(f);
                              e.target.value = "";
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => downloadSample("license-categories-sample.csv", CATEGORIES_SAMPLE_CSV)}
                          className="inline-flex items-center gap-1 text-xs text-accent underline-offset-2 hover:underline"
                        >
                          <Download className="h-3.5 w-3.5" /> Download sample
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Subcategories */}
              {setup.hasCategories && (
                <div className="p-3 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-medium text-foreground">Subcategories enabled</div>
                    <YesNo
                      value={setup.hasSubcategories}
                      onChange={(v) =>
                        setSetup((s) => ({
                          ...s,
                          hasSubcategories: v,
                          subcategoriesList: v ? s.subcategoriesList : undefined,
                        }))
                      }
                    />
                  </div>

                  {setup.hasSubcategories && (
                    <div className="space-y-2 pt-1 border-t border-border">
                      <ModeTabs mode={subMode} setMode={setSubMode} />

                      {subMode === "manual" ? (
                        <>
                          <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                            <Input
                              value={newSubName}
                              onChange={(e) => setNewSubName(e.target.value)}
                              placeholder="Subcategory name"
                              className="h-8"
                            />
                            <Select value={newSubParent} onValueChange={setNewSubParent}>
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Parent category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categoriesList.map((c) => (
                                  <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 shrink-0"
                              onClick={addSubcategory}
                              disabled={!newSubName.trim() || !newSubParent}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          {subcategoriesList.length > 0 && (
                            <div className="space-y-1">
                              {subcategoriesList.map((s) => (
                                <div
                                  key={`${s.parent}::${s.name}`}
                                  className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-1.5"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-sm text-foreground">{s.name}</span>
                                    <span className="text-xs text-muted-foreground">under {s.parent}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeSubcategory(s.name, s.parent)}
                                    className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      ) : subPending !== null ? (
                        <div className="space-y-2">
                          <div className="rounded-md border border-border overflow-hidden">
                            <div className="px-3 py-2 bg-muted/30 text-xs font-semibold text-foreground">
                              {subPending.length} subcategories parsed from {subFileName}
                            </div>
                            <div className="divide-y divide-border max-h-40 overflow-y-auto">
                              {subPending.map((s) => (
                                <div
                                  key={`${s.parent}::${s.name}`}
                                  className="flex items-center justify-between px-3 py-1.5"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-foreground">{s.name}</span>
                                    <span className="text-xs text-muted-foreground">under {s.parent}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setSubPending(
                                        subPending.filter(
                                          (x) => !(x.name === s.name && x.parent === s.parent),
                                        ),
                                      )
                                    }
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => { setSubPending(null); setSubFileName(""); }}
                            >
                              Re-upload
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              onClick={confirmSubs}
                              disabled={subPending.length === 0}
                              className="gap-1.5"
                            >
                              <Check className="h-3.5 w-3.5" /> Confirm
                            </Button>
                          </div>
                        </div>
                      ) : subcategoriesList.length > 0 ? (
                        <div className="flex items-center justify-between rounded-md border border-accent/30 bg-accent/5 px-3 py-2">
                          <div className="flex items-center gap-2">
                            <FileSpreadsheet className="h-4 w-4 text-accent shrink-0" />
                            <span className="text-sm font-medium text-foreground">{subFileName || "Uploaded file"}</span>
                            <span className="text-xs text-muted-foreground">· {subcategoriesList.length} subcategories</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => {
                              setSubFileName("");
                              setSetup((s) => ({ ...s, subcategoriesList: [] }));
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <label
                            htmlFor="mc-sub-upload"
                            className="flex items-center justify-center gap-2 p-4 rounded-md border-2 border-dashed border-input hover:border-accent/50 hover:bg-muted/30 cursor-pointer transition-colors text-sm"
                          >
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <span className="text-accent font-medium">Upload file</span>
                            <span className="text-muted-foreground">CSV</span>
                            <input
                              id="mc-sub-upload"
                              type="file"
                              accept=".csv"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) void handleSubFile(f);
                                e.target.value = "";
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => downloadSample("license-subcategories-sample.csv", SUBCATEGORIES_SAMPLE_CSV)}
                            className="inline-flex items-center gap-1 text-xs text-accent underline-offset-2 hover:underline"
                          >
                            <Download className="h-3.5 w-3.5" /> Download sample
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <SheetFooter className="px-6 py-4 border-t bg-background gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!canSave}>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MasterTemplateConfigurator;
