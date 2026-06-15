import React, { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { MOCK_CREDENTIALS } from "@/data/mockCredentials";
import AuthShell from "./AuthShell";
import { copy } from "@/copy";

const ROLE_BADGE: Record<string, string> = {
  super_admin: "bg-primary/10 text-primary border-primary/20",
  admin: "bg-muted text-foreground border-border",
  service_owner: "bg-accent/10 text-accent border-accent/20",
};

const ROLE_LABEL: Record<string, string> = {
  super_admin: copy.signIn.demoCredentials.roleLabelSuperAdmin,
  admin: copy.signIn.demoCredentials.roleLabelAdmin,
  service_owner: copy.signIn.demoCredentials.roleLabelServiceOwner,
};

const SignIn: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { state, updateState } = useOnboarding();
  const [email, setEmail] = useState(state.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showHints, setShowHints] = useState(false);

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const canSubmit = emailValid && password.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const match = MOCK_CREDENTIALS.find(
      (c) => c.email.toLowerCase() === email.toLowerCase() && c.tempPassword === password
    );

    if (!match) {
      setError(copy.signIn.errors.invalidCredentials);
      return;
    }

    const alreadyReset = (state.usersWhoResetPassword || []).includes(match.email);

    updateState({
      email: match.email,
      orgName: state.orgName || "City of Cape Town",
      currentUserRole: match.role,
      isLoggedIn: true,
      isPasswordReset: alreadyReset,
    });
    onComplete();
  };

  function fillCredential(email: string, password: string) {
    setEmail(email);
    setPassword(password);
    setError("");
  }

  return (
    <AuthShell step={copy.signIn.stepIndicator.stepLabel} showSidePanel sidePanelPosition="left">
      <Card className="border-border shadow-md overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/40" />
        <form onSubmit={handleSubmit} className="px-7 py-8 space-y-6">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {copy.signIn.header.eyebrow}
            </p>
            <h1 className="text-[22px] font-semibold text-foreground tracking-tight leading-tight">
              {copy.signIn.header.heading}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {copy.signIn.header.description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-foreground">
                {copy.signIn.form.emailLabel}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder={copy.signIn.form.emailPlaceholder}
                className="h-10"
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium text-foreground">
                {copy.signIn.form.passwordLabel}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder={copy.signIn.form.passwordPlaceholder}
                className="h-10"
              />
            </div>

            {error && (
              <div className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              {copy.signIn.buttons.signIn} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Demo credentials hint */}
          <div className="border-t border-border pt-4">
            <button
              type="button"
              onClick={() => setShowHints((v) => !v)}
              className="w-full flex items-center justify-between text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="font-medium">{copy.signIn.demoCredentials.sectionToggleLabel}</span>
              {showHints ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showHints && (
              <div className="mt-3 space-y-2">
                {MOCK_CREDENTIALS.map((c) => (
                  <button
                    key={c.email}
                    type="button"
                    onClick={() => fillCredential(c.email, c.tempPassword)}
                    className="w-full text-left rounded-md border border-border bg-muted/30 hover:bg-muted/60 px-3 py-2.5 transition-colors group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-medium text-foreground">{c.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${ROLE_BADGE[c.role]}`}>
                        {ROLE_LABEL[c.role]}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground">{c.email} · {c.tempPassword}</div>
                    <div className="text-[10px] text-muted-foreground/70 mt-0.5">{c.hint}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </form>
      </Card>
    </AuthShell>
  );
};

export default SignIn;
