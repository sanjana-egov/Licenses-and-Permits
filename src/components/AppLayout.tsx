import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import BrandingScope from "@/components/BrandingScope";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useHelp } from "@/contexts/HelpContext";
import { Button } from "@/components/ui/button";
import { LogOut, HelpCircle } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";

const AppLayout: React.FC = () => {
  const { signOut } = useOnboarding();
  const { openHelp } = useHelp();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/onboarding");
  }

  return (
    <BrandingScope applyToRoot>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-12 flex items-center justify-between border-b bg-card px-2">
              <SidebarTrigger className="ml-1" />
              <div className="flex items-center gap-2 mr-2">
                <LanguageToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={openHelp}
                  className="gap-1.5 text-muted-foreground hover:text-foreground"
                  aria-label="Open help panel"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span className="text-xs">Help</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-xs">Sign out</span>
                </Button>
              </div>
            </header>
            <main className="flex-1 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </BrandingScope>
  );
};

export default AppLayout;
