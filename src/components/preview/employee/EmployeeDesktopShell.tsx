import React, { useState } from "react";
import { LayoutDashboard, Inbox, Search, BarChart2, Bell, LogOut, ChevronDown, UserCircle } from "lucide-react";
import { usePreview } from "../PreviewContext";
import { useBranding } from "@/hooks/useBranding";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const fmt = (ts: number) =>
  new Date(ts).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

const NAV_ITEMS = [
  { id: "employee_home",     label: "Dashboard", Icon: LayoutDashboard },
  { id: "inbox",             label: "Inbox",     Icon: Inbox },
  { id: "search",            label: "Search",    Icon: Search },
  { id: "reports",           label: "Reports",   Icon: BarChart2 },
] as const;

type NavId = typeof NAV_ITEMS[number]["id"];

interface Props {
  children: React.ReactNode;
}

const EmployeeDesktopShell: React.FC<Props> = ({ children }) => {
  const {
    screen, setScreen,
    notifications, role,
    unreadCount, markNotificationsRead,
    activeRoleId,
  } = usePreview();
  const { branding } = useBranding();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen]     = useState(false);

  const activeNav: NavId =
    screen.type === "employee_home" ? "employee_home"
    : screen.type === "inbox"       ? "inbox"
    : screen.type === "search"      ? "search"
    : screen.type === "reports"     ? "reports"
    : "employee_home";

  const visible = notifications
    .filter(n => !n.recipientRole || n.recipientRole === role)
    .slice(0, 12);

  const openNotif = () => {
    setNotifOpen(true);
    markNotificationsRead();
  };

  const roleName = activeRoleId
    ? activeRoleId.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())
    : "Employee";

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 py-2.5 bg-primary text-primary-foreground shrink-0 z-10">
        {/* Logo + portal name */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {branding.logoDataUrl ? (
            <img src={branding.logoDataUrl} alt="" className="h-5 w-5 object-contain rounded-sm bg-white/10 shrink-0" />
          ) : (
            <span className="grid grid-cols-2 gap-0.5 shrink-0">
              {[0,1,2,3].map(i => <span key={i} className="w-1.5 h-1.5 rounded-sm bg-white/80" />)}
            </span>
          )}
          <span className="text-sm font-semibold truncate">{branding.portalName}</span>
        </div>

        {/* Bell */}
        <Popover open={notifOpen} onOpenChange={(o) => { setNotifOpen(o); if (o) markNotificationsRead(); }}>
          <PopoverTrigger asChild>
            <button
              onClick={openNotif}
              className="relative p-1.5 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4 opacity-90" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" className="w-80 p-0 overflow-hidden">
            <div className="px-4 py-3 border-b bg-muted/30">
              <p className="text-sm font-semibold">Notifications</p>
            </div>
            <div className="overflow-y-auto max-h-96 divide-y">
              {visible.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-10">No notifications yet.</p>
              ) : (
                visible.map((n) => (
                  <div key={n.id} className={`px-4 py-3 ${n.read ? "" : "bg-accent/5"}`}>
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1.5">{fmt(n.timestamp)}</p>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Avatar dropdown */}
        <Popover open={profileOpen} onOpenChange={setProfileOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 transition-colors">
              <span className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold">
                PS
              </span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" className="w-56 p-2">
            <div className="px-2 py-2 mb-1 border-b">
              <div className="flex items-center gap-2">
                <UserCircle className="h-7 w-7 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">Priya Sharma</p>
                  <p className="text-[10px] text-muted-foreground truncate">priya@demo.gov</p>
                </div>
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">
                Role: <span className="font-medium text-foreground">{roleName}</span>
              </p>
            </div>
            <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </PopoverContent>
        </Popover>
      </header>

      {/* Body: sidebar + content */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <nav className="w-44 shrink-0 border-r bg-card flex flex-col py-3 gap-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const active = activeNav === id;
            return (
              <button
                key={id}
                onClick={() => setScreen({ type: id as any })}
                className={`flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${active ? "text-accent" : ""}`} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Screen outlet */}
        <main className="flex-1 min-w-0 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EmployeeDesktopShell;
