import React from "react";
import {
  User, Phone, Globe, Bell, LogOut, ChevronRight,
} from "lucide-react";
import { usePreview } from "../PreviewContext";
import CitizenScreenShell from "./_shell/CitizenScreenShell";

const MOCK_NAME   = "Priya Sharma";
const MOCK_MOBILE = "+91 98765 43210";

const ProfileScreen: React.FC = () => {
  const { setScreen, signOut, unreadCount } = usePreview();

  return (
    <CitizenScreenShell>
      {/* Avatar + name */}
      <div className="flex flex-col items-center py-5 mb-4">
        <div
          className="h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-2"
          style={{ backgroundColor: "#1D3557" }}
        >
          {MOCK_NAME.split(" ").map(w => w[0]).join("")}
        </div>
        <p className="text-[15px] font-bold" style={{ color: "#1D3557" }}>{MOCK_NAME}</p>
        <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>Citizen Account</p>
      </div>

      {/* Account info */}
      <div className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden" style={{ border: "1px solid #E0E0E0" }}>
        <p className="text-[10px] uppercase tracking-wider font-bold px-4 pt-3 pb-1" style={{ color: "#6B7280" }}>
          Account
        </p>
        <div className="divide-y" style={{ borderColor: "#F0F0F0" }}>
          <div className="flex items-center gap-3 px-4 py-3">
            <User className="h-4 w-4 shrink-0" style={{ color: "#1D3557" }} />
            <div className="flex-1 min-w-0">
              <p className="text-[10px]" style={{ color: "#9CA3AF" }}>Full name</p>
              <p className="text-[13px] font-medium" style={{ color: "#1D3557" }}>{MOCK_NAME}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <Phone className="h-4 w-4 shrink-0" style={{ color: "#1D3557" }} />
            <div className="flex-1 min-w-0">
              <p className="text-[10px]" style={{ color: "#9CA3AF" }}>Mobile number</p>
              <p className="text-[13px] font-medium" style={{ color: "#1D3557" }}>{MOCK_MOBILE}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden" style={{ border: "1px solid #E0E0E0" }}>
        <p className="text-[10px] uppercase tracking-wider font-bold px-4 pt-3 pb-1" style={{ color: "#6B7280" }}>
          Preferences
        </p>
        <div className="flex items-center gap-3 px-4 py-3">
          <Globe className="h-4 w-4 shrink-0" style={{ color: "#1D3557" }} />
          <div className="flex-1 min-w-0">
            <p className="text-[10px]" style={{ color: "#9CA3AF" }}>Language</p>
            <p className="text-[13px] font-medium" style={{ color: "#1D3557" }}>English</p>
          </div>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: "#F5F7FA", color: "#9CA3AF" }}
          >
            Coming soon
          </span>
        </div>
      </div>

      {/* Notifications link */}
      <div className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden" style={{ border: "1px solid #E0E0E0" }}>
        <button
          onClick={() => setScreen({ type: "notifications" })}
          className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"
        >
          <Bell className="h-4 w-4 shrink-0" style={{ color: "#1D3557" }} />
          <p className="flex-1 text-left text-[13px] font-medium" style={{ color: "#1D3557" }}>Notifications</p>
          {unreadCount > 0 && (
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white mr-1"
              style={{ backgroundColor: "#1D3557" }}
            >
              {unreadCount}
            </span>
          )}
          <ChevronRight className="h-4 w-4" style={{ color: "#9CA3AF" }} />
        </button>
      </div>

      {/* Sign out */}
      <button
        onClick={signOut}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[13px] font-semibold transition-colors mb-4"
        style={{ border: "1.5px solid #EF4444", color: "#EF4444", backgroundColor: "transparent" }}
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </CitizenScreenShell>
  );
};

export default ProfileScreen;
