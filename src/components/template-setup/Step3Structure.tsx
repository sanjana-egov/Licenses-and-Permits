import React, { useState } from "react";
import { ArrowRight, Upload, FileSpreadsheet, X, Download, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { parseCategoriesCsv, parseSubcategoriesCsv } from "@/lib/csvParse";
import { copy } from "@/copy";

interface Props {
  hasCategories: boolean | null;
  setHasCategories: (v: boolean) => void;
  hasSubcategories: boolean | null;
  setHasSubcategories: (v: boolean) => void;
  categoriesList: string[];
  setCategoriesList: (list: string[]) => void;
  subcategoriesList: { name: string; parent: string }[];
  setSubcategoriesList: (list: { name: string; parent: string }[]) => void;
  onContinue: () => void;
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

const YesNo: React.FC<{ value: boolean | null; onChange: (v: boolean) => void }> = ({
  value,
  onChange,
}) => (
  <div className="inline-flex rounded-md border border-input p-0.5 bg-background">
    {[
      { v: true, label: copy.step3Categories.toggle.yes },
      { v: false, label: copy.step3Categories.toggle.no },
    ].map((o) => (
      <button
        key={o.label}
        type="button"
        onClick={() => onChange(o.v)}
        className={cn(
          "px-4 py-1.5 text-sm rounded-sm transition-colors",
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

const Step3Structure: React.FC<Props> = ({
  hasCategories,
  setHasCategories,
  hasSubcategories,
  setHasSubcategories,
  categoriesList,
  setCategoriesList,
  subcategoriesList,
  setSubcategoriesList,
  onContinue,
}) => {
  const [catMode, setCatMode] = useState<EntryMode>("manual");
  const [subMode, setSubMode] = useState<EntryMode>("manual");

  const [catFile, setCatFile] = useState<File | null>(null);
  const [subFile, setSubFile] = useState<File | null>(null);
  const [catPending, setCatPending] = useState<string[] | null>(null);
  const [subPending, setSubPending] = useState<{ name: string; parent: string }[] | null>(null);

  const [catInput, setCatInput] = useState("");
  const [subNameInput, setSubNameInput] = useState("");
  const [subParentInput, setSubParentInput] = useState("");

  const handleCategoriesChange = (v: boolean) => {
    setHasCategories(v);
    if (!v) {
      setHasSubcategories(false);
      setCategoriesList([]);
      setSubcategoriesList([]);
      setCatFile(null);
      setCatPending(null);
      setSubFile(null);
      setSubPending(null);
    }
  };

  const handleCatFile = async (f: File) => {
    setCatFile(f);
    try {
      const list = await parseCategoriesCsv(f);
      setCatPending(list);
    } catch {
      setCatPending([]);
    }
  };

  const confirmCats = () => {
    if (!catPending) return;
    setCategoriesList(catPending);
    // drop subcategories that referenced removed categories
    setSubcategoriesList(subcategoriesList.filter((s) => catPending.includes(s.parent)));
    setCatPending(null);
  };

  const addCat = () => {
    const t = catInput.trim();
    if (!t || categoriesList.includes(t)) return;
    setCategoriesList([...categoriesList, t]);
    setCatInput("");
  };

  const removeCat = (c: string) => {
    setCategoriesList(categoriesList.filter((x) => x !== c));
    setSubcategoriesList(subcategoriesList.filter((s) => s.parent !== c));
  };

  const handleSubFile = async (f: File) => {
    setSubFile(f);
    try {
      const list = await parseSubcategoriesCsv(f);
      setSubPending(list);
    } catch {
      setSubPending([]);
    }
  };

  const confirmSubs = () => {
    if (!subPending) return;
    setSubcategoriesList(subPending);
    setSubPending(null);
  };

  const addSub = () => {
    const name = subNameInput.trim();
    const parent = subParentInput.trim();
    if (!name || !parent) return;
    if (subcategoriesList.some((s) => s.name === name && s.parent === parent)) return;
    setSubcategoriesList([...subcategoriesList, { name, parent }]);
    setSubNameInput("");
    setSubParentInput("");
  };

  const removeSub = (name: string, parent: string) => {
    setSubcategoriesList(
      subcategoriesList.filter((s) => !(s.name === name && s.parent === parent)),
    );
  };

  const canContinue =
    hasCategories !== null &&
    (hasCategories === false ||
      (categoriesList.length > 0 &&
        hasSubcategories !== null &&
        (hasSubcategories === false || subcategoriesList.length > 0)));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">
          {copy.step3Categories.header.title}
        </h1>
        <p className="text-base text-muted-foreground mt-2">
          {copy.step3Categories.header.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {/* ── Categories ─────────────────────────────────── */}
        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="min-w-0">
              <div className="text-base font-medium text-foreground">
                {copy.step3Categories.categoriesCard.questionLabel}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">
                {copy.step3Categories.categoriesCard.exampleHint}
              </div>
            </div>
            <YesNo value={hasCategories} onChange={handleCategoriesChange} />
          </div>

          {hasCategories === true && (
            <div className="pt-1 border-t border-border space-y-3">
              <ModeTabs mode={catMode} setMode={setCatMode} />

              {catMode === "manual" ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={catInput}
                      onChange={(e) => setCatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCat();
                        }
                      }}
                      placeholder="e.g. Retail, Manufacturing…"
                      className="h-9"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addCat}
                      className="shrink-0 px-3"
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
                            onClick={() => removeCat(c)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : catPending !== null ? (
                /* CSV parsed — awaiting confirmation */
                <div className="space-y-3">
                  <div className="rounded-md border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/30 text-xs font-semibold text-foreground">
                      {catPending.length} categories parsed from {catFile?.name}
                    </div>
                    <div className="divide-y divide-border max-h-52 overflow-y-auto">
                      {catPending.map((c) => (
                        <div key={c} className="flex items-center justify-between px-3 py-2">
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
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCatFile(null);
                        setCatPending(null);
                      }}
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
                      <Check className="h-3.5 w-3.5" /> Confirm list
                    </Button>
                  </div>
                </div>
              ) : categoriesList.length > 0 ? (
                /* Already confirmed */
                <div className="flex items-center justify-between rounded-md border border-accent/30 bg-accent/5 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-sm font-medium text-foreground">
                      {catFile?.name ?? "Uploaded file"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      · {categoriesList.length} categories
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => {
                      setCatFile(null);
                      setCategoriesList([]);
                      setSubcategoriesList([]);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                /* Dropzone */
                <div className="space-y-2">
                  <label
                    htmlFor="cat-upload"
                    className="flex flex-col items-center justify-center gap-2 p-6 rounded-md border-2 border-dashed border-input hover:border-accent/50 hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm text-foreground">
                      <span className="font-medium text-accent">Upload file</span> or drag and drop
                    </div>
                    <div className="text-xs text-muted-foreground">CSV format</div>
                    <input
                      id="cat-upload"
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
                    onClick={() =>
                      downloadSample("license-categories-sample.csv", CATEGORIES_SAMPLE_CSV)
                    }
                    className="inline-flex items-center gap-1 text-xs text-accent underline-offset-2 hover:underline"
                  >
                    <Download className="h-3.5 w-3.5" /> Download sample CSV
                  </button>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* ── Subcategories ───────────────────────────────── */}
        {hasCategories === true && (
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <div className="text-base font-medium text-foreground">
                  {copy.step3Categories.subcategoriesCard.questionLabel}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">
                  {copy.step3Categories.subcategoriesCard.exampleHint}
                </div>
              </div>
              <YesNo value={hasSubcategories} onChange={setHasSubcategories} />
            </div>

            {hasSubcategories === true && (
              <div className="pt-1 border-t border-border space-y-3">
                <ModeTabs mode={subMode} setMode={setSubMode} />

                {subMode === "manual" ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                      <Input
                        value={subNameInput}
                        onChange={(e) => setSubNameInput(e.target.value)}
                        placeholder="Subcategory name"
                        className="h-9"
                      />
                      <Select value={subParentInput} onValueChange={setSubParentInput}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Parent category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoriesList.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addSub}
                        disabled={!subNameInput.trim() || !subParentInput}
                        className="h-9 px-3 shrink-0"
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
                              onClick={() => removeSub(s.name, s.parent)}
                              className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : subPending !== null ? (
                  /* CSV parsed — awaiting confirmation */
                  <div className="space-y-3">
                    <div className="rounded-md border border-border overflow-hidden">
                      <div className="px-3 py-2 bg-muted/30 text-xs font-semibold text-foreground">
                        {subPending.length} subcategories parsed from {subFile?.name}
                      </div>
                      <div className="divide-y divide-border max-h-52 overflow-y-auto">
                        {subPending.map((s) => (
                          <div
                            key={`${s.parent}::${s.name}`}
                            className="flex items-center justify-between px-3 py-2"
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
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSubFile(null);
                          setSubPending(null);
                        }}
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
                        <Check className="h-3.5 w-3.5" /> Confirm list
                      </Button>
                    </div>
                  </div>
                ) : subcategoriesList.length > 0 ? (
                  /* Already confirmed */
                  <div className="flex items-center justify-between rounded-md border border-accent/30 bg-accent/5 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4 text-accent shrink-0" />
                      <span className="text-sm font-medium text-foreground">
                        {subFile?.name ?? "Uploaded file"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        · {subcategoriesList.length} subcategories
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => {
                        setSubFile(null);
                        setSubcategoriesList([]);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  /* Dropzone */
                  <div className="space-y-2">
                    <label
                      htmlFor="sub-upload"
                      className="flex flex-col items-center justify-center gap-2 p-6 rounded-md border-2 border-dashed border-input hover:border-accent/50 hover:bg-muted/30 cursor-pointer transition-colors"
                    >
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <div className="text-sm text-foreground">
                        <span className="font-medium text-accent">Upload file</span> or drag and drop
                      </div>
                      <div className="text-xs text-muted-foreground">CSV format</div>
                      <input
                        id="sub-upload"
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
                      onClick={() =>
                        downloadSample(
                          "license-subcategories-sample.csv",
                          SUBCATEGORIES_SAMPLE_CSV,
                        )
                      }
                      className="inline-flex items-center gap-1 text-xs text-accent underline-offset-2 hover:underline"
                    >
                      <Download className="h-3.5 w-3.5" /> Download sample CSV
                    </button>
                  </div>
                )}
              </div>
            )}
          </Card>
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={onContinue} size="lg" className="gap-1.5" disabled={!canContinue}>
          {copy.step3Categories.buttons.continue} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Step3Structure;
