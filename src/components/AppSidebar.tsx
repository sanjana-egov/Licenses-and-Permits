import React from "react";
import {
  LayoutDashboard,
  FileText,
  Building2,
  Users,
  MapPin,
  Lock,
  Palette,
  Languages,
  Plug,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import cityOfCapeTownLogo from "@/assets/city-of-cape-town-logo.png";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { MOCK_CREDENTIALS } from "@/data/mockCredentials";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";


const NAV_LABELS = {
  en: {
    main: "Main",
    setup: "Setup",
    configuration: "Configuration",
    utilities: "Utilities",
    dashboard: "Dashboard",
    templates: "Templates",
    orgProfile: "Organization Profile",
    usersAccess: "Users & Access",
    appAreas: "Application Areas",
    auth: "Authentication",
    branding: "Branding & Theme",
    languages: "Languages",
    integrations: "Integrations",
    auditLog: "Audit Log",
    adminConsole: "Admin Console",
    superAdmin: "Super Admin",
    admin: "Admin",
    serviceOwner: "Service Owner",
  },
  pt: {
    main: "Principal",
    setup: "Configuração",
    configuration: "Definições",
    utilities: "Utilitários",
    dashboard: "Painel",
    templates: "Modelos",
    orgProfile: "Perfil da Organização",
    usersAccess: "Utilizadores e Acessos",
    appAreas: "Áreas de Aplicação",
    auth: "Autenticação",
    branding: "Marca e Tema",
    languages: "Idiomas",
    integrations: "Integrações",
    auditLog: "Registo de Auditoria",
    adminConsole: "Consola de Administração",
    superAdmin: "Super Administrador",
    admin: "Administrador",
    serviceOwner: "Responsável pelo Serviço",
  },
};

function NavGroup({ label, items }: { label: string; items: { title: string; url: string; icon: React.ComponentType<{ className?: string }> }[] }) {
  const { state: sidebarState } = useSidebar();
  const collapsed = sidebarState === "collapsed";
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                <NavLink
                  to={item.url}
                  end
                  className="hover:bg-sidebar-accent/40 text-sidebar-foreground/80"
                  activeClassName="bg-sidebar-accent/60 text-sidebar-foreground font-medium border-l-2 border-sidebar-primary"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>

              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const { state: sidebarState } = useSidebar();
  const collapsed = sidebarState === "collapsed";
  const { state: onboarding, signOut } = useOnboarding();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const L = NAV_LABELS[language];

  const ROLE_LABEL: Record<string, string> = {
    super_admin: L.superAdmin,
    admin: L.admin,
    service_owner: L.serviceOwner,
  };

  const mainItems = [
    { title: L.dashboard, url: "/dashboard", icon: LayoutDashboard },
    { title: L.templates, url: "/services", icon: FileText },
  ];
  const setupItems = [
    { title: L.orgProfile, url: "/setup/organization", icon: Building2 },
    { title: L.usersAccess, url: "/setup/users", icon: Users },
    { title: L.appAreas, url: "/setup/deployment", icon: MapPin },
    { title: L.auth, url: "/setup/auth", icon: Lock },
  ];
  const configItems = [
    { title: L.branding, url: "/config/branding", icon: Palette },
    { title: L.languages, url: "/config/languages", icon: Languages },
    { title: L.integrations, url: "/config/integrations", icon: Plug },
  ];
  const utilItems = [
    { title: L.auditLog, url: "/audit-log", icon: ClipboardList },
  ];

  const currentUser = MOCK_CREDENTIALS.find((c) => c.email === onboarding.email);
  const displayName = currentUser?.name || onboarding.email || "User";
  const displayRole = ROLE_LABEL[onboarding.currentUserRole] || "Admin";
  const initials = displayName.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();

  function handleSignOut() {
    signOut();
    navigate("/onboarding");
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img
            src={cityOfCapeTownLogo}
            alt="City of Cape Town"
            className="h-7 w-7 object-contain shrink-0 rounded-sm bg-white/10"
          />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">
                City of Cape Town
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{L.adminConsole}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavGroup label={L.main} items={mainItems} />
        <NavGroup label={L.setup} items={setupItems} />
        <NavGroup label={L.configuration} items={configItems} />
        <NavGroup label={L.utilities} items={utilItems} />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">{displayName}</p>
              <p className="text-[10px] text-sidebar-foreground/60 truncate">{displayRole}</p>
            </div>
          )}
          <button
            onClick={handleSignOut}
            title="Sign out"
            className="shrink-0 p-1.5 rounded-md text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/40 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
