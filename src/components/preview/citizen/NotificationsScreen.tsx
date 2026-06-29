import React from "react";
import { Bell, Trash2, CheckCheck, BellOff } from "lucide-react";
import { usePreview } from "../PreviewContext";
import CitizenScreenShell from "./_shell/CitizenScreenShell";

const relativeTime = (ts: number): string => {
  const diffMs = Date.now() - ts;
  const diffMins = Math.floor(diffMs / 60_000);
  if (diffMins < 1)   return "Just now";
  if (diffMins < 60)  return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24)   return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 7)   return `${diffDays}d ago`;
  return new Date(ts).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
};

const NotificationsScreen: React.FC = () => {
  const {
    notifications, role,
    markNotificationsRead, clearReadNotifications,
    setScreen, applications,
  } = usePreview();

  const visible = notifications.filter(n => !n.recipientRole || n.recipientRole === role);
  const unread  = visible.filter(n => !n.read);
  const read    = visible.filter(n =>  n.read);
  const hasRead = read.length > 0;

  const appNumberFor = (id?: string) =>
    id ? applications.find(a => a.id === id)?.applicationNumber : undefined;

  return (
    <CitizenScreenShell
      onBack={() => setScreen({ type: "profile" })}
      backLabel="Profile"
    >
      {/* Page header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" style={{ color: "#1D3557" }} />
          <h1 className="text-base font-bold" style={{ color: "#1D3557" }}>Notifications</h1>
          {unread.length > 0 && (
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
              style={{ backgroundColor: "#1D3557" }}
            >
              {unread.length} new
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unread.length > 0 && (
            <button
              onClick={markNotificationsRead}
              className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full transition-colors"
              style={{ color: "#1D3557", backgroundColor: "#EAF2FB" }}
            >
              <CheckCheck className="h-3 w-3" />
              Mark all read
            </button>
          )}
          {hasRead && (
            <button
              onClick={clearReadNotifications}
              className="flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full transition-colors"
              style={{ color: "#9CA3AF", backgroundColor: "#F5F7FA" }}
            >
              <Trash2 className="h-3 w-3" />
              Clear read
            </button>
          )}
        </div>
      </div>

      {/* Empty state */}
      {visible.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div
            className="h-14 w-14 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: "#EAF2FB" }}
          >
            <BellOff className="h-6 w-6" style={{ color: "#1D3557" }} />
          </div>
          <p className="text-[13px] font-semibold" style={{ color: "#1D3557" }}>You're all caught up</p>
          <p className="text-[11px] mt-1" style={{ color: "#6B7280" }}>No notifications yet.</p>
        </div>
      )}

      {/* Unread section */}
      {unread.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-wider font-bold mb-2 px-1" style={{ color: "#6B7280" }}>
            New
          </p>
          <div className="space-y-2">
            {unread.map(n => {
              const appNo = appNumberFor(n.applicationId);
              return (
                <div
                  key={n.id}
                  className="bg-white rounded-xl p-3.5 shadow-sm"
                  style={{ border: "1px solid #E0E0E0", borderLeft: "3px solid #1D3557" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[12px] font-semibold leading-snug" style={{ color: "#1D3557" }}>{n.title}</p>
                    <span className="text-[9px] shrink-0" style={{ color: "#9CA3AF" }}>{relativeTime(n.timestamp)}</span>
                  </div>
                  <p className="text-[11px] mt-0.5 leading-snug line-clamp-2" style={{ color: "#363636" }}>{n.message}</p>
                  {appNo && (
                    <span
                      className="inline-block mt-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold"
                      style={{ backgroundColor: "#EAF2FB", color: "#1D3557" }}
                    >
                      {appNo.split("-").slice(-2).join("-")}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Read section */}
      {read.length > 0 && (
        <div>
          {unread.length > 0 && (
            <p className="text-[10px] uppercase tracking-wider font-bold mb-2 px-1" style={{ color: "#6B7280" }}>
              Earlier
            </p>
          )}
          <div className="space-y-2">
            {read.map(n => {
              const appNo = appNumberFor(n.applicationId);
              return (
                <div
                  key={n.id}
                  className="bg-white rounded-xl p-3.5 shadow-sm opacity-75"
                  style={{ border: "1px solid #E0E0E0" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[12px] font-medium leading-snug" style={{ color: "#363636" }}>{n.title}</p>
                    <span className="text-[9px] shrink-0" style={{ color: "#9CA3AF" }}>{relativeTime(n.timestamp)}</span>
                  </div>
                  <p className="text-[11px] mt-0.5 leading-snug line-clamp-2" style={{ color: "#6B7280" }}>{n.message}</p>
                  {appNo && (
                    <span
                      className="inline-block mt-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded font-medium"
                      style={{ backgroundColor: "#F5F7FA", color: "#9CA3AF" }}
                    >
                      {appNo.split("-").slice(-2).join("-")}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </CitizenScreenShell>
  );
};

export default NotificationsScreen;
