import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuditLog } from "@/hooks/useAuditLog";
import type { RoleDef, UserRow } from "@/data/usersAccess";
import { copy } from "@/copy";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  roles: RoleDef[];
  services: string[];
  onInvite: (users: UserRow[]) => void;
}

export function InviteUserSheet({ open, onOpenChange, roles, services, onInvite }: Props) {
  const { logGovernance } = useAuditLog();
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [roleId, setRoleId] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const selectedRole = useMemo(() => roles.find((r) => r.id === roleId), [roles, roleId]);
  const needsServices = selectedRole?.type === "service";

  function reset() {
    setEmailInput(""); setEmails([]); setRoleId(""); setSelectedServices([]);
  }

  function pushEmail() {
    const v = emailInput.trim().replace(/,$/, "");
    if (!v) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      toast({ title: copy.inviteUserSheet.toasts.invalidEmailTitle, description: v, variant: "destructive" });
      return;
    }
    if (!emails.includes(v)) setEmails([...emails, v]);
    setEmailInput("");
  }

  function submit() {
    if (emails.length === 0) { toast({ title: copy.inviteUserSheet.toasts.noEmailTitle }); return; }
    if (!selectedRole) { toast({ title: copy.inviteUserSheet.toasts.noRoleTitle }); return; }
    if (needsServices && selectedServices.length === 0) { toast({ title: copy.inviteUserSheet.toasts.noServiceTitle }); return; }

    const rows: UserRow[] = emails.map((e, i) => ({
      id: `inv_${Date.now()}_${i}`,
      name: e.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email: e,
      avatarColor: ["primary", "accent", "warning", "success"][i % 4],
      roleId: selectedRole.id,
      services: needsServices ? selectedServices : ["Platform"],
      status: "invited",
      lastActiveISO: null,
    }));
    onInvite(rows);
    toast({ title: `Invited ${rows.length} ${rows.length === 1 ? "person" : "people"}` });
    logGovernance({
      action: "User invited",
      entity: emails.join(", "),
      entityType: "User",
      after: { role: selectedRole.name, services: needsServices ? selectedServices : ["Platform"] },
    });
    reset();
    onOpenChange(false);
  }

  function toggleService(s: string) {
    setSelectedServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  const systemRoles = roles.filter((r) => r.type === "system");
  const serviceRoles = roles.filter((r) => r.type === "service");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle>{copy.inviteUserSheet.header.title}</SheetTitle>
          <SheetDescription>{copy.inviteUserSheet.header.description}</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div className="space-y-2">
            <Label>{copy.inviteUserSheet.emailField.label}</Label>
            <div className="flex flex-wrap gap-1.5 p-2 rounded-md border border-input bg-background min-h-10">
              {emails.map((e) => (
                <Badge key={e} variant="secondary" className="gap-1 pl-2 pr-1">
                  {e}
                  <button onClick={() => setEmails(emails.filter((x) => x !== e))} className="hover:bg-muted rounded p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <input
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); pushEmail(); } }}
                onBlur={pushEmail}
                placeholder={emails.length === 0 ? copy.inviteUserSheet.emailField.placeholder : ""}
                className="flex-1 min-w-[140px] bg-transparent text-sm outline-none px-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">{copy.inviteUserSheet.emailField.helperText}</p>
          </div>

          <div className="space-y-2">
            <Label>{copy.inviteUserSheet.roleField.label}</Label>
            <Select value={roleId} onValueChange={(v) => { setRoleId(v); setSelectedServices([]); }}>
              <SelectTrigger><SelectValue placeholder={copy.inviteUserSheet.roleField.selectPlaceholder} /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{copy.inviteUserSheet.roleField.systemRolesGroupLabel}</SelectLabel>
                  {systemRoles.map((r) => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>{copy.inviteUserSheet.roleField.serviceRolesGroupLabel}</SelectLabel>
                  {serviceRoles.map((r) => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedRole && <p className="text-xs text-muted-foreground">{selectedRole.description}</p>}
          </div>

          {needsServices && (
            <div className="space-y-2">
              <Label>{copy.inviteUserSheet.servicesField.label}</Label>
              <div className="rounded-md border border-border divide-y divide-border">
                {services.map((s) => (
                  <label key={s} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-muted/40">
                    <Checkbox checked={selectedServices.includes(s)} onCheckedChange={() => toggleService(s)} />
                    <span className="text-sm">{s}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{copy.inviteUserSheet.servicesField.helperText}</p>
            </div>
          )}

        </div>

        <SheetFooter className="px-6 py-4 border-t border-border flex-row gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="flex-1">{copy.inviteUserSheet.buttons.cancel}</Button>
          <Button onClick={submit} className="flex-1">Send invite{emails.length > 1 ? `s (${emails.length})` : ""}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
