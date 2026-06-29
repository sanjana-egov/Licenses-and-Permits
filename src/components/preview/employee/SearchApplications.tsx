import React, { useState, useMemo } from "react";
import { usePreview } from "../PreviewContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search as SearchIcon, X } from "lucide-react";
import { getStatusStyle } from "./InboxView";
import { format } from "date-fns";

const StagePill: React.FC<{ stateId: string; label: string }> = ({ stateId, label }) => {
  const s = getStatusStyle(stateId);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.bg} ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {label}
    </span>
  );
};

const SearchApplications: React.FC = () => {
  const { applications, setScreen, serviceName, workflowStates } = usePreview();
  const [query, setQuery]           = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [searched, setSearched]     = useState(false);

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!searched) return [];
    return applications.filter(app => {
      const name = (app.formData.fullName || app.formData.applicantName || "").toLowerCase();
      const matchesText = !q || (
        app.applicationNumber.toLowerCase().includes(q) ||
        name.includes(q) ||
        serviceName.toLowerCase().includes(q) ||
        app.status.toLowerCase().includes(q)
      );
      const matchesStage = !stageFilter || app.currentStateId === stageFilter;
      return matchesText && matchesStage;
    });
  }, [applications, q, stageFilter, searched, serviceName]);

  const handleSearch = () => setSearched(true);
  const handleClear  = () => { setQuery(""); setStageFilter(""); setSearched(false); };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-background to-sky-50/40">
      <div className="px-6 py-2 text-xs">
        <button onClick={() => setScreen({ type: "employee_home" })} className="text-accent hover:underline">Home</button>
        <span className="mx-1 text-muted-foreground">/</span>
        <span className="text-muted-foreground">Search</span>
      </div>

      <div className="px-6 pb-6">
        <h2 className="text-2xl font-bold text-accent mb-4">Search Applications</h2>

        {/* Search filters */}
        <div className="rounded-xl p-5 mb-6 bg-card border border-border/50 shadow-sm">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Application Number / Applicant / Service / Stage
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-8"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {workflowStates.length > 0 && (
              <div className="min-w-[160px]">
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Stage</label>
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                >
                  <option value="">All stages</option>
                  {workflowStates.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            )}

            <button onClick={handleClear} className="text-sm text-muted-foreground hover:text-accent self-end pb-2 px-1">
              Clear
            </button>
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-accent to-teal-600 text-accent-foreground hover:from-accent/90 hover:to-teal-600/90 shadow-md shadow-accent/20 gap-1.5 self-end"
            >
              <SearchIcon className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        {/* Results */}
        {searched && (
          <div className="rounded-xl overflow-hidden bg-card border border-border/50 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-accent/5 to-transparent hover:bg-gradient-to-r hover:from-accent/5 hover:to-transparent">
                  <TableHead className="text-accent font-semibold">Application</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <svg className="w-16 h-16 mx-auto mb-2 opacity-60" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                        <circle cx="28" cy="28" r="16" stroke="hsl(var(--accent) / 0.5)" strokeWidth="3" fill="hsl(var(--accent) / 0.05)" />
                        <line x1="40" y1="40" x2="52" y2="52" stroke="hsl(var(--accent) / 0.5)" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      <p className="text-sm font-semibold text-foreground">No matching applications</p>
                      <p className="text-xs text-muted-foreground mt-1">Try adjusting your search.</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  results.map((app) => {
                    const lastUpdated = app.timeline.length > 0
                      ? app.timeline[app.timeline.length - 1].at
                      : app.createdAt;
                    const applicant = app.formData.fullName || app.formData.applicantName || "—";
                    return (
                      <TableRow
                        key={app.id}
                        className="cursor-pointer hover:bg-accent/5 border-l-4 border-l-transparent hover:border-l-accent transition-colors"
                        onClick={() => setScreen({ type: "application_review", applicationId: app.id })}
                      >
                        <TableCell className="text-accent text-xs font-mono font-semibold">{app.applicationNumber}</TableCell>
                        <TableCell className="text-sm text-foreground">{applicant}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{serviceName}</TableCell>
                        <TableCell><StagePill stateId={app.currentStateId} label={app.status} /></TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {format(new Date(lastUpdated), "dd MMM yyyy")}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            {results.length > 0 && (
              <div className="px-4 py-2 border-t text-xs text-muted-foreground flex items-center justify-end gap-4 bg-muted/30">
                <span>{results.length} result{results.length !== 1 ? "s" : ""}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchApplications;
