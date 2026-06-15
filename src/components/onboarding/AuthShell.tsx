import React, { useState, useEffect } from "react";
import { Shield, FileText, Building2, User, Flame, LayoutGrid, Sliders, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import cityOfCapeTownLogo from "@/assets/city-of-cape-town-logo.png";
import { copy } from "@/copy";

// ─── Panel colour tokens ─────────────────────────────────────────────────────

const COLORS = {
  amber:  { hex: "#F59E0B", dim: "rgba(245,158,11,0.10)", ring: "rgba(245,158,11,0.40)", glow: "0 0 48px rgba(245,158,11,0.18), 0 0 0 1px rgba(245,158,11,0.30)" },
  violet: { hex: "#8B5CF6", dim: "rgba(139,92,246,0.10)", ring: "rgba(139,92,246,0.40)", glow: "0 0 48px rgba(139,92,246,0.18), 0 0 0 1px rgba(139,92,246,0.30)" },
  emerald:{ hex: "#10B981", dim: "rgba(16,185,129,0.10)", ring: "rgba(16,185,129,0.40)", glow: "0 0 48px rgba(16,185,129,0.18), 0 0 0 1px rgba(16,185,129,0.30)" },
  sky:    { hex: "#38BDF8", dim: "rgba(56,189,248,0.10)", ring: "rgba(56,189,248,0.40)", glow: "0 0 48px rgba(56,189,248,0.18), 0 0 0 1px rgba(56,189,248,0.30)" },
} as const;

type ColorKey = keyof typeof COLORS;

// ─── Mockup components ───────────────────────────────────────────────────────

interface MockupProps { c: string }  // c = hex colour for this panel

const TemplatesMockup: React.FC<MockupProps> = ({ c }) => (
  <div className="space-y-1.5 select-none">
    {[
      { name: "Business License", tags: ["Trade License", "Business Reg."], Icon: FileText },
      { name: "Building Permits", tags: ["Construction Permit", "Works Approval"], Icon: Building2 },
      { name: "Fire NOC", tags: ["Fire Permit"], Icon: Flame },
    ].map(({ name, tags, Icon }) => (
      <div key={name} className="flex items-start gap-2 rounded-xl p-2" style={{ background: `${c}14` }}>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-px" style={{ background: `${c}28` }}>
          <Icon className="h-3 w-3" style={{ color: c }} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[8.5px] font-semibold leading-tight text-white/90">{name}</p>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {tags.map((t) => (
              <span key={t} className="text-[7px] px-1 py-px rounded-sm leading-tight font-medium" style={{ background: `${c}22`, color: `${c}` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const RolesMockup: React.FC<MockupProps> = ({ c }) => (
  <div className="flex gap-2 select-none">
    {[
      { name: "Citizen", sub: "Default", steps: null },
      { name: "Doc Verifier", sub: null, steps: "2 steps" },
      { name: "Approver", sub: "Approver", steps: null },
    ].map(({ name, sub, steps }) => (
      <div key={name} className="flex-1 rounded-xl py-3 px-1.5 flex flex-col items-center gap-1.5" style={{ background: `${c}12` }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${c}25` }}>
          <User className="h-4 w-4" style={{ color: c }} />
        </div>
        <p className="text-[7.5px] font-semibold text-center leading-tight text-white/90">{name}</p>
        {sub && (
          <span className="text-[6.5px] px-2 py-px rounded-full font-medium" style={{ background: `${c}22`, color: c }}>
            {sub}
          </span>
        )}
        {steps && (
          <span className="text-[6.5px] text-white/50">{steps}</span>
        )}
      </div>
    ))}
  </div>
);

const NoCodeMockup: React.FC<MockupProps> = ({ c }) => (
  <div className="flex gap-1.5 select-none">
    {/* Field palette */}
    <div className="w-[52px] shrink-0 rounded-xl p-1.5 space-y-1" style={{ background: `${c}10` }}>
      <p className="text-[6.5px] font-bold uppercase tracking-wider text-white/35 px-0.5 mb-1.5">Fields</p>
      {[
        { label: "Name", Icon: User },
        { label: "Address", Icon: LayoutGrid },
        { label: "File", Icon: FileText },
        { label: "Slider", Icon: Sliders },
      ].map(({ label, Icon }) => (
        <div key={label} className="flex items-center gap-1 rounded-lg px-1.5 py-1 cursor-grab" style={{ background: `${c}18` }}>
          <Icon className="h-2 w-2 shrink-0" style={{ color: c }} />
          <span className="text-[7px] text-white/80">{label}</span>
        </div>
      ))}
    </div>
    {/* Canvas */}
    <div className="flex-1 rounded-xl p-1.5 space-y-1" style={{ background: `${c}08` }}>
      <p className="text-[6.5px] font-bold uppercase tracking-wider text-white/35 px-0.5 mb-1.5">Canvas</p>
      <div className="rounded-lg px-2 py-1.5 text-[8px] font-semibold" style={{ background: `${c}25`, color: c }}>
        Full Name ✦
      </div>
      <div className="rounded-lg px-2 py-1.5 text-[7.5px] text-white/60" style={{ background: `${c}12` }}>
        Phone Number
      </div>
      <div className="rounded-lg border px-2 py-1 text-[7px] text-white/30 text-center" style={{ borderColor: `${c}25`, borderStyle: "dashed" }}>
        + drop field
      </div>
    </div>
  </div>
);

const AnalyticsMockup: React.FC<MockupProps> = ({ c }) => {
  const bars = [28, 42, 35, 58, 48, 67, 55, 78, 68, 88, 75, 92];
  return (
    <div className="space-y-1.5 select-none">
      <div className="grid grid-cols-3 gap-1">
        {[
          { label: "Active", value: "18.4k" },
          { label: "Pending", value: "697" },
          { label: "SLA", value: "92%" },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl py-2 px-1 text-center" style={{ background: `${c}12` }}>
            <p className="text-[12px] font-bold leading-none" style={{ color: c }}>{value}</p>
            <p className="text-[6.5px] text-white/45 mt-0.5 font-medium">{label}</p>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div className="rounded-xl px-2 pt-1.5 pb-1 flex items-end gap-px" style={{ background: `${c}08`, height: 42 }}>
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all duration-300"
            style={{ height: `${h}%`, background: `linear-gradient(to top, ${c}90, ${c}40)` }}
          />
        ))}
      </div>
      {/* Trend line label */}
      <div className="flex items-center gap-1 px-1">
        <TrendingUp className="h-2.5 w-2.5" style={{ color: c }} />
        <span className="text-[7px] font-medium" style={{ color: `${c}` }}>Application trend · last 12 months</span>
      </div>
    </div>
  );
};

// ─── Panel definitions ───────────────────────────────────────────────────────

const PANELS: Array<{
  key: string;
  colorKey: ColorKey;
  label: string;
  desc: string;
  Mockup: React.FC<MockupProps>;
}> = [
  {
    key: "templates",
    colorKey: "amber",
    label: "Ready-to-use templates",
    desc: "10+ service types, pre-configured",
    Mockup: TemplatesMockup,
  },
  {
    key: "roles",
    colorKey: "violet",
    label: "Role-based access",
    desc: "Citizen, verifier & approver workflows",
    Mockup: RolesMockup,
  },
  {
    key: "nocode",
    colorKey: "emerald",
    label: "Configure without code",
    desc: "Visual form builder & workflow designer",
    Mockup: NoCodeMockup,
  },
  {
    key: "analytics",
    colorKey: "sky",
    label: "Monitor & manage",
    desc: "Real-time KPIs, SLA tracking, audit trails",
    Mockup: AnalyticsMockup,
  },
];

// Ambient glow blob position per panel (top-left, top-right, bottom-left, bottom-right)
const BLOB_ORIGINS = ["25% 28%", "75% 28%", "25% 72%", "75% 72%"];

// ─── Showcase ────────────────────────────────────────────────────────────────

const FeatureShowcase: React.FC = () => {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % PANELS.length), 3800);
    return () => clearInterval(id);
  }, []);

  const activeColor = COLORS[PANELS[active].colorKey];

  return (
    <div className="relative z-10 flex flex-col justify-between h-full p-10 text-white w-full">

      {/* Ambient colour blob — shifts to the active quadrant */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 55% 55% at ${BLOB_ORIGINS[active]}, ${activeColor.dim} 0%, transparent 70%)`,
        }}
      />

      {/* Top badge */}
      <div className="relative flex items-center gap-2">
        <Shield className="h-4 w-4 opacity-50" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] opacity-45">
          {copy.authShellFeatureCards.sidePanel.secureAccessBadge}
        </span>
      </div>

      {/* 2×2 feature grid */}
      <div className="relative grid grid-cols-2 gap-3">
        {PANELS.map(({ key, colorKey, label, desc, Mockup }, i) => {
          const col = COLORS[colorKey];
          const isActive = active === i;
          const isHovered = hovered === i;
          const isFocused = isActive || isHovered;

          return (
            <button
              key={key}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActive(i)}
              className={cn(
                "text-left rounded-2xl p-3.5 border transition-all duration-500 focus-visible:outline-none will-change-transform",
                isFocused ? "opacity-100" : "opacity-30",
                isHovered ? "scale-[1.06]" : isActive ? "scale-[1.02]" : "scale-100",
              )}
              style={{
                background: isFocused ? col.dim : "rgba(255,255,255,0.03)",
                borderColor: isFocused ? col.ring : "rgba(255,255,255,0.08)",
                boxShadow: isFocused ? col.glow : "none",
                transitionTimingFunction: isHovered ? "cubic-bezier(0.34,1.56,0.64,1)" : "ease",
              }}
            >
              <div className="mb-2.5 pointer-events-none">
                <Mockup c={col.hex} />
              </div>
              <div className="mt-1">
                <p className="text-[10.5px] font-semibold text-white/90 leading-tight">{label}</p>
                <p className="text-[9px] text-white/40 mt-0.5 leading-tight">{desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress pills + trust */}
      <div className="relative space-y-3">
        <div className="flex items-center gap-1.5">
          {PANELS.map((p, i) => {
            const isA = active === i;
            return (
              <button
                key={p.key}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full transition-all duration-500 focus-visible:outline-none",
                  isA ? "h-1.5 w-5 opacity-80" : "h-1.5 w-1.5 opacity-20 hover:opacity-50"
                )}
                style={{ background: isA ? COLORS[p.colorKey].hex : "#fff" }}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] opacity-40">
          <span className="w-4 h-px bg-white" />
          {copy.authShellFeatureCards.trustBar.trustedByLabel}
        </div>
      </div>
    </div>
  );
};

// ─── AuthShell ───────────────────────────────────────────────────────────────

interface AuthShellProps {
  children: React.ReactNode;
  step?: string;
  showSidePanel?: boolean;
  contentMaxWidth?: string;
  sidePanelPosition?: "left" | "right";
}

const AuthShell: React.FC<AuthShellProps> = ({
  children,
  step,
  showSidePanel = false,
  contentMaxWidth = "max-w-[520px]",
  sidePanelPosition = "right",
}) => {
  const panel = showSidePanel ? (
    <aside
      className={cn(
        "hidden lg:flex flex-1 relative overflow-hidden",
        sidePanelPosition === "right" ? "border-l border-white/5" : "border-r border-white/5"
      )}
      style={{ background: "linear-gradient(160deg, #1a4844 0%, #1e5652 50%, #122e2c 100%)" }}
    >
      {/* Static dot grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <FeatureShowcase />
    </aside>
  ) : null;

  const formArea = (
    <div
      className={cn(
        "flex-1 flex items-center justify-center px-6 py-10",
        showSidePanel && "lg:max-w-[60%]"
      )}
    >
      <div className={cn("w-full mx-auto animate-slide-up", contentMaxWidth)}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[hsl(174,30%,97%)] flex flex-col">
      {/* Brand bar */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={cityOfCapeTownLogo}
              alt={copy.authShellFeatureCards.header.logoAlt}
              className="w-7 h-7 object-contain"
            />
            <span className="text-sm font-semibold text-foreground tracking-tight">
              {copy.authShellFeatureCards.header.brandName}
            </span>
          </div>
          {step && (
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              {step}
            </span>
          )}
        </div>
      </header>

      <main className="flex-1 flex">
        {sidePanelPosition === "left" ? (
          <>
            {panel}
            {formArea}
          </>
        ) : (
          <>
            {formArea}
            {panel}
          </>
        )}
      </main>

      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{copy.authShellFeatureCards.footer.workspaceLabel}</span>
          <span>{copy.authShellFeatureCards.footer.versionLabel}</span>
        </div>
      </footer>
    </div>
  );
};

export default AuthShell;
