import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Search,
  Bot,
  MapPin,
  PlayCircle,
  BookOpen,
  FileText,
  ExternalLink,
  ChevronRight,
  Compass,
  ArrowRight,
} from "lucide-react";
import { useHelp } from "@/contexts/HelpContext";
import AssistantChat from "./AssistantChat";
import { cn } from "@/lib/utils";

const OTHER_RESOURCES = [
  { icon: PlayCircle, label: "Video tutorials", href: "#" },
  { icon: BookOpen, label: "Help centre", href: "#" },
  { icon: FileText, label: "User guide", href: "#" },
  { icon: ExternalLink, label: "DIGIT documentation", href: "#" },
];

const FOCUSABLE_SELECTORS = [
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "a[href]",
].join(", ");

const HelpPanel: React.FC = () => {
  const {
    panelOpen,
    showAssistant,
    currentPageHelp,
    closeHelp,
    openAssistant,
    startTour,
  } = useHelp();

  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap + Esc
  useEffect(() => {
    if (!panelOpen) return;

    // Focus close button on open
    const raf = requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHelp();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(raf);
    };
  }, [panelOpen, closeHelp]);

  // Reset state when panel closes
  useEffect(() => {
    if (!panelOpen) setQuery("");
  }, [panelOpen]);

  if (!panelOpen) return null;

  const q = query.toLowerCase().trim();

  const hasTour = (currentPageHelp?.tourSteps?.length ?? 0) > 0;
  const hasPageLinks = (currentPageHelp?.onThisPageLinks?.length ?? 0) > 0;

  const filteredPageLinks = hasPageLinks
    ? (currentPageHelp!.onThisPageLinks!).filter(
        (l) => !q || l.title.toLowerCase().includes(q) || l.subtext.toLowerCase().includes(q),
      )
    : [];

  const filteredResources = OTHER_RESOURCES.filter(
    (r) => !q || r.label.toLowerCase().includes(q),
  );

  const showGettingStarted = hasTour && (!q || "tour guide screen know".includes(q));

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 animate-fade-in"
        onClick={closeHelp}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-panel-title"
        className="fixed inset-y-0 right-0 z-50 w-[380px] flex flex-col bg-card border-l border-border shadow-2xl animate-slide-in-right"
      >
        {showAssistant ? (
          <AssistantChat />
        ) : (
          <>
            {/* ── Header ──────────────────────────────────────────── */}
            <div className="px-5 pt-5 pb-4 border-b border-border shrink-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2
                    id="help-panel-title"
                    className="text-base font-semibold text-foreground"
                  >
                    Help
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {currentPageHelp
                      ? `You're on the ${currentPageHelp.pageName}`
                      : "DIGIT Certificates admin console"}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeHelp}
                  aria-label="Close help panel"
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors shrink-0 mt-0.5"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Search */}
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1">
                <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search help…"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

            {/* ── Scrollable body ──────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto">

              {/* Ask the assistant CTA */}
              {(!q || "ask assistant question help".includes(q)) && (
                <div className="px-4 pt-4">
                  <button
                    type="button"
                    onClick={openAssistant}
                    className="w-full text-left rounded-xl border-2 border-sky-400/50 bg-sky-50/60 dark:bg-sky-950/25 dark:border-sky-500/30 px-4 py-3.5 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sky-500/15 flex items-center justify-center shrink-0">
                        <Bot className="h-4.5 w-4.5 text-sky-600 dark:text-sky-400" style={{ width: 18, height: 18 }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">Ask the assistant</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                          Get answers about configuring services, templates, and workflows in DIGIT Certificates
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  </button>
                </div>
              )}

              {/* Getting started */}
              {showGettingStarted && (
                <div className="px-4 pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">
                    Getting started
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      currentPageHelp && startTour(currentPageHelp.pageId)
                    }
                    className="w-full text-left flex items-center gap-3 rounded-lg border border-accent/25 bg-accent/6 px-3.5 py-3 hover:bg-accent/10 hover:border-accent/40 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                      <Compass className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">Know what's on this screen</p>
                      <p className="text-xs text-muted-foreground mt-0.5">A quick guided tour of this page</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  </button>
                </div>
              )}

              {/* On this page */}
              {filteredPageLinks.length > 0 && (
                <div className="px-4 pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">
                    On this page
                  </p>
                  <div className="space-y-0.5">
                    {filteredPageLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <button
                          key={link.title}
                          type="button"
                          onClick={() => {
                            link.action?.();
                            if (!link.action) return;
                          }}
                          className={cn(
                            "w-full text-left flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors group",
                            link.action
                              ? "hover:bg-muted/50 cursor-pointer"
                              : "cursor-default",
                          )}
                        >
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{link.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{link.subtext}</p>
                          </div>
                          {link.action && (
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Other resources */}
              {filteredResources.length > 0 && (
                <div className="px-4 pt-5 pb-6">
                  <div className="border-t border-border mb-4" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-2">
                    Other resources
                  </p>
                  <div className="space-y-0.5">
                    {filteredResources.map((r) => {
                      const Icon = r.icon;
                      return (
                        <a
                          key={r.label}
                          href={r.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors group"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm text-foreground flex-1">{r.label}</span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Empty search state */}
              {q &&
                !showGettingStarted &&
                filteredPageLinks.length === 0 &&
                filteredResources.length === 0 && (
                  <div className="px-4 py-10 text-center">
                    <p className="text-sm text-muted-foreground">
                      No results for "{query}"
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Try asking the assistant instead
                    </p>
                  </div>
                )}
            </div>

            {/* ── Footer ───────────────────────────────────────────── */}
            <div className="px-5 py-3 border-t border-border shrink-0">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-muted-foreground/50 shrink-0" />
                <p className="text-[10px] text-muted-foreground">
                  City of Cape Town · DIGIT Certificates admin console
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HelpPanel;
