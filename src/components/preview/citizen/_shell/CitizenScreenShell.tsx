import React from "react";
import { ArrowLeft, Bell, House, LayoutGrid, FileText, UserCircle } from "lucide-react";
import { usePreview } from "../../PreviewContext";
import { useBranding } from "@/hooks/useBranding";

interface Props {
  onBack?: () => void;
  backLabel?: string;
  progress?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { id: "home",            label: "Home",     Icon: House,       screens: ["home", "apply_intro", "apply", "renew", "success", "my_documents"] },
  { id: "catalogue",       label: "Services", Icon: LayoutGrid,  screens: ["catalogue", "service_detail"] },
  { id: "my_applications", label: "My Applications",  Icon: FileText,    screens: ["my_applications", "application_detail", "payment", "license", "demand_notice", "invoice"] },
  { id: "profile",         label: "Profile",  Icon: UserCircle,  screens: ["profile", "notifications"] },
] as const;

const CitizenScreenShell: React.FC<Props> = ({
  onBack,
  backLabel = "Back",
  progress,
  footer,
  children,
}) => {
  const {
    unreadCount,
    screen, setScreen, role,
    isAuthenticated, signIn,
  } = usePreview();
  const { branding } = useBranding();

  const showBottomNav = role === "citizen" && isAuthenticated;
  const activeTab = NAV_ITEMS.find(n => (n.screens as readonly string[]).includes(screen.type))?.id ?? "home";

  return (
    <div className="flex-1 overflow-hidden flex flex-col" style={{ backgroundColor: "#F5F7FA" }}>
      {/* Portal header */}
      <div className="text-primary-foreground px-4 py-3 flex items-center justify-between text-sm font-medium shrink-0 bg-primary">
        <div className="flex items-center gap-2 min-w-0">
          {branding.logoDataUrl ? (
            <img src={branding.logoDataUrl} alt="" className="h-5 w-5 object-contain rounded-sm bg-white/10" />
          ) : (
            <span className="grid grid-cols-2 gap-0.5">
              {[0,1,2,3].map(i => <span key={i} className="w-1.5 h-1.5 rounded-sm bg-white/80" />)}
            </span>
          )}
          <span className="truncate">{branding.portalName}</span>
        </div>

        {/* Unauthenticated: Sign In button */}
        {!isAuthenticated && (
          <button
            onClick={signIn}
            className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            Sign In
          </button>
        )}

        {/* Authenticated: bell with unread count */}
        {isAuthenticated && (
          <button
            onClick={() => setScreen({ type: "notifications" })}
            className="relative p-1 -m-1 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-white/80" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-3.5 min-w-3.5 px-1 rounded-full bg-destructive text-[9px] font-bold flex items-center justify-center text-white">
                {unreadCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Back chip */}
      {onBack && (
        <div className="px-4 pt-3 pb-1 shrink-0">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors"
            style={{ color: "#1D3557", backgroundColor: "#EAF2FB" }}
          >
            <ArrowLeft className="h-3 w-3" /> {backLabel}
          </button>
        </div>
      )}

      {/* Wizard progress slot */}
      {progress && <div className="px-4 pt-2 pb-1 shrink-0">{progress}</div>}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-3">{children}</div>

      {/* Sticky footer CTA */}
      {footer && (
        <div className="shrink-0 bg-white border-t" style={{ borderColor: "#E0E0E0" }}>
          <div className="px-4 py-3">{footer}</div>
          {branding.copyright && !showBottomNav && (
            <div className="px-4 pb-2 text-center text-[10px] text-muted-foreground">
              {branding.copyright}
            </div>
          )}
        </div>
      )}

      {/* Copyright (no footer, no bottom nav) */}
      {!footer && !showBottomNav && branding.copyright && (
        <div className="shrink-0 px-4 py-2 text-center text-[10px] text-muted-foreground bg-white/60 border-t" style={{ borderColor: "#E0E0E0" }}>
          {branding.copyright}
        </div>
      )}

      {/* Bottom navigation */}
      {showBottomNav && (
        <nav className="shrink-0 bg-white border-t flex items-stretch" style={{ borderColor: "#E0E0E0" }}>
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setScreen({ type: id as any })}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 relative transition-colors ${
                  active ? "" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <Icon
                    className="h-5 w-5"
                    style={{ color: active ? "#1D3557" : "#9CA3AF" }}
                    strokeWidth={active ? 2.5 : 1.75}
                  />
                </div>
                <span
                  className="text-[9px] font-medium"
                  style={{ color: active ? "#1D3557" : "#9CA3AF" }}
                >
                  {label}
                </span>
                {active && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full"
                    style={{ backgroundColor: "#1D3557" }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default CitizenScreenShell;
