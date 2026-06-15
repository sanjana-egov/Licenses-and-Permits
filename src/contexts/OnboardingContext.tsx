import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { type StoredAuditEvent, makeAuditId, roleToActor } from "@/lib/auditHelpers";

export type ApprovalLevel = "single" | "two-level" | "multi-level";
export type AvailabilityScope = "entire_state" | "cities" | "districts" | "departments" | "custom";
export type AuthMethod = "email" | "sso" | "otp";
export type ServiceStatus = "draft" | "published" | "live" | "assigned";
export type AccessType = "self_registration" | "pre_registered";
export type RoleAuthMethod = "mobile_otp" | "email_otp" | "email_password";

export interface RoleUser {
  id: string;
  name: string;
  email: string;
}

export interface RoleAccessConfig {
  roleId: string;
  roleName: string;
  accessType: AccessType;
  authMethod: RoleAuthMethod;
  users: RoleUser[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "operator" | "approver";
}

export interface BrandingConfig {
  presetId?: string;
  primaryColor: string;
  accentColor?: string;
  font: string;
  buttonRadius: string;
  cardRadius: string;
  logoDataUrl?: string;
  portalName: string;
  copyright: string;
}

export interface TemplateSetup {
  hasCategories: boolean;
  hasSubcategories: boolean;
  categoriesFileName?: string;
  subcategoriesFileName?: string;
  categoriesList?: string[];
  subcategoriesList?: { name: string; parent: string }[];
}

export type RenewalMode = "global" | "by_category" | "by_subcategory";

export interface RenewalPolicy {
  mode: RenewalMode;
  globalMonths: number;
  perCategory: Record<string, number>;
  perSubcategory: Record<string, number>;
}

export type WorkflowScope = "shared" | "by_category" | "by_subcategory";

export interface ServiceItem {
  id: string;
  name: string;
  templateId: string;
  status: ServiceStatus;
  customModules: string[];
  isPublished: boolean;
  isLive: boolean;
  deployment: {
    availabilityScope: AvailabilityScope;
    selectedItems: string[];
  };
  teamMembers: TeamMember[];
  authMethod: AuthMethod;
  roleAccess?: RoleAccessConfig[];
  assignedOwners?: { name: string; email: string }[];
  boundaryHierarchyId?: string;
  subdomain?: string;
  branding?: BrandingConfig;
  templateSetup?: TemplateSetup;
  renewalPolicy?: RenewalPolicy;
  workflowScope?: WorkflowScope;
}

export type PlatformRole = "super_admin" | "admin" | "service_owner";

// Boundary data types
export type BoundarySource = "preloaded" | "shapefile" | "excel";
export type BoundaryDataMode = "geographic" | "limited";
export type HierarchyStatus = "active" | "inactive";

export interface BoundaryLevel {
  id: string;
  label: string;
  originalLabel: string;
  count: number;
  sampleNames: string[];
}

export interface BoundaryHierarchy {
  id: string;
  name: string;
  isDefault: boolean;
  status: HierarchyStatus;
  dataMode: BoundaryDataMode;
  source: BoundarySource;
  levels: BoundaryLevel[];
  operationalLevelId: string;
  usedByServices: string[];
  createdBy: "admin" | "service_owner";
  createdAt: string;
}

export interface InvitedAdmin {
  id: string;
  email: string;
  status: "invited" | "active";
}

export interface OnboardingState {
  currentStep: number;
  email: string;
  orgName: string;
  country: string;
  department: string;
  currency: string;
  currencySymbol: string;
  phoneCountryCode: string;
  language: string;
  logoUrl: string;
  themeColor: string;
  selectedTemplateId: string;
  serviceName: string;
  approvalLevel: ApprovalLevel;
  customModules: string[];
  serviceStatus: ServiceStatus;
  deployment: {
    availabilityScope: AvailabilityScope;
    selectedItems: string[];
  };
  teamMembers: TeamMember[];
  authMethod: AuthMethod;
  goLiveStep: number;
  isOnboardingComplete: boolean;
  isActivated: boolean;
  isLoggedIn: boolean;
  isPasswordReset: boolean;
  isPublished: boolean;
  isLive: boolean;
  services: ServiceItem[];
  activeServiceId: string;
  platformBranding?: BrandingConfig;
  // RBAC: current user role for demo view-switching
  currentUserRole: PlatformRole;
  // Tracks which post-confirm-org onboarding step we're on (0=ConfirmOrg, 3=AddAdmins, 4=SelectTemplate, 5=AddServiceOwners)
  onboardingStep: number;
  invitedAdmins: InvitedAdmin[];
  // Service Owner guided setup: serviceId -> array of completed step indices [0,1,2,3]
  serviceOwnerSetupProgress: Record<string, number[]>;
  // Emails that have already completed the one-time password reset
  usersWhoResetPassword: string[];
  // Boundary hierarchies configured for this org
  boundaryHierarchies: BoundaryHierarchy[];
  isBoundarySetupSkipped: boolean;
  // Real audit events captured from user actions
  auditEvents: StoredAuditEvent[];
  // Regional format settings
  dateFormat: string;
  financialYearStart: string;
  // Active notification channels (email, sms, push)
  activeNotificationChannels: string[];
}

const initialState: OnboardingState = {
  currentStep: 0,
  email: "",
  orgName: "",
  country: "",
  department: "",
  currency: "",
  currencySymbol: "",
  phoneCountryCode: "",
  language: "English",
  logoUrl: "",
  themeColor: "",
  selectedTemplateId: "",
  serviceName: "",
  approvalLevel: "single",
  customModules: [],
  serviceStatus: "draft",
  deployment: {
    availabilityScope: "entire_state",
    selectedItems: [],
  },
  teamMembers: [],
  authMethod: "email",
  goLiveStep: 0,
  isOnboardingComplete: false,
  isActivated: false,
  isLoggedIn: false,
  isPasswordReset: false,
  isPublished: false,
  isLive: false,
  services: [],
  activeServiceId: "",
  platformBranding: undefined,
  currentUserRole: "super_admin",
  onboardingStep: 0,
  invitedAdmins: [],
  serviceOwnerSetupProgress: {},
  usersWhoResetPassword: [],
  boundaryHierarchies: [],
  isBoundarySetupSkipped: false,
  auditEvents: [],
  dateFormat: "DD/MM/YYYY",
  financialYearStart: "April (Apr – Mar)",
  activeNotificationChannels: ["email"],
};

interface OnboardingContextType {
  state: OnboardingState;
  updateState: (updates: Partial<OnboardingState>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetOnboarding: () => void;
  addService: (service: ServiceItem) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  setActiveService: (id: string) => void;
  getActiveService: () => ServiceItem | undefined;
  updateActiveServiceBranding: (branding: BrandingConfig) => void;
  updatePlatformBranding: (branding: BrandingConfig) => void;
  completeServiceOwnerStep: (serviceId: string, step: number) => void;
  signOut: () => void;
  addBoundaryHierarchy: (h: BoundaryHierarchy) => void;
  updateBoundaryHierarchy: (id: string, patch: Partial<BoundaryHierarchy>) => void;
  addAuditEvent: (event: Omit<StoredAuditEvent, "id" | "timestamp">) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const STORAGE_KEY = "lnp-onboarding-state";

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<OnboardingState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = { ...initialState, ...JSON.parse(saved) };
        // Migrate: if there's a serviceName but no applications array, create one
        if (parsed.serviceName && (!parsed.services || parsed.services.length === 0)) {
          const migratedService: ServiceItem = {
            id: parsed.selectedTemplateId || "application-1",
            name: parsed.serviceName,
            templateId: parsed.selectedTemplateId || "",
            status: parsed.serviceStatus || "draft",
            customModules: parsed.customModules || [],
            isPublished: parsed.isPublished || false,
            isLive: parsed.isLive || false,
            deployment: parsed.deployment || { availabilityScope: "entire_state", selectedItems: [] },
            teamMembers: parsed.teamMembers || [],
            authMethod: parsed.authMethod || "email",
          };
          parsed.services = [migratedService];
          parsed.activeServiceId = migratedService.id;
        }
        return parsed;
      }
      return initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = useCallback((updates: Partial<OnboardingState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  }, []);

  const addAuditEvent = useCallback((event: Omit<StoredAuditEvent, "id" | "timestamp">) => {
    setState((prev) => {
      const full: StoredAuditEvent = {
        ...event,
        id: makeAuditId(event.category),
        timestamp: new Date().toISOString(),
      };
      return { ...prev, auditEvents: [full, ...(prev.auditEvents ?? [])] };
    });
  }, []);

  const addService = useCallback((service: ServiceItem) => {
    setState((prev) => {
      const event: StoredAuditEvent = {
        id: makeAuditId("governance"),
        timestamp: new Date().toISOString(),
        category: "governance",
        action: "Service created",
        actor: roleToActor(prev.currentUserRole),
        entity: service.name,
        entityType: "Service",
        result: "success",
        after: { name: service.name, templateId: service.templateId },
      };
      return {
        ...prev,
        services: [...prev.services, service],
        activeServiceId: service.id,
        auditEvents: [event, ...(prev.auditEvents ?? [])],
      };
    });
  }, []);

  const updateService = useCallback((id: string, updates: Partial<ServiceItem>) => {
    setState((prev) => {
      const svc = prev.services.find((s) => s.id === id);
      const newEvents: StoredAuditEvent[] = [];
      if (svc) {
        if ("status" in updates && updates.status !== svc.status) {
          const action = updates.status === "live"
            ? "Service published"
            : `Service ${updates.status}`;
          newEvents.push({
            id: makeAuditId("governance"),
            timestamp: new Date().toISOString(),
            category: "governance",
            action,
            actor: roleToActor(prev.currentUserRole),
            entity: svc.name,
            entityType: "Service",
            service: svc.name,
            result: "success",
            before: { status: svc.status },
            after: { status: updates.status },
          });
        }
        if ("boundaryHierarchyId" in updates && updates.boundaryHierarchyId !== svc.boundaryHierarchyId) {
          newEvents.push({
            id: makeAuditId("governance"),
            timestamp: new Date().toISOString(),
            category: "governance",
            action: "Boundary assigned to service",
            actor: roleToActor(prev.currentUserRole),
            entity: svc.name,
            entityType: "Service",
            service: svc.name,
            result: "success",
            after: { boundaryHierarchyId: updates.boundaryHierarchyId },
          });
        }
      }
      return {
        ...prev,
        services: prev.services.map((s) => (s.id === id ? { ...s, ...updates } : s)),
        auditEvents: [...newEvents, ...(prev.auditEvents ?? [])],
      };
    });
  }, []);

  const deleteService = useCallback((id: string) => {
    // Best-effort cleanup of per-service localStorage entries (formbuilder:{id}:..., {prefix}:{id}:{module})
    try {
      const toRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k) continue;
        if (k.includes(`:${id}:`) || k.endsWith(`:${id}`)) toRemove.push(k);
      }
      toRemove.forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore storage errors
    }
    setState((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
      activeServiceId: prev.activeServiceId === id ? "" : prev.activeServiceId,
    }));
  }, []);

  const setActiveService = useCallback((id: string) => {
    setState((prev) => ({ ...prev, activeServiceId: id }));
  }, []);

  const getActiveService = useCallback(() => {
    return state.services.find((s) => s.id === state.activeServiceId);
  }, [state.services, state.activeServiceId]);

  const updateActiveServiceBranding = useCallback((branding: BrandingConfig) => {
    setState((prev) => ({
      ...prev,
      services: prev.services.map((s) =>
        s.id === prev.activeServiceId ? { ...s, branding } : s
      ),
    }));
  }, []);

  const updatePlatformBranding = useCallback((branding: BrandingConfig) => {
    setState((prev) => {
      const event: StoredAuditEvent = {
        id: makeAuditId("config"),
        timestamp: new Date().toISOString(),
        category: "config",
        action: "Platform branding updated",
        actor: roleToActor(prev.currentUserRole),
        entity: "Workspace theme",
        entityType: "Branding",
        module: "Branding",
        result: "success",
        after: { primaryColor: branding.primaryColor, font: branding.font },
      };
      return {
        ...prev,
        platformBranding: branding,
        auditEvents: [event, ...(prev.auditEvents ?? [])],
      };
    });
  }, []);

  const completeServiceOwnerStep = useCallback((serviceId: string, step: number) => {
    setState((prev) => {
      const existing = prev.serviceOwnerSetupProgress?.[serviceId] || [];
      const updated = Array.from(new Set([...existing, step]));
      return { ...prev, serviceOwnerSetupProgress: { ...prev.serviceOwnerSetupProgress, [serviceId]: updated } };
    });
  }, []);

  const addBoundaryHierarchy = useCallback((h: BoundaryHierarchy) => {
    setState((prev) => {
      const isFirst = prev.boundaryHierarchies.length === 0;
      const updated = isFirst ? { ...h, isDefault: true } : h;
      const event: StoredAuditEvent = {
        id: makeAuditId("governance"),
        timestamp: new Date().toISOString(),
        category: "governance",
        action: "Boundary hierarchy created",
        actor: roleToActor(prev.currentUserRole),
        entity: h.name,
        entityType: "BoundaryHierarchy",
        result: "success",
        after: { name: h.name, source: h.source, dataMode: h.dataMode, isDefault: updated.isDefault },
      };
      return {
        ...prev,
        boundaryHierarchies: [...prev.boundaryHierarchies, updated],
        auditEvents: [event, ...(prev.auditEvents ?? [])],
      };
    });
  }, []);

  const updateBoundaryHierarchy = useCallback((id: string, patch: Partial<BoundaryHierarchy>) => {
    setState((prev) => {
      const h = prev.boundaryHierarchies.find((x) => x.id === id);
      const newEvents: StoredAuditEvent[] = [];
      if (h) {
        if ("status" in patch && patch.status !== h.status) {
          newEvents.push({
            id: makeAuditId("governance"),
            timestamp: new Date().toISOString(),
            category: "governance",
            action: patch.status === "active" ? "Hierarchy activated" : "Hierarchy deactivated",
            actor: roleToActor(prev.currentUserRole),
            entity: h.name,
            entityType: "BoundaryHierarchy",
            result: "success",
            before: { status: h.status },
            after: { status: patch.status },
          });
        }
        if ("isDefault" in patch && patch.isDefault && !h.isDefault) {
          newEvents.push({
            id: makeAuditId("governance"),
            timestamp: new Date().toISOString(),
            category: "governance",
            action: "Default hierarchy changed",
            actor: roleToActor(prev.currentUserRole),
            entity: h.name,
            entityType: "BoundaryHierarchy",
            result: "success",
            after: { isDefault: true },
          });
        }
      }
      return {
        ...prev,
        boundaryHierarchies: prev.boundaryHierarchies.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        auditEvents: [...newEvents, ...(prev.auditEvents ?? [])],
      };
    });
  }, []);

  const signOut = useCallback(() => {
    setState((prev) => {
      const event: StoredAuditEvent = {
        id: makeAuditId("governance"),
        timestamp: new Date().toISOString(),
        category: "governance",
        action: "User signed out",
        actor: roleToActor(prev.currentUserRole),
        entity: prev.email || "Admin",
        entityType: "User",
        result: "success",
      };
      return {
        ...prev,
        isLoggedIn: false,
        isPasswordReset: false,
        isOnboardingComplete: false,
        onboardingStep: 0,
        email: "",
        currentUserRole: "super_admin",
        auditEvents: [event, ...(prev.auditEvents ?? [])],
      };
    });
  }, []);

  return (
    <OnboardingContext.Provider value={{
      state, updateState, nextStep, prevStep, goToStep, resetOnboarding,
      addService, updateService, deleteService, setActiveService, getActiveService,
      updateActiveServiceBranding, updatePlatformBranding, completeServiceOwnerStep, signOut,
      addBoundaryHierarchy, updateBoundaryHierarchy, addAuditEvent,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error("useOnboarding must be used within OnboardingProvider");
  return context;
};
