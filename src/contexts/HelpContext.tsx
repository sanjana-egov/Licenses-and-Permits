import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

// ── Types ────────────────────────────────────────────────────────────────────

export interface TourStep {
  targetId: string;
  title: string;
  content: string;
  placement: "top" | "bottom" | "left" | "right";
}

export interface OnThisPageLink {
  icon: React.ElementType;
  title: string;
  subtext: string;
  action?: () => void;
}

export interface PageHelpData {
  pageId: string;
  pageName: string;
  path: string;
  tourSteps?: TourStep[];
  onThisPageLinks?: OnThisPageLink[];
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface HelpContextValue {
  panelOpen: boolean;
  showAssistant: boolean;
  activeTourPageId: string | null;
  tourStepIndex: number;
  chatThread: Message[];
  isTyping: boolean;
  currentPageHelp: PageHelpData | null;
  openHelp: () => void;
  closeHelp: () => void;
  openAssistant: () => void;
  closeAssistant: () => void;
  registerPage: (data: PageHelpData) => void;
  startTour: (pageId: string) => void;
  advanceTour: () => void;
  retreatTour: () => void;
  endTour: () => void;
  sendMessage: (text: string) => void;
}

// ── Canned assistant responses ────────────────────────────────────────────────

const CANNED: Array<{ keywords: string[]; response: string }> = [
  {
    keywords: ["template", "service template"],
    response:
      "DIGIT Certificates ships with 10+ pre-built templates — Business License, Building Permit, Fire NOC, Trade License, Food Safety, and more. From the Templates page, pick one, run through the 4-step wizard, and your service is scaffolded and ready to configure.",
  },
  {
    keywords: ["module", "renewal", "issuance"],
    response:
      "Every service has two modules: Issuance (mandatory — handles the initial application) and Renewal (optional — lets citizens renew an existing license). Toggle modules during the template setup wizard, or change them later via Template Setup in the service header.",
  },
  {
    keywords: ["categor", "subcategor"],
    response:
      "Categories segment a service — for example, a Business License might have Retail, Hospitality, and Manufacturing. Add them manually one by one or upload a CSV. Subcategories nest under categories for finer classification.",
  },
  {
    keywords: ["role", "roles", "access", "permission"],
    response:
      "DIGIT Certificates uses role-based access. Console roles: Super Admin (full access), Admin (manage services and team), Service Owner (configure a specific service). On the service side, roles include Document Verifier and Approver — configured in the Roles Designer per service.",
  },
  {
    keywords: ["form", "forms", "field", "fields", "builder"],
    response:
      "The Form Builder lets you assemble the application form for each module. Add field types — text, number, file upload, dropdown, date, address — and they appear live in the Preview tab. Forms are configured per module (Issuance vs Renewal).",
  },
  {
    keywords: ["fee", "fees", "payment", "billing", "charge"],
    response:
      "Fees are set in the Fees configurator per service. Define flat fees, variable fees by category, or multi-tier structures. The Payments module controls how and when citizens pay — online via payment gateway or at the counter.",
  },
  {
    keywords: ["live", "go live", "publish", "deploy", "launch"],
    response:
      "When your service is ready, click Go Live from the service header. The checklist walks you through verifying your form, workflow, fee structure, documents, and team. Once all items pass, the service goes public and citizens can apply.",
  },
  {
    keywords: ["workflow", "approval", "approver", "verifier"],
    response:
      "The Workflow Designer defines the approval chain for each service. Add steps — Document Verification, Field Verification, Approval — assign roles, and set SLA timers. Workflows are per-module and can be tested in the Preview tab before going live.",
  },
  {
    keywords: ["notification", "email", "sms", "alert"],
    response:
      "Notifications fire at key events: application submitted, documents verified, approved, or rejected. Configure the trigger and message template per service under Notifications. You can preview how they appear to citizens before publishing.",
  },
  {
    keywords: ["dashboard", "metric", "metrics", "summary"],
    response:
      "The Dashboard shows a real-time count of all services — total, in draft, live, and assigned to service owners. Click Configure on any card to enter its setup, or Go Live to launch it publicly.",
  },
  {
    keywords: ["preview", "test", "citizen view"],
    response:
      "The Preview button (top-right of any service) opens a live mobile emulator showing exactly what citizens see. Switch between the Citizen and Employee views to test the full journey from application to approval.",
  },
  {
    keywords: ["document", "documents", "checklist", "attachment", "certificate"],
    response:
      "The Checklist module defines which documents citizens must upload with their application. The Documents module controls the output certificates and letters generated when a license is issued or renewed. Both are configurable per service.",
  },
  {
    keywords: ["user", "users", "team", "invite", "member", "colleague"],
    response:
      "Manage your team under Setup > Users & Access. Invite colleagues by email, assign them a console role (Admin or Service Owner), and optionally assign them to a specific service. Service owners only see and configure services assigned to them.",
  },
  {
    keywords: ["branding", "logo", "colour", "color", "theme"],
    response:
      "Branding is configured under Configuration > Branding & Theme. Set your primary colour, upload a logo, and choose a font. These changes apply across all citizen-facing screens for every service in this console.",
  },
];

const getAssistantResponse = (query: string): string => {
  const q = query.toLowerCase();
  for (const { keywords, response } of CANNED) {
    if (keywords.some((k) => q.includes(k))) return response;
  }
  return "I can help with templates, service setup, modules, categories, roles, forms, fees, workflows, notifications, and going live in DIGIT Certificates. What would you like to know?";
};

// ── Context ───────────────────────────────────────────────────────────────────

const HelpContext = createContext<HelpContextValue | null>(null);

export const useHelp = (): HelpContextValue => {
  const ctx = useContext(HelpContext);
  if (!ctx) throw new Error("useHelp must be used within HelpProvider");
  return ctx;
};

// ── Provider ──────────────────────────────────────────────────────────────────

export const HelpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const [panelOpen, setPanelOpen] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [activeTourPageId, setActiveTourPageId] = useState<string | null>(null);
  const [tourStepIndex, setTourStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [chatThread, setChatThread] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi, I'm your DIGIT Certificates assistant. Ask me anything about templates, service setup, roles, forms, fees, or going live.",
    },
  ]);

  const registryRef = useRef<Map<string, PageHelpData>>(new Map());
  const [currentPageHelp, setCurrentPageHelp] = useState<PageHelpData | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Resolve current page when location changes
  useEffect(() => {
    const path = location.pathname;
    let found: PageHelpData | null = null;
    for (const [, data] of registryRef.current) {
      if (path === data.path || path.startsWith(data.path + "/")) {
        found = data;
        break;
      }
    }
    setCurrentPageHelp(found);
  }, [location.pathname]);

  const registerPage = useCallback(
    (data: PageHelpData) => {
      registryRef.current.set(data.pageId, data);
      if (
        location.pathname === data.path ||
        location.pathname.startsWith(data.path + "/")
      ) {
        setCurrentPageHelp(data);
      }
    },
    [location.pathname],
  );

  const openHelp = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement;
    setPanelOpen(true);
    setShowAssistant(false);
  }, []);

  const closeHelp = useCallback(() => {
    setPanelOpen(false);
    setShowAssistant(false);
    setTimeout(() => triggerRef.current?.focus(), 150);
  }, []);

  const openAssistant = useCallback(() => setShowAssistant(true), []);
  const closeAssistant = useCallback(() => setShowAssistant(false), []);

  const startTour = useCallback((pageId: string) => {
    setPanelOpen(false);
    setActiveTourPageId(pageId);
    setTourStepIndex(0);
  }, []);

  const advanceTour = useCallback(() => {
    const data = registryRef.current.get(activeTourPageId ?? "");
    if (!data?.tourSteps) return;
    if (tourStepIndex < data.tourSteps.length - 1) {
      setTourStepIndex((i) => i + 1);
    } else {
      setActiveTourPageId(null);
      setTourStepIndex(0);
    }
  }, [activeTourPageId, tourStepIndex]);

  const retreatTour = useCallback(() => {
    if (tourStepIndex > 0) setTourStepIndex((i) => i - 1);
  }, [tourStepIndex]);

  const endTour = useCallback(() => {
    setActiveTourPageId(null);
    setTourStepIndex(0);
  }, []);

  const sendMessage = useCallback((text: string) => {
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };
    setChatThread((prev) => [...prev, userMsg]);
    setIsTyping(true);
    const delay = 700 + Math.random() * 500;
    setTimeout(() => {
      setChatThread((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: getAssistantResponse(text),
        },
      ]);
      setIsTyping(false);
    }, delay);
  }, []);

  return (
    <HelpContext.Provider
      value={{
        panelOpen,
        showAssistant,
        activeTourPageId,
        tourStepIndex,
        chatThread,
        isTyping,
        currentPageHelp,
        openHelp,
        closeHelp,
        openAssistant,
        closeAssistant,
        registerPage,
        startTour,
        advanceTour,
        retreatTour,
        endTour,
        sendMessage,
      }}
    >
      {children}
    </HelpContext.Provider>
  );
};
