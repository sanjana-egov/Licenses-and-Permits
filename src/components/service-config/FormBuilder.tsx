import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  ArrowLeft, HelpCircle, Plus, Search, X, ChevronLeft, ChevronRight, Save,
  User, MapPin, Phone, Mail, Hash, Type, AlignLeft, Calendar,
  Circle, CheckSquare, List, Tag, Upload, Info, GripVertical, Trash2,
  MapPinned, Smartphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  type WizardField,
  type WizardFieldType,
  type WizardStep,
  type WizardSubScreen,
} from "@/data/wizardForm";
import { loadFormSteps, saveFormSteps } from "@/lib/formStorage";
import EmulatorFrame from "@/components/service-config/preview/EmulatorFrame";
import FormPreview from "@/components/service-config/preview/FormPreview";
import { copy } from "@/copy";

/* ─── Field palette ─────────────────────────────────────── */

interface FieldTypeEntry { type: WizardFieldType; label: string; icon: LucideIcon }
interface FieldCategory { name: string; items: FieldTypeEntry[] }

const FIELD_CATEGORIES: FieldCategory[] = [
  {
    name: "Input Fields",
    items: [
      { type: "text", label: "Name", icon: User },
      { type: "text", label: "Address", icon: MapPin },
      { type: "number", label: "Phone", icon: Phone },
      { type: "text", label: "Email", icon: Mail },
      { type: "number", label: "Numeric", icon: Hash },
      { type: "text", label: "Text Input", icon: Type },
      { type: "textarea", label: "Text Area", icon: AlignLeft },
      { type: "date", label: "Date Picker", icon: Calendar },
    ],
  },
  {
    name: "Selection",
    items: [
      { type: "radio", label: "Radio", icon: Circle },
      { type: "checkbox", label: "Checkbox", icon: CheckSquare },
      { type: "dropdown", label: "Dropdown", icon: List },
      { type: "multiselect", label: "Selection Tag", icon: Tag },
    ],
  },
  {
    name: "Upload",
    items: [
      { type: "file", label: "File Upload", icon: Upload },
    ],
  },
];

/* ─── Helpers ───────────────────────────────────────────── */

let fieldCounter = 1000;
const createField = (type: WizardFieldType, label: string): WizardField => ({
  id: `field-${++fieldCounter}`,
  type,
  label: label || copy.formBuilder.defaults.untitledField,
  placeholder: "",
  helpText: "",
  required: false,
  options: ["dropdown", "radio", "checkbox", "multiselect"].includes(type)
    ? ["Option 1", "Option 2"]
    : undefined,
});

const fieldHasRules = (f: WizardField): boolean => {
  const v = f.validation;
  return Boolean(
    (v && (v.minLength != null || v.maxLength != null || v.pattern ||
      v.min != null || v.max != null || v.pastDateOnly)) ||
    f.showIf || f.dependsOn,
  );
};

/* ─── Component ─────────────────────────────────────────── */

interface FormBuilderProps {
  moduleName: string;
  onBack: () => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ moduleName, onBack }) => {
  const { id: routeServiceId = "service" } = useParams();
  const { state } = useOnboarding();
  const currentService = state.services.find((s) => s.id === routeServiceId);
  const isSingleModule = (currentService?.customModules?.length ?? 0) <= 1;

  const seedSetup = useMemo(
    () => ({
      categoriesList: currentService?.templateSetup?.categoriesList,
      subcategoriesList: currentService?.templateSetup?.subcategoriesList,
    }),
    [currentService?.templateSetup?.categoriesList, currentService?.templateSetup?.subcategoriesList],
  );

  const [steps, setSteps] = useState<WizardStep[]>(
    () => loadFormSteps(routeServiceId, moduleName, seedSetup),
  );

  // Reload when the active module changes (Issuance ↔ Renewal switch).
  useEffect(() => {
    setSteps(loadFormSteps(routeServiceId, moduleName, seedSetup));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeServiceId, moduleName, seedSetup]);

  const [activeStepId, setActiveStepId] = useState(steps[0]?.id ?? "");
  const [activeSubScreenId, setActiveSubScreenId] = useState<string>(
    steps[0]?.subScreens[0]?.id ?? "",
  );
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [paletteSearch, setPaletteSearch] = useState("");
  const [rightTab, setRightTab] = useState<"elements" | "logic">("elements");
  const [showPreview, setShowPreview] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1280 : true,
  );

  // Persist on every change so preview & builder stay in sync.
  useEffect(() => {
    saveFormSteps(routeServiceId, moduleName, steps);
  }, [steps, routeServiceId, moduleName]);

  const activeStep = steps.find((s) => s.id === activeStepId) ?? steps[0];
  const activeStepIndex = steps.findIndex((s) => s.id === activeStep?.id);
  const activeSubScreen = activeStep?.subScreens.find((s) => s.id === activeSubScreenId)
    ?? activeStep?.subScreens[0]
    ?? null;
  const selectedField = selectedFieldId && activeSubScreen
    ? activeSubScreen.fields.find((f) => f.id === selectedFieldId) ?? null
    : null;

  /* ── Step navigation ── */
  const goToStep = (id: string) => {
    const step = steps.find((s) => s.id === id);
    if (!step) return;
    setActiveStepId(id);
    setActiveSubScreenId(step.subScreens[0]?.id ?? "");
    setSelectedFieldId(null);
  };

  const goStep = (dir: -1 | 1) => {
    const next = activeStepIndex + dir;
    if (next >= 0 && next < steps.length) goToStep(steps[next].id);
  };

  const addStep = () => {
    const sub: WizardSubScreen = {
      id: `sub-${Date.now()}`,
      title: copy.formBuilder.defaults.newQuestion,
      fields: [],
    };
    const step: WizardStep = {
      id: `step-${Date.now()}`,
      name: `Step ${steps.length + 1}`,
      subScreens: [sub],
    };
    setSteps((prev) => [...prev, step]);
    setActiveStepId(step.id);
    setActiveSubScreenId(sub.id);
    setSelectedFieldId(null);
  };

  const deleteStep = () => {
    if (steps.length <= 1) {
      toast({ title: copy.formBuilder.toasts.cannotDeleteLastStep, variant: "destructive" });
      return;
    }
    const idx = steps.findIndex((s) => s.id === activeStepId);
    const next = steps.filter((s) => s.id !== activeStepId);
    setSteps(next);
    const fallback = next[Math.max(0, idx - 1)];
    setActiveStepId(fallback.id);
    setActiveSubScreenId(fallback.subScreens[0]?.id ?? "");
    setSelectedFieldId(null);
    toast({ title: copy.formBuilder.toasts.stepDeleted });
  };

  /* ── Sub-screen helpers ── */
  const updateStep = (updates: Partial<WizardStep>) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === activeStepId ? { ...s, ...updates } : s)),
    );
  };

  const updateSubScreen = (subId: string, updates: Partial<WizardSubScreen>) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id === activeStepId
          ? {
              ...s,
              subScreens: s.subScreens.map((sub) =>
                sub.id === subId ? { ...sub, ...updates } : sub,
              ),
            }
          : s,
      ),
    );
  };

  const addSubScreen = () => {
    const sub: WizardSubScreen = {
      id: `sub-${Date.now()}`,
      title: copy.formBuilder.defaults.newQuestion,
      fields: [],
    };
    setSteps((prev) =>
      prev.map((s) =>
        s.id === activeStepId ? { ...s, subScreens: [...s.subScreens, sub] } : s,
      ),
    );
    setActiveSubScreenId(sub.id);
    setSelectedFieldId(null);
  };

  const deleteSubScreen = (subId: string) => {
    if (!activeStep) return;
    if (activeStep.subScreens.length <= 1) {
      toast({ title: copy.formBuilder.toasts.stepNeedsAtLeastOneSubscreen, variant: "destructive" });
      return;
    }
    setSteps((prev) =>
      prev.map((s) =>
        s.id === activeStepId
          ? { ...s, subScreens: s.subScreens.filter((sub) => sub.id !== subId) }
          : s,
      ),
    );
    if (activeSubScreenId === subId) {
      const remaining = activeStep.subScreens.filter((sub) => sub.id !== subId);
      setActiveSubScreenId(remaining[0]?.id ?? "");
    }
    setSelectedFieldId(null);
  };

  /* ── Field helpers ── */
  const addFieldFromPalette = (type: WizardFieldType, label: string) => {
    if (!activeSubScreen) return;
    const f = createField(type, label);
    setSteps((prev) =>
      prev.map((s) =>
        s.id === activeStepId
          ? {
              ...s,
              subScreens: s.subScreens.map((sub) =>
                sub.id === activeSubScreen.id
                  ? { ...sub, fields: [...sub.fields, f] }
                  : sub,
              ),
            }
          : s,
      ),
    );
    setSelectedFieldId(f.id);
  };

  const updateField = (fieldId: string, updates: Partial<WizardField>) => {
    if (!activeSubScreen) return;
    setSteps((prev) =>
      prev.map((s) =>
        s.id === activeStepId
          ? {
              ...s,
              subScreens: s.subScreens.map((sub) =>
                sub.id === activeSubScreen.id
                  ? {
                      ...sub,
                      fields: sub.fields.map((f) =>
                        f.id === fieldId ? { ...f, ...updates } : f,
                      ),
                    }
                  : sub,
              ),
            }
          : s,
      ),
    );
  };

  const updateFieldValidation = (
    fieldId: string,
    updates: Partial<NonNullable<WizardField["validation"]>>,
  ) => {
    const f = activeSubScreen?.fields.find((x) => x.id === fieldId);
    if (!f) return;
    updateField(fieldId, { validation: { ...(f.validation ?? {}), ...updates } });
  };

  const deleteField = (fieldId: string) => {
    if (!activeSubScreen) return;
    setSteps((prev) =>
      prev.map((s) =>
        s.id === activeStepId
          ? {
              ...s,
              subScreens: s.subScreens.map((sub) =>
                sub.id === activeSubScreen.id
                  ? { ...sub, fields: sub.fields.filter((f) => f.id !== fieldId) }
                  : sub,
              ),
            }
          : s,
      ),
    );
    if (selectedFieldId === fieldId) setSelectedFieldId(null);
    toast({ title: copy.formBuilder.toasts.fieldDeleted });
  };

  // Delete / Backspace key removes the selected field (when not typing in an input).
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Delete" && e.key !== "Backspace") return;
      if (!selectedFieldId) return;
      const el = document.activeElement as HTMLElement | null;
      if (el) {
        const tag = el.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable) return;
      }
      e.preventDefault();
      deleteField(selectedFieldId);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFieldId, activeSubScreen?.id, activeStepId]);

  /* ── Filtered palette ── */
  const filteredCategories = useMemo(() => {
    if (!paletteSearch.trim()) return FIELD_CATEGORIES;
    const q = paletteSearch.toLowerCase();
    return FIELD_CATEGORIES.map((c) => ({
      ...c,
      items: c.items.filter((i) => i.label.toLowerCase().includes(q)),
    })).filter((c) => c.items.length > 0);
  }, [paletteSearch]);

  /* ── Render a single field on the canvas ── */
  const renderCanvasField = (field: WizardField, subId: string) => {
    const isSelected = selectedFieldId === field.id && activeSubScreenId === subId;
    return (
      <div
        key={field.id}
        onClick={() => { setActiveSubScreenId(subId); setSelectedFieldId(field.id); }}
        className={`group relative rounded-md border p-3 cursor-pointer transition-colors ${
          isSelected
            ? "border-primary bg-primary/5 ring-1 ring-primary"
            : "border-transparent hover:border-muted-foreground/20 hover:bg-muted/30"
        }`}
      >
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); deleteField(field.id); }}
          className={`absolute top-2 right-2 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-opacity ${
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          title={copy.formBuilder.canvas.fieldDeleteTooltip}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
        <div className="flex items-center gap-1 mb-1 pr-6">
          <Label className="text-sm font-medium text-foreground">{field.label}</Label>
          {field.required && <span className="text-destructive text-xs">*</span>}
        </div>
        {(field.type === "text" || field.type === "number") && (
          <Input disabled placeholder={field.placeholder || field.label} className="bg-background" />
        )}
        {field.type === "textarea" && (
          <Textarea disabled placeholder={field.placeholder || field.label} className="bg-background min-h-[60px]" />
        )}
        {field.type === "dropdown" && (
          <Select disabled>
            <SelectTrigger className="bg-background"><SelectValue placeholder={`Select ${field.label}`} /></SelectTrigger>
          </Select>
        )}
        {field.type === "multiselect" && (
          <Select disabled>
            <SelectTrigger className="bg-background"><SelectValue placeholder={`Select ${field.label}`} /></SelectTrigger>
          </Select>
        )}
        {field.type === "radio" && (
          <div className="flex gap-4">
            {(field.options || ["Option 1", "Option 2"]).map((o) => (
              <label key={o} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <input type="radio" disabled className="accent-primary" />
                {o}
              </label>
            ))}
          </div>
        )}
        {field.type === "checkbox" && (
          <div className="flex gap-4">
            {(field.options || ["Option 1", "Option 2"]).map((o) => (
              <label key={o} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <input type="checkbox" disabled className="accent-primary" />
                {o}
              </label>
            ))}
          </div>
        )}
        {field.type === "date" && (
          <Input disabled type="date" className="bg-background" />
        )}
        {field.type === "file" && (
          <div className="border-2 border-dashed border-muted-foreground/20 rounded-md p-3 text-center text-sm text-muted-foreground">
            {copy.formBuilder.canvas.fileUploadPrompt}
          </div>
        )}
        {field.helpText && (
          <p className="mt-1 text-[11px] text-muted-foreground">{field.helpText}</p>
        )}
      </div>
    );
  };

  /* ─── Render ──────────────────────────────────────────── */

  if (!activeStep || !activeSubScreen) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] bg-background">
      {/* Header — matches other configurators (icon-only back + title) */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b bg-card">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-0">
            <h1 className="font-bold text-foreground text-sm truncate">
              {isSingleModule ? "Form" : `${moduleName} — Form`}
            </h1>
            <p className="text-xs text-muted-foreground">
              {copy.formBuilder.header.subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button
            variant={showPreview ? "default" : "outline"}
            size="sm"
            onClick={() => setShowPreview((v) => !v)}
            className="gap-1.5 h-8"
            title={copy.formBuilder.header.togglePreviewTooltip}
          >
            <Smartphone className="h-3.5 w-3.5" />
            {showPreview ? copy.formBuilder.header.togglePreviewHide : copy.formBuilder.header.togglePreviewShow}
          </Button>
          <HelpCircle className="h-4 w-4" /> Help
        </div>
      </div>

      {/* Step tabs */}
      <div className="flex items-center gap-0 border-b bg-card overflow-x-auto">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToStep(s.id)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              s.id === activeStepId
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-[11px] text-muted-foreground mr-1.5">{i + 1}</span>
            {s.name}
          </button>
        ))}
        <button
          onClick={addStep}
          className="flex items-center gap-1 px-4 py-2.5 text-sm text-primary hover:bg-primary/5 whitespace-nowrap"
        >
          <Plus className="h-3.5 w-3.5" /> {copy.formBuilder.stepTabs.addStep}
        </button>
      </div>

      {/* Main 3-column area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Field Palette */}
        <div className="w-56 shrink-0 border-r bg-card flex flex-col">
          <div className="p-3 border-b">
            <h3 className="text-sm font-semibold mb-2 text-foreground">{copy.formBuilder.fieldPalette.sectionHeading}</h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder={copy.formBuilder.fieldPalette.searchPlaceholder}
                value={paletteSearch}
                onChange={(e) => setPaletteSearch(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-4">
              {filteredCategories.map((cat) => (
                <div key={cat.name}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {cat.name}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {cat.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          onClick={() => addFieldFromPalette(item.type, item.label)}
                          className="flex flex-col items-center gap-1 p-2.5 rounded-md border border-border bg-background text-xs text-foreground hover:border-primary hover:bg-primary/5 transition-colors"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="leading-tight text-center">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Center: Canvas — sub-screens stacked */}
        <div className="flex-1 flex flex-col overflow-hidden bg-muted/30">
          <ScrollArea className="flex-1">
            <div className="p-6 max-w-2xl mx-auto space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Step {activeStepIndex + 1} of {steps.length}
                  </p>
                  <h2 className="text-lg font-semibold text-foreground">{activeStep.name}</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={addSubScreen}>
                  <Plus className="h-3.5 w-3.5 mr-1" /> {copy.formBuilder.canvas.addSubscreen}
                </Button>
              </div>

              {activeStep.subScreens.map((sub) => {
                const isActiveSub = sub.id === activeSubScreenId;
                return (
                  <div
                    key={sub.id}
                    onClick={() => { setActiveSubScreenId(sub.id); setSelectedFieldId(null); }}
                    className={`rounded-lg border-2 p-5 bg-card transition-colors cursor-pointer ${
                      isActiveSub
                        ? "border-primary border-dashed"
                        : "border-dashed border-muted-foreground/20 hover:border-muted-foreground/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-semibold text-foreground">{sub.title}</h3>
                          {sub.optional && (
                            <span className="text-[10px] uppercase tracking-wider bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                              {copy.formBuilder.canvas.subScreenBadgeOptional}
                            </span>
                          )}
                          {sub.isMap && (
                            <span className="text-[10px] uppercase tracking-wider bg-accent/15 text-accent px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                              <MapPinned className="h-3 w-3" /> {copy.formBuilder.canvas.subScreenBadgeMap}
                            </span>
                          )}
                        </div>
                        {sub.subtitle && (
                          <p className="text-xs text-muted-foreground mt-0.5">{sub.subtitle}</p>
                        )}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteSubScreen(sub.id); }}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                        title={copy.formBuilder.canvasNavigation.deleteSubscreenTooltip}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {sub.helperBanner && (
                      <div className="mb-3 mt-1 rounded-md bg-blue-50 border border-blue-200 px-3 py-2 text-[11px] text-blue-900">
                        {sub.helperBanner}
                      </div>
                    )}

                    {sub.isMap && (
                      <div className="mb-3 rounded-md border border-dashed border-muted-foreground/40 bg-muted/40 h-32 flex items-center justify-center text-xs text-muted-foreground">
                        <MapPinned className="h-4 w-4 mr-1.5" /> {copy.formBuilder.canvas.mapPlaceholder}
                      </div>
                    )}

                    <div className="space-y-1">
                      {sub.fields.length === 0 && !sub.isMap && (
                        <p className="text-xs text-muted-foreground text-center py-4">
                          {isActiveSub
                            ? copy.formBuilder.canvas.emptyActiveSubscreen
                            : copy.formBuilder.canvas.emptyInactiveSubscreen}
                        </p>
                      )}
                      {sub.fields.map((f) => renderCanvasField(f, sub.id))}
                    </div>
                  </div>
                );
              })}

              {/* Step navigation arrows */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <Button variant="outline" size="icon" disabled={activeStepIndex === 0} onClick={() => goStep(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {activeStepIndex + 1} / {steps.length}
                </span>
                <Button variant="outline" size="icon" disabled={activeStepIndex === steps.length - 1} onClick={() => goStep(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Right: Properties panel */}
        <div className="w-72 shrink-0 border-l bg-card flex flex-col">
          <div className="p-3 border-b">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-semibold text-foreground">
                {selectedField ? copy.formBuilder.propertiesPanel.headingFieldProperties : copy.formBuilder.propertiesPanel.headingSubscreenProperties}
              </h3>
              <Info className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            {selectedField && (
              <button
                onClick={() => setSelectedFieldId(null)}
                className="text-xs text-primary mt-1 hover:underline"
              >
                {copy.formBuilder.propertiesPanel.backToSubscreen}
              </button>
            )}
          </div>

          {/* Elements / Logic tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setRightTab("elements")}
              className={`flex-1 py-2 text-xs font-medium border-b-2 transition-colors ${
                rightTab === "elements" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              }`}
            >
              {copy.formBuilder.propertiesPanel.tabElements}
            </button>
            <button
              onClick={() => setRightTab("logic")}
              className={`flex-1 py-2 text-xs font-medium border-b-2 transition-colors ${
                rightTab === "logic" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              }`}
            >
              {copy.formBuilder.propertiesPanel.tabLogic}
            </button>
          </div>

          <ScrollArea className="flex-1">
            {rightTab === "elements" ? (
              selectedField ? (
                /* ── Field-level properties ── */
                <div className="p-3 space-y-4">
                  <div>
                    <Label className="text-xs">{copy.formBuilder.fieldProperties.labelFieldLabel}</Label>
                    <Input value={selectedField.label}
                      onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                      className="mt-1 h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs">{copy.formBuilder.fieldProperties.labelFieldType}</Label>
                    <Select value={selectedField.type}
                      onValueChange={(v) => updateField(selectedField.id, { type: v as WizardFieldType })}>
                      <SelectTrigger className="mt-1 h-8 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["text","number","dropdown","radio","checkbox","date","file","textarea","multiselect"].map((t) => (
                          <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">{copy.formBuilder.fieldProperties.labelPlaceholder}</Label>
                    <Input value={selectedField.placeholder}
                      onChange={(e) => updateField(selectedField.id, { placeholder: e.target.value })}
                      className="mt-1 h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs">{copy.formBuilder.fieldProperties.labelHelpText}</Label>
                    <Input value={selectedField.helpText}
                      onChange={(e) => updateField(selectedField.id, { helpText: e.target.value })}
                      className="mt-1 h-8 text-sm" />
                  </div>
                  <Separator />
                  <p className="text-xs font-semibold text-muted-foreground uppercase">{copy.formBuilder.fieldProperties.sectionValidation}</p>

                  {fieldHasRules(selectedField) && (
                    <div className="flex flex-wrap gap-1">
                      {selectedField.validation?.minLength != null && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">Min length {selectedField.validation.minLength}</span>
                      )}
                      {selectedField.validation?.maxLength != null && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">Max length {selectedField.validation.maxLength}</span>
                      )}
                      {selectedField.validation?.min != null && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">Min {selectedField.validation.min}</span>
                      )}
                      {selectedField.validation?.max != null && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">Max {selectedField.validation.max}</span>
                      )}
                      {selectedField.validation?.pattern && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary" title={selectedField.validation.pattern}>
                          Pattern{selectedField.validation.patternMessage ? `: ${selectedField.validation.patternMessage}` : ""}
                        </span>
                      )}
                      {selectedField.validation?.pastDateOnly && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">Past date only</span>
                      )}
                      {selectedField.showIf && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">Conditional</span>
                      )}
                      {selectedField.dependsOn && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">Dependent options</span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Label className="text-xs">{copy.formBuilder.fieldProperties.labelRequired}</Label>
                    <Switch checked={selectedField.required}
                      onCheckedChange={(v) => updateField(selectedField.id, { required: v })} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">{copy.formBuilder.fieldProperties.labelMinLength}</Label>
                      <Input type="number"
                        value={selectedField.validation?.minLength ?? ""}
                        onChange={(e) => updateFieldValidation(selectedField.id, {
                          minLength: e.target.value ? Number(e.target.value) : undefined,
                        })}
                        className="mt-1 h-8 text-sm" />
                    </div>
                    <div>
                      <Label className="text-xs">{copy.formBuilder.fieldProperties.labelMaxLength}</Label>
                      <Input type="number"
                        value={selectedField.validation?.maxLength ?? ""}
                        onChange={(e) => updateFieldValidation(selectedField.id, {
                          maxLength: e.target.value ? Number(e.target.value) : undefined,
                        })}
                        className="mt-1 h-8 text-sm" />
                    </div>
                  </div>
                  {selectedField.type === "number" && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">{copy.formBuilder.fieldProperties.labelMinValue}</Label>
                        <Input type="number"
                          value={selectedField.validation?.min ?? ""}
                          onChange={(e) => updateFieldValidation(selectedField.id, {
                            min: e.target.value ? Number(e.target.value) : undefined,
                          })}
                          className="mt-1 h-8 text-sm" />
                      </div>
                      <div>
                        <Label className="text-xs">{copy.formBuilder.fieldProperties.labelMaxValue}</Label>
                        <Input type="number"
                          value={selectedField.validation?.max ?? ""}
                          onChange={(e) => updateFieldValidation(selectedField.id, {
                            max: e.target.value ? Number(e.target.value) : undefined,
                          })}
                          className="mt-1 h-8 text-sm" />
                      </div>
                    </div>
                  )}
                  <div>
                    <Label className="text-xs">{copy.formBuilder.fieldProperties.labelPatternRegex}</Label>
                    <Input value={selectedField.validation?.pattern ?? ""}
                      onChange={(e) => updateFieldValidation(selectedField.id, { pattern: e.target.value || undefined })}
                      className="mt-1 h-8 text-sm" placeholder={copy.formBuilder.fieldProperties.patternPlaceholder} />
                  </div>
                  <div>
                    <Label className="text-xs">{copy.formBuilder.fieldProperties.labelPatternMessage}</Label>
                    <Input value={selectedField.validation?.patternMessage ?? ""}
                      onChange={(e) => updateFieldValidation(selectedField.id, { patternMessage: e.target.value || undefined })}
                      className="mt-1 h-8 text-sm" placeholder={copy.formBuilder.fieldProperties.patternMessagePlaceholder} />
                  </div>
                  {selectedField.type === "date" && (
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">{copy.formBuilder.fieldProperties.labelPastDateOnly}</Label>
                      <Switch checked={!!selectedField.validation?.pastDateOnly}
                        onCheckedChange={(v) => updateFieldValidation(selectedField.id, { pastDateOnly: v || undefined })} />
                    </div>
                  )}
                  {selectedField.options && (
                    <>
                      <Separator />
                      <p className="text-xs font-semibold text-muted-foreground uppercase">{copy.formBuilder.fieldProperties.sectionOptions}</p>
                      {selectedField.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <Input value={opt}
                            onChange={(e) => {
                              const opts = [...(selectedField.options || [])];
                              opts[i] = e.target.value;
                              updateField(selectedField.id, { options: opts });
                            }}
                            className="h-7 text-xs flex-1" />
                          <button
                            onClick={() => {
                              const opts = (selectedField.options || []).filter((_, j) => j !== i);
                              updateField(selectedField.id, { options: opts });
                            }}
                          >
                            <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="text-xs"
                        onClick={() => updateField(selectedField.id, {
                          options: [...(selectedField.options || []), `Option ${(selectedField.options?.length ?? 0) + 1}`],
                        })}>
                        <Plus className="h-3 w-3 mr-1" /> {copy.formBuilder.fieldProperties.addOptionButton}
                      </Button>
                    </>
                  )}
                  <Separator />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteField(selectedField.id)}
                    className="w-full text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> {copy.formBuilder.fieldProperties.deleteFieldButton}
                  </Button>
                </div>
              ) : (
                /* ── Sub-screen + Step properties ── */
                <div className="p-3 space-y-4">
                  <div>
                    <Label className="text-xs">{copy.formBuilder.subscreenProperties.labelStepName}</Label>
                    <Input value={activeStep.name}
                      onChange={(e) => updateStep({ name: e.target.value })}
                      className="mt-1 h-8 text-sm" />
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-xs">{copy.formBuilder.subscreenProperties.labelSubscreenTitle}</Label>
                    <Input value={activeSubScreen.title}
                      onChange={(e) => updateSubScreen(activeSubScreen.id, { title: e.target.value })}
                      className="mt-1 h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs">{copy.formBuilder.subscreenProperties.labelSubtitle}</Label>
                    <Textarea value={activeSubScreen.subtitle ?? ""}
                      onChange={(e) => updateSubScreen(activeSubScreen.id, { subtitle: e.target.value || undefined })}
                      className="mt-1 text-sm min-h-[50px]" />
                  </div>
                  <div>
                    <Label className="text-xs">{copy.formBuilder.subscreenProperties.labelHelperBanner}</Label>
                    <Textarea value={activeSubScreen.helperBanner ?? ""}
                      onChange={(e) => updateSubScreen(activeSubScreen.id, { helperBanner: e.target.value || undefined })}
                      className="mt-1 text-sm min-h-[50px]"
                      placeholder={copy.formBuilder.subscreenProperties.helperBannerPlaceholder} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">{copy.formBuilder.subscreenProperties.labelOptionalSubscreen}</Label>
                    <Switch checked={!!activeSubScreen.optional}
                      onCheckedChange={(v) => updateSubScreen(activeSubScreen.id, { optional: v || undefined })} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">{copy.formBuilder.subscreenProperties.labelMapPlaceholder}</Label>
                    <Switch checked={!!activeSubScreen.isMap}
                      onCheckedChange={(v) => updateSubScreen(activeSubScreen.id, { isMap: v || undefined })} />
                  </div>
                  <Separator />
                  <p className="text-xs font-semibold text-muted-foreground uppercase">{copy.formBuilder.subscreenProperties.sectionFieldsInSubscreen}</p>
                  <div className="space-y-1">
                    {activeSubScreen.fields.map((f) => (
                      <div key={f.id}
                        onClick={() => setSelectedFieldId(f.id)}
                        className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer text-sm transition-colors ${
                          selectedFieldId === f.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <GripVertical className="h-3 w-3 text-muted-foreground shrink-0" />
                          <span className="truncate">{f.label}</span>
                          {fieldHasRules(f) && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" title={copy.formBuilder.subscreenProperties.validationTooltip} />
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-[10px] px-1.5 py-0 rounded bg-secondary text-secondary-foreground">{f.type}</span>
                          <button onClick={(e) => { e.stopPropagation(); deleteField(f.id); }}>
                            <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {activeSubScreen.fields.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-4">{copy.formBuilder.subscreenProperties.noFieldsYet}</p>
                    )}
                  </div>
                  <Separator />
                  <Button variant="outline" size="sm" onClick={deleteStep}
                    disabled={steps.length <= 1}
                    className="w-full text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> {copy.formBuilder.subscreenProperties.deleteStepButton}
                  </Button>
                </div>
              )
            ) : (
              /* ── Logic tab content ── */
              <div className="p-3 space-y-4">
                {!selectedField ? (
                  <div className="text-sm text-muted-foreground text-center mt-8">
                    <p className="font-medium mb-2 text-foreground">{copy.formBuilder.logicTab.emptyStateHeading}</p>
                    <p className="text-xs">{copy.formBuilder.logicTab.emptyStateDescription}</p>
                  </div>
                ) : (
                  <>
                    {/* Conditional visibility (within sub-screen scope) */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">{copy.formBuilder.logicTab.sectionConditionalVisibility}</p>
                        {selectedField.showIf && (
                          <button
                            onClick={() => updateField(selectedField.id, { showIf: undefined })}
                            className="text-[10px] text-destructive hover:underline"
                          >{copy.formBuilder.logicTab.clearButton}</button>
                        )}
                      </div>
                      {selectedField.showIf ? (
                        (() => {
                          const parent = activeSubScreen.fields.find((x) => x.id === selectedField.showIf!.field);
                          const parentOpts = parent?.options ?? [];
                          return (
                            <div className="space-y-2 rounded-md border border-amber-200 bg-amber-50/50 p-2.5">
                              <p className="text-[11px] text-amber-900">
                                Show this field only when <strong>{parent?.label ?? selectedField.showIf.field}</strong> equals <strong>{selectedField.showIf.equals || "—"}</strong>.
                              </p>
                              <div>
                                <Label className="text-xs">{copy.formBuilder.logicTab.labelDependsOnField}</Label>
                                <Select value={selectedField.showIf.field}
                                  onValueChange={(v) => updateField(selectedField.id, { showIf: { field: v, equals: selectedField.showIf!.equals } })}>
                                  <SelectTrigger className="mt-1 h-8 text-sm"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    {activeSubScreen.fields.filter((x) => x.id !== selectedField.id).map((x) => (
                                      <SelectItem key={x.id} value={x.id}>{x.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-xs">{copy.formBuilder.logicTab.labelEquals}</Label>
                                {parentOpts.length > 0 ? (
                                  <Select value={selectedField.showIf.equals}
                                    onValueChange={(v) => updateField(selectedField.id, { showIf: { field: selectedField.showIf!.field, equals: v } })}>
                                    <SelectTrigger className="mt-1 h-8 text-sm"><SelectValue placeholder={copy.formBuilder.logicTab.chooseValuePlaceholder} /></SelectTrigger>
                                    <SelectContent>
                                      {parentOpts.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input value={selectedField.showIf.equals}
                                    onChange={(e) => updateField(selectedField.id, { showIf: { field: selectedField.showIf!.field, equals: e.target.value } })}
                                    className="mt-1 h-8 text-sm" />
                                )}
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="rounded-md border border-dashed border-border p-3 text-center">
                          <p className="text-[11px] text-muted-foreground mb-2">{copy.formBuilder.logicTab.noVisibilityRuleSet}</p>
                          <Button variant="outline" size="sm" className="text-xs h-7"
                            disabled={activeSubScreen.fields.filter((x) => x.id !== selectedField.id).length === 0}
                            onClick={() => {
                              const first = activeSubScreen.fields.find((x) => x.id !== selectedField.id);
                              if (!first) return;
                              updateField(selectedField.id, { showIf: { field: first.id, equals: first.options?.[0] ?? "" } });
                            }}>
                            <Plus className="h-3 w-3 mr-1" /> {copy.formBuilder.logicTab.addVisibilityRuleButton}
                          </Button>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {selectedField.type === "dropdown" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-muted-foreground uppercase">{copy.formBuilder.logicTab.sectionDependentOptions}</p>
                          {selectedField.dependsOn && (
                            <button onClick={() => updateField(selectedField.id, { dependsOn: undefined, dependsValueMap: undefined })}
                              className="text-[10px] text-destructive hover:underline">{copy.formBuilder.logicTab.clearButton}</button>
                          )}
                        </div>
                        {selectedField.dependsOn ? (
                          (() => {
                            const parent = activeSubScreen.fields.find((x) => x.id === selectedField.dependsOn);
                            const parentOpts = parent?.options ?? [];
                            const map = selectedField.dependsValueMap ?? {};
                            return (
                              <div className="space-y-2 rounded-md border border-amber-200 bg-amber-50/50 p-2.5">
                                <p className="text-[11px] text-amber-900">
                                  Options change based on <strong>{parent?.label ?? selectedField.dependsOn}</strong>.
                                </p>
                                <div>
                                  <Label className="text-xs">{copy.formBuilder.logicTab.labelParentField}</Label>
                                  <Select value={selectedField.dependsOn}
                                    onValueChange={(v) => updateField(selectedField.id, { dependsOn: v, dependsValueMap: {} })}>
                                    <SelectTrigger className="mt-1 h-8 text-sm"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      {activeSubScreen.fields
                                        .filter((x) => x.id !== selectedField.id && x.type === "dropdown")
                                        .map((x) => <SelectItem key={x.id} value={x.id}>{x.label}</SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-1.5">
                                  <Label className="text-xs">{copy.formBuilder.logicTab.labelOptionsPerParentValue}</Label>
                                  {parentOpts.length === 0 && (
                                    <p className="text-[10px] text-muted-foreground">{copy.formBuilder.logicTab.parentHasNoOptions}</p>
                                  )}
                                  {parentOpts.map((opt) => (
                                    <div key={opt} className="flex items-center gap-2">
                                      <span className="text-[11px] w-1/3 truncate text-foreground">{opt}</span>
                                      <Input value={(map[opt] ?? []).join(", ")}
                                        onChange={(e) => {
                                          const next = { ...map, [opt]: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) };
                                          updateField(selectedField.id, { dependsValueMap: next });
                                        }}
                                        placeholder={copy.formBuilder.logicTab.commaSeparatedPlaceholder}
                                        className="h-7 text-xs flex-1" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })()
                        ) : (
                          <div className="rounded-md border border-dashed border-border p-3 text-center">
                            <p className="text-[11px] text-muted-foreground mb-2">{copy.formBuilder.logicTab.noDependentOptionsRuleSet}</p>
                            <Button variant="outline" size="sm" className="text-xs h-7"
                              disabled={activeSubScreen.fields.filter((x) => x.id !== selectedField.id && x.type === "dropdown").length === 0}
                              onClick={() => {
                                const first = activeSubScreen.fields.find((x) => x.id !== selectedField.id && x.type === "dropdown");
                                if (!first) return;
                                updateField(selectedField.id, { dependsOn: first.id, dependsValueMap: {} });
                              }}>
                              <Plus className="h-3 w-3 mr-1" /> {copy.formBuilder.logicTab.addDependencyButton}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Far right: Mobile emulator preview */}
        {showPreview && (
          <div className="w-[320px] shrink-0 border-l bg-muted/30 overflow-y-auto py-4 px-3 flex justify-center">
            <EmulatorFrame device="mobile" label={copy.formBuilder.preview.emulatorLabel}>
              <FormPreview
                stepName={activeStep.name}
                stepIndex={activeStepIndex}
                totalSteps={steps.length}
                subScreen={activeSubScreen ?? undefined}
              />
            </EmulatorFrame>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t bg-card">
        <div className="text-[11px] text-muted-foreground">
          Editing <strong className="text-foreground">{moduleName}</strong> form. Changes are saved per module.
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-1" /> {copy.formBuilder.footer.backButton}
          </Button>
          <Button
            size="sm"
            onClick={() => {
              saveFormSteps(routeServiceId, moduleName, steps);
              toast({ title: `${moduleName} form saved`, description: copy.formBuilder.toasts.formSavedDescription });
            }}
          >
            <Save className="h-4 w-4 mr-1" /> {copy.formBuilder.footer.saveFormButton}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
