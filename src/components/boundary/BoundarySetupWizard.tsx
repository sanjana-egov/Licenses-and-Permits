import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Globe, Map, FileSpreadsheet, ArrowRight, ArrowLeft,
  Upload, AlertTriangle, Download, CheckCircle2, Search, Info,
  Loader2, Pencil, Plus,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useOnboarding, type BoundaryHierarchy, type BoundaryLevel } from "@/contexts/OnboardingContext";
import { MOCK_LEVELS_BY_SOURCE, EXCEL_TEMPLATE_CSV } from "@/data/boundaryData";
import { MockMapPanel } from "./MockMapPanel";
import { cn } from "@/lib/utils";
import cityOfCapeTownLogo from "@/assets/city-of-cape-town-logo.png";

type WizardPath = "preloaded" | "shapefile" | "excel" | null;

interface Props {
  mode: "onboarding" | "go-live";
  onBack: () => void;
  onComplete: () => void;
}

const EXCEL_LIMITATIONS = [
  "Maps will not be available in dashboards or reports for boundaries configured with this method.",
  "Citizens will select their boundary from a text-based dropdown rather than a map pin.",
  "If a citizen enters a location by map, the system cannot automatically assign it to a boundary — staff will need to assign it manually.",
];

function WizardStepper({ current }: { current: number }) {
  const steps = ["Data source", "Review & configure", "Confirm"];
  return (
    <div className="flex items-center mb-8">
      {steps.map((label, i) => (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors",
              i < current
                ? "bg-accent border-accent text-accent-foreground"
                : i === current
                ? "border-accent text-accent bg-background"
                : "border-muted-foreground/30 text-muted-foreground bg-background"
            )}>
              {i < current ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span className={cn(
              "text-xs whitespace-nowrap font-medium",
              i === current ? "text-foreground" : "text-muted-foreground"
            )}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              "flex-1 h-0.5 mx-3 mb-5 transition-colors",
              i < current ? "bg-accent" : "bg-muted-foreground/20"
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function BoundarySetupWizard({ mode, onBack, onComplete }: Props) {
  const { state, addBoundaryHierarchy, updateService } = useOnboarding();
  const isServiceOwner = state.currentUserRole === "service_owner";
  const hasAdminHierarchies = (state.boundaryHierarchies || []).filter(
    (h) => h.status === "active" && h.createdBy === "admin"
  ).length > 0;

  const [path, setPath] = useState<WizardPath>(null);
  const [innerStep, setInnerStep] = useState(0);
  const [levels, setLevels] = useState<BoundaryLevel[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>("");
  const [editedLabels, setEditedLabels] = useState<Record<string, string>>({});
  const [operationalLevelId, setOperationalLevelId] = useState("");
  const [hierarchyName, setHierarchyName] = useState("Administrative Hierarchy");
  const [levelSearch, setLevelSearch] = useState("");
  const [excelAcks, setExcelAcks] = useState([false, false, false]);
  const [fileUploaded, setFileUploaded] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [selectedAdminHierarchy, setSelectedAdminHierarchy] = useState<string | null>(null);
  const [soMode, setSoMode] = useState<"create" | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function resetWizard() {
    setPath(null);
    setInnerStep(0);
    setLevels([]);
    setActiveTabId("");
    setEditedLabels({});
    setOperationalLevelId("");
    setHierarchyName("Administrative Hierarchy");
    setLevelSearch("");
    setExcelAcks([false, false, false]);
    setFileUploaded(null);
    setProcessing(false);
    setSelectedAdminHierarchy(null);
    setSoMode(null);
  }

  function handleBack() {
    resetWizard();
    onBack();
  }

  function setLevelsAndTab(newLevels: BoundaryLevel[]) {
    setLevels(newLevels);
    setActiveTabId(newLevels[0]?.id ?? "");
    setOperationalLevelId(newLevels[newLevels.length - 1]?.id ?? "");
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileUploaded(file.name);
    if (path === "shapefile") {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        const parsed = MOCK_LEVELS_BY_SOURCE["shapefile"];
        setLevelsAndTab(parsed);
        setInnerStep(2);
      }, 1500);
    }
  }

  function handleSelectPath(chosen: WizardPath) {
    setPath(chosen);
    if (chosen === "preloaded") {
      setLevelsAndTab(MOCK_LEVELS_BY_SOURCE["preloaded"]);
      setInnerStep(1);
    } else {
      setInnerStep(1);
    }
  }

  function handleExcelFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileUploaded(file.name);
    setLevelsAndTab(MOCK_LEVELS_BY_SOURCE["excel"]);
  }

  function downloadTemplate() {
    const blob = new Blob([EXCEL_TEMPLATE_CSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "boundary_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function getLabelForLevel(level: BoundaryLevel) {
    return editedLabels[level.id] ?? level.label;
  }

  function handleSave() {
    // Service Owner linking to existing admin hierarchy
    if (isServiceOwner && soMode === null && selectedAdminHierarchy) {
      const target = (state.boundaryHierarchies || []).find((h) => h.id === selectedAdminHierarchy);
      if (target) {
        if (mode === "go-live" && state.activeServiceId) {
          updateService(state.activeServiceId, { boundaryHierarchyId: selectedAdminHierarchy });
        }
        toast({ title: `Service linked to "${target.name}"` });
        resetWizard();
        onComplete();
        return;
      }
    }

    if (!operationalLevelId && levels.length > 0) {
      toast({ title: "Select an operational level", variant: "destructive" });
      return;
    }

    const finalLevels = levels.map((l) => ({
      ...l,
      label: editedLabels[l.id] ?? l.label,
    }));

    const newHierarchy: BoundaryHierarchy = {
      id: `bh_${Date.now()}`,
      name: hierarchyName.trim() || "Administrative Hierarchy",
      isDefault: false,
      status: "active",
      dataMode: path === "excel" ? "limited" : "geographic",
      source: path || "shapefile",
      levels: finalLevels,
      operationalLevelId,
      usedByServices: [],
      createdBy: isServiceOwner ? "service_owner" : "admin",
      createdAt: new Date().toISOString(),
    };

    addBoundaryHierarchy(newHierarchy);
    if (mode === "go-live" && state.activeServiceId) {
      updateService(state.activeServiceId, { boundaryHierarchyId: newHierarchy.id });
    }
    toast({ title: `"${newHierarchy.name}" saved`, description: "Hierarchy is now active." });
    resetWizard();
    onComplete();
  }

  function getStepperIndex(): number {
    if (innerStep <= 1) return 0;
    if (innerStep === 2) return 1;
    return 2;
  }

  const showStepper = !(isServiceOwner && soMode === null && hasAdminHierarchies);

  // ── RENDER STEPS ──────────────────────────────────────────────

  function renderSOSelect() {
    const adminHierarchies = (state.boundaryHierarchies || []).filter(
      (h) => h.status === "active" && h.createdBy === "admin"
    );

    return (
      <div className="space-y-5">
        <div className="mb-2">
          <h2 className="text-xl font-semibold mb-1">Boundary configuration</h2>
          <p className="text-sm text-muted-foreground">
            Select a boundary hierarchy configured by your Administrator, or set up a new one for this service.
          </p>
        </div>

        <div className="space-y-3">
          {adminHierarchies.map((h) => {
            const isSelected = selectedAdminHierarchy === h.id;
            const opLevel = h.levels.find((l) => l.id === h.operationalLevelId);
            return (
              <button
                key={h.id}
                onClick={() => setSelectedAdminHierarchy(h.id)}
                className={cn(
                  "w-full text-left rounded-xl border-2 p-4 transition-all",
                  isSelected ? "border-accent bg-accent/5" : "border-border hover:border-foreground/30"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">{h.name}</span>
                  {h.isDefault && (
                    <Badge className="text-[10px] bg-accent/10 text-accent border-accent/20">Default</Badge>
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

          <button
            onClick={() => setSoMode("create")}
            className="w-full text-left rounded-xl border-2 border-dashed border-border p-4 flex items-center gap-3 hover:border-foreground/30 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Add a new hierarchy for this service</div>
              <div className="text-xs text-muted-foreground">Set up a custom boundary configuration</div>
            </div>
          </button>
        </div>

        {selectedAdminHierarchy && (
          <div className="pt-2">
            <Button onClick={handleSave} className="w-full gap-2">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  }

  function renderSourceSelection() {
    const options = [
      ...(!isServiceOwner ? [{
        id: "preloaded" as WizardPath,
        icon: Globe,
        title: "Review pre-loaded boundary data",
        description: "Review and confirm OSM-derived boundary data loaded at account provisioning. Includes full map visualisation.",
        badge: "Recommended",
        badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
        hint: null as string | null,
      }] : []),
      {
        id: "shapefile" as WizardPath,
        icon: Map,
        title: "Upload a shapefile",
        description: "Upload an ESRI shapefile (.zip) with boundary polygons. Full geographic capabilities including maps.",
        badge: "Geographic",
        badgeClass: "bg-success/10 text-success border-success/20",
        hint: "Source shapefiles from your national mapping agency or OpenStreetMap exports (e.g., Geofabrik).",
      },
      {
        id: "excel" as WizardPath,
        icon: FileSpreadsheet,
        title: "Upload an Excel / CSV file",
        description: "Upload a list of boundary names and hierarchy levels. No geographic data — limited mode with no map support.",
        badge: "Limited",
        badgeClass: "bg-warning/10 text-warning border-warning/20",
        hint: "Use this only if geographic data is unavailable. Dashboards and maps will not be available.",
      },
    ];

    return (
      <div className="space-y-4">
        <div className="mb-2">
          <h2 className="text-xl font-semibold mb-1">Choose a data source</h2>
          <p className="text-sm text-muted-foreground">
            Select how you want to load boundary data for this hierarchy.
          </p>
        </div>

        {isServiceOwner && (
          <div className="rounded-lg border border-warning/30 bg-warning/5 px-4 py-3 text-xs text-warning flex gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            No system-level boundaries configured. Set up boundaries for this service — the Administrator can promote it to the system default later.
          </div>
        )}

        <div className="space-y-3">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectPath(opt.id)}
                className="w-full text-left rounded-xl border border-border bg-card hover:border-accent/40 hover:bg-accent/5 p-4 flex items-start gap-4 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-sm font-semibold">{opt.title}</span>
                    <span className={cn("text-[10px] px-1.5 py-0.5 rounded border font-medium", opt.badgeClass)}>
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{opt.description}</p>
                  {opt.hint && (
                    <p className="text-xs text-muted-foreground/70 mt-1.5 flex items-start gap-1.5">
                      <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" /> {opt.hint}
                    </p>
                  )}
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0 group-hover:text-accent transition-colors" />
              </button>
            );
          })}
        </div>

        {mode === "onboarding" && (
          <div className="pt-2 text-center">
            <button
              onClick={handleBack}
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    );
  }

  function renderJurisdictionConfirm() {
    return (
      <div className="space-y-5">
        <div className="mb-2">
          <h2 className="text-xl font-semibold mb-1">Confirm your jurisdiction</h2>
          <p className="text-sm text-muted-foreground">
            Verify the map shows the correct administrative area before reviewing boundary data.
          </p>
        </div>

        <MockMapPanel className="w-full h-72 rounded-xl" />

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-muted/20 p-3 col-span-2">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">Jurisdiction</div>
            <div className="text-sm font-semibold">{state.orgName || "City of Cape Town"}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="outline" className="text-[10px]">Admin level 4</Badge>
              <span className="text-xs text-muted-foreground">2,461 km²</span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-3 space-y-1.5 text-xs">
            <div><span className="text-muted-foreground">Source:</span> <span className="font-medium">OSM-derived</span></div>
            <div><span className="text-muted-foreground">Loaded:</span> <span className="font-medium">5 days ago</span></div>
            <div><span className="text-muted-foreground">Updated:</span> <span className="font-medium">2024-11-20</span></div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 border border-border">
          OSM data may be up to 12 months old. Cross-check against a national mapping source if recent administrative changes have occurred.
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="ghost" size="sm" onClick={() => setPath(null)} className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Button>
          <Button onClick={() => setInnerStep(2)} className="gap-2">
            Yes, proceed with this jurisdiction <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  function renderShapefileUpload() {
    return (
      <div className="space-y-5">
        <div className="mb-2">
          <h2 className="text-xl font-semibold mb-1">Upload a shapefile</h2>
          <p className="text-sm text-muted-foreground">
            Upload an ESRI shapefile archive (.zip) containing boundary polygons and attributes.
          </p>
        </div>

        {processing ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="text-sm">Parsing shapefile and validating geometry…</span>
            <span className="text-xs">{fileUploaded}</span>
          </div>
        ) : (
          <>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center gap-3 cursor-pointer hover:border-accent/40 hover:bg-accent/5 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              {fileUploaded ? (
                <div className="text-center">
                  <div className="text-sm font-medium text-success flex items-center gap-1.5 justify-center">
                    <CheckCircle2 className="h-4 w-4" />{fileUploaded}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Click to replace</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-sm font-semibold">Drop your shapefile here or click to browse</div>
                  <div className="text-xs text-muted-foreground mt-1">Supported: .zip (ESRI shapefile archive)</div>
                </div>
              )}
              <input ref={fileRef} type="file" accept=".zip,.shp" className="hidden" onChange={handleFileSelect} />
            </div>

            <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-4 border border-border space-y-1.5">
              <p className="font-semibold text-foreground">Shapefile requirements</p>
              <p>· Include .shp, .dbf, and .prj files in a single .zip archive</p>
              <p>· CRS must be WGS84 (EPSG:4326) or a common projected CRS</p>
              <p>· Attribute table must include a column for boundary name and hierarchy level</p>
            </div>
          </>
        )}

        <div className="flex justify-start pt-2">
          <Button variant="ghost" size="sm" onClick={() => { setPath(null); setInnerStep(0); }} className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Button>
        </div>
      </div>
    );
  }

  function renderExcelUpload() {
    const allAcked = excelAcks.every(Boolean);

    return (
      <div className="space-y-5">
        <div className="mb-2">
          <h2 className="text-xl font-semibold mb-1">Upload an Excel / CSV file</h2>
          <p className="text-sm text-muted-foreground">Upload a boundary list with names and hierarchy levels.</p>
        </div>

        <div className="rounded-xl border border-warning/40 bg-warning/5 p-4 space-y-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-warning">Geographic analysis will not be available</p>
              <p className="text-xs text-warning/80 mt-1 leading-relaxed">
                This includes map-based location selection, geographic dashboards, and automatic location-to-boundary matching. You can upgrade to geographic mode at any time by uploading a shapefile.
              </p>
            </div>
          </div>
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-1.5 text-xs font-medium text-warning underline underline-offset-2 ml-6"
          >
            <Download className="h-3.5 w-3.5" /> Download CSV template
          </button>
        </div>

        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center gap-3 cursor-pointer hover:border-accent/40 hover:bg-accent/5 transition-colors"
        >
          <Upload className="h-6 w-6 text-muted-foreground" />
          {fileUploaded ? (
            <div className="text-center">
              <div className="text-sm font-medium text-success flex items-center gap-1.5 justify-center">
                <CheckCircle2 className="h-4 w-4" />{fileUploaded}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Click to replace</div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-sm font-semibold">Upload your CSV or Excel file</div>
              <div className="text-xs text-muted-foreground mt-1">.csv, .xlsx accepted</div>
            </div>
          )}
          <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleExcelFileSelect} />
        </div>

        {fileUploaded && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-foreground">Acknowledge the following limitations before proceeding:</p>
            {EXCEL_LIMITATIONS.map((text, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={excelAcks[i]}
                  onCheckedChange={(v) => {
                    const next = [...excelAcks];
                    next[i] = !!v;
                    setExcelAcks(next);
                  }}
                  className="mt-0.5"
                />
                <span className="text-xs text-muted-foreground leading-snug">{text}</span>
              </label>
            ))}
          </div>
        )}

        <div className="flex justify-between pt-2">
          <Button variant="ghost" size="sm" onClick={() => { setPath(null); setInnerStep(0); }} className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Button>
          {fileUploaded && (
            <Button disabled={!allAcked} onClick={() => setInnerStep(2)} className="gap-2">
              Review and confirm <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  function renderDataReview() {
    const isExcel = path === "excel";
    const activeLevel = levels.find((l) => l.id === activeTabId) ?? levels[0];
    const filteredNames = levelSearch
      ? (activeLevel?.sampleNames ?? []).filter((n) => n.toLowerCase().includes(levelSearch.toLowerCase()))
      : (activeLevel?.sampleNames ?? []);

    return (
      <div className="space-y-6">
        <div className="mb-2">
          <h2 className="text-xl font-semibold mb-1">
            {isExcel ? "Review hierarchy levels" : "Review boundary data"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isExcel
              ? "Confirm the hierarchy levels from your file and select the operational level."
              : "Review the boundary data, optionally rename hierarchy labels, and select the operational level."}
          </p>
        </div>

        {/* Map + Tabbed data panel (geographic only) */}
        {!isExcel && (
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-[10px] text-muted-foreground mb-2">
                Source: OSM via Geofabrik · Updated 2024-11-20
              </p>
              <MockMapPanel
                className="h-72 w-full rounded-xl"
                highlightedLevel={levels.find((l) => l.id === operationalLevelId)?.label}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] text-muted-foreground mb-2">Browse boundary names by level</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => { setActiveTabId(level.id); setLevelSearch(""); }}
                    className={cn(
                      "text-xs px-3 py-1 rounded-full border font-medium transition-colors",
                      activeTabId === level.id
                        ? "bg-accent text-accent-foreground border-accent"
                        : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
                    )}
                  >
                    {getLabelForLevel(level)} ({level.count.toLocaleString()})
                  </button>
                ))}
              </div>
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={levelSearch}
                  onChange={(e) => setLevelSearch(e.target.value)}
                  placeholder={`Search ${getLabelForLevel(activeLevel ?? levels[0])} names…`}
                  className="h-8 pl-8 text-xs"
                />
              </div>
              <div className="flex-1 overflow-y-auto max-h-52 rounded-lg border border-border divide-y divide-border bg-muted/10">
                {filteredNames.slice(0, 20).map((n) => (
                  <div key={n} className="px-3 py-1.5 text-xs text-foreground">{n}</div>
                ))}
                {filteredNames.length === 0 && (
                  <div className="px-3 py-3 text-xs text-muted-foreground text-center">No matches</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Rename labels */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Rename hierarchy labels (optional)
          </h3>
          <div className="space-y-2">
            {levels.map((level) => {
              const currentLabel = getLabelForLevel(level);
              return (
                <div key={level.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-muted-foreground mb-1">Original: {level.originalLabel}</p>
                    <div className="relative">
                      <Input
                        value={currentLabel}
                        onChange={(e) => setEditedLabels((prev) => ({ ...prev, [level.id]: e.target.value }))}
                        className="h-8 text-sm pr-8"
                      />
                      <Pencil className="absolute right-2.5 top-2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px] shrink-0">
                    {level.count.toLocaleString()}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operational level */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Select operational level
          </h3>
          <div className="space-y-2">
            {levels.map((level) => {
              const isOp = level.id === operationalLevelId;
              const label = getLabelForLevel(level);
              return (
                <button
                  key={level.id}
                  onClick={() => setOperationalLevelId(level.id)}
                  className={cn(
                    "w-full text-left rounded-lg border p-3 transition-all",
                    isOp ? "border-accent bg-accent/5" : "border-border hover:border-foreground/20"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <input type="radio" checked={isOp} readOnly className="shrink-0 accent-accent" />
                    <span className="text-sm font-medium flex-1">{label}</span>
                    <Badge variant="secondary" className="text-[10px]">{level.count.toLocaleString()}</Badge>
                  </div>
                  {isOp && (
                    <p className="text-xs text-accent mt-2 ml-5 leading-relaxed">
                      Applications will be filed at {label}. Staff will be assigned at {label}. Dashboards will aggregate data by {label}.
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="ghost" size="sm" onClick={() => setInnerStep(1)} className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Button>
          <Button disabled={!operationalLevelId} onClick={() => setInnerStep(3)} className="gap-2">
            Proceed with this data <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  function renderNameAndConfirm() {
    const opLevel = levels.find((l) => l.id === operationalLevelId);
    const opLevelLabel = opLevel ? getLabelForLevel(opLevel) : "—";

    return (
      <div className="space-y-5">
        <div className="mb-2">
          <h2 className="text-xl font-semibold mb-1">Name and confirm</h2>
          <p className="text-sm text-muted-foreground">
            Give this hierarchy a name and review the configuration before saving.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">Name this boundary hierarchy</Label>
          <Input
            value={hierarchyName}
            onChange={(e) => setHierarchyName(e.target.value)}
            placeholder="Administrative Hierarchy"
            className="h-10"
          />
          <p className="text-[11px] text-muted-foreground">Appears in Application Areas and service configuration.</p>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            <div className="flex justify-between items-center px-4 py-3 gap-4">
              <span className="text-xs text-muted-foreground font-medium">Jurisdiction</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium">{state.orgName || "City of Cape Town"}</span>
                <Badge variant="outline" className="text-[10px]">Admin level 4</Badge>
              </div>
            </div>
            <div className="flex justify-between items-center px-4 py-3 gap-4">
              <span className="text-xs text-muted-foreground font-medium">Data source</span>
              <span className="text-sm font-medium">
                {path === "preloaded" ? "Pre-loaded (OSM)" : path === "excel" ? "Excel / CSV" : "Shapefile"}
              </span>
            </div>
            <div className="flex justify-between items-start px-4 py-3 gap-4">
              <span className="text-xs text-muted-foreground font-medium shrink-0">Hierarchy levels</span>
              <div className="flex flex-wrap gap-1 justify-end">
                {levels.map((level, i) => (
                  <span key={level.id} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-foreground border border-border flex items-center gap-1">
                    <span className="text-muted-foreground">{i + 1}.</span>
                    {getLabelForLevel(level)}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-start px-4 py-3 gap-4">
              <span className="text-xs text-muted-foreground font-medium shrink-0">Operational level</span>
              <div className="text-right">
                <span className="text-sm font-medium">{opLevelLabel}</span>
                <p className="text-[11px] text-muted-foreground mt-0.5">Applications filed and staff assigned at this level</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 flex gap-3">
          <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            This configuration will be inherited by all services on this instance.
          </p>
        </div>

        <p className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 border border-border">
          Boundary data can be corrected at any time after setup by uploading a shapefile — this does not need to be finalised today.
        </p>

        <div className="flex justify-between pt-2">
          <Button variant="ghost" size="sm" onClick={() => setInnerStep(2)} className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Button>
          <Button onClick={handleSave} className="gap-2">
            Proceed with this data <CheckCircle2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  function renderContent() {
    if (isServiceOwner && soMode === null && hasAdminHierarchies) return renderSOSelect();
    if (path === null) return renderSourceSelection();
    if (path === "preloaded" && innerStep === 1) return renderJurisdictionConfirm();
    if (path === "shapefile" && innerStep === 1) return renderShapefileUpload();
    if (path === "excel" && innerStep === 1) return renderExcelUpload();
    if (innerStep === 2) return renderDataReview();
    if (innerStep === 3) return renderNameAndConfirm();
    return renderSourceSelection();
  }

  const contentMaxW = innerStep === 2 ? "max-w-4xl" : "max-w-2xl";

  // ── ONBOARDING MODE ──────────────────────────────────────────
  if (mode === "onboarding") {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        <header className="bg-card border-b border-border shrink-0">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={cityOfCapeTownLogo} alt="City of Cape Town" className="w-7 h-7 object-contain" />
              <span className="text-sm font-semibold text-foreground tracking-tight">
                City of Cape Town — Admin Console
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                Step 4 of 4 · Boundary Setup
              </span>
              <Button variant="ghost" size="sm" onClick={handleBack} className="h-8 text-xs">
                ✕ Cancel
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className={`${contentMaxW} mx-auto px-6 py-8`}>
            {showStepper && <WizardStepper current={getStepperIndex()} />}
            {renderContent()}
          </div>
        </main>

        <footer className="border-t border-border bg-card shrink-0">
          <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Secure government workspace</span>
            <span>v1.0</span>
          </div>
        </footer>
      </div>
    );
  }

  // ── GO-LIVE MODE ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className={`${contentMaxW} w-full mx-auto`}>
        <Button variant="ghost" onClick={onBack} className="gap-1 mb-6 -ml-2">
          <ArrowLeft className="h-4 w-4" /> Back to go-live checklist
        </Button>
        {showStepper && <WizardStepper current={getStepperIndex()} />}
        {renderContent()}
      </div>
    </div>
  );
}
