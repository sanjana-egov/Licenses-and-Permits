import React, { useState } from "react";
import { usePreview, type PreviewDocument } from "../PreviewContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Banknote, CreditCard, Download, FileText, ShieldCheck } from "lucide-react";
import TimelineList from "../TimelineList";
import CitizenScreenShell from "./_shell/CitizenScreenShell";
import DocumentPreviewSheet from "../employee/DocumentPreviewSheet";
import { downloadApplicationPdf } from "@/lib/applicationPdf";
import { copy } from "@/copy";

const ApplicationDetail: React.FC = () => {
  const { screen, applications, setScreen, formSections, workflowStates, serviceName } = usePreview();
  const app = applications.find((a) => a.id === screen.applicationId);
  const [previewDoc, setPreviewDoc] = useState<PreviewDocument | null>(null);
  const [includeDocs, setIncludeDocs] = useState(true);

  if (!app) return <div className="p-4 text-sm text-muted-foreground">{copy.applicationDetail.errorState.applicationNotFound}</div>;

  const allDocsVerified = app.documents.length === 0 || app.documents.every((d) => d.status === "Verified");
  const uploadedBy = app.formData.fullName || app.formData.f1 || "You";

  const handleDownload = () => {
    downloadApplicationPdf(app, serviceName, formSections, workflowStates, {
      includeDocuments: includeDocs,
      includeChecklists: false,
    });
  };

  return (
    <CitizenScreenShell
      onBack={() => setScreen({ type: "my_applications" })}
      backLabel="My Applications"
    >
      <div className="pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-foreground">{copy.applicationDetail.applicationSection.heading}</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{app.status}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-6 gap-1 text-[11px] px-2">
                  <Download className="h-3 w-3" /> {copy.applicationDetail.downloadDropdown.buttonLabel}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-xs">{copy.applicationDetail.downloadDropdown.menuHeading}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={includeDocs}
                  onCheckedChange={(v) => setIncludeDocs(!!v)}
                  onSelect={(e) => e.preventDefault()}
                >
                  {copy.applicationDetail.downloadDropdown.documentsListCheckbox}
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDownload} className="text-accent font-medium">
                  <Download className="h-3 w-3 mr-1" /> {copy.applicationDetail.downloadDropdown.downloadPdfItem}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Payment accordion */}
        {app.demand && (
          <div className={`rounded-lg border overflow-hidden ${
            app.paymentStatus === "paid"
              ? "border-emerald-300/50 bg-gradient-to-br from-emerald-50 to-green-50"
              : "border-warning/40 bg-gradient-to-br from-warning/10 to-amber-50"
          }`}>
            <Accordion type="single" collapsible defaultValue={app.paymentStatus === "pending" ? "pay" : undefined}>
              <AccordionItem value="pay" className="border-0">
                <AccordionTrigger className="px-3 py-2.5 hover:no-underline">
                  <div className="flex items-center gap-2.5 flex-1">
                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center text-white shadow-sm ${
                      app.paymentStatus === "paid" ? "bg-emerald-500" : "bg-amber-500"
                    }`}>
                      <Banknote className="h-4 w-4" />
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground">R{app.demand.total.toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">{copy.applicationDetail.paymentSection.subLabel}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold mr-2 ${
                      app.paymentStatus === "paid"
                        ? "bg-emerald-600 text-white"
                        : "bg-amber-500 text-white"
                    }`}>
                      {app.paymentStatus === "paid" ? copy.applicationDetail.paymentSection.paidBadge : copy.applicationDetail.paymentSection.pendingBadge}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-3 pb-3">
                  <div className="rounded-md bg-card border border-border/40 p-3 space-y-1.5 text-[11px]">
                    <Row label={copy.applicationDetail.paymentSection.baseFeeLabel} value={`R${app.demand.fee.toLocaleString()}`} />
                    <Row label={copy.applicationDetail.paymentSection.taxGstLabel} value={`R${app.demand.tax.toLocaleString()}`} />
                    <Row label={copy.applicationDetail.paymentSection.areaFeeLabel} value={copy.applicationDetail.paymentSection.areaFeeEmptyValue} muted />
                    <Row label={copy.applicationDetail.paymentSection.hazardFeeLabel} value={copy.applicationDetail.paymentSection.hazardFeeEmptyValue} muted />
                    <Row label={copy.applicationDetail.paymentSection.multiplierLabel} value={copy.applicationDetail.paymentSection.multiplierEmptyValue} muted />
                    <div className="border-t border-border/60 pt-1.5 mt-1.5">
                      <Row label={copy.applicationDetail.paymentSection.totalLabel} value={`R${app.demand.total.toLocaleString()}`} bold />
                    </div>
                    {app.paymentStatus === "paid" && app.paymentDetails && (
                      <div className="border-t border-border/60 pt-1.5 mt-1.5 space-y-1">
                        <Row label={copy.applicationDetail.paymentSection.txnIdLabel} value={app.paymentDetails.txnId} mono />
                        <Row label={copy.applicationDetail.paymentSection.paidOnLabel} value={new Date(app.paymentDetails.paidAt).toLocaleString()} />
                      </div>
                    )}
                  </div>
                  {app.paymentStatus === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => setScreen({ type: "payment", applicationId: app.id })}
                      className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-white gap-1.5"
                    >
                      <CreditCard className="h-3.5 w-3.5" /> Pay Now R{app.demand.total}
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* Issued Documents strip */}
        {(app.demand || app.paymentDetails || app.license) && (
          <div className="border rounded-lg bg-card">
            <div className="px-3 py-2 border-b">
              <h4 className="text-accent font-semibold text-xs">{copy.applicationDetail.documentsSection.sectionHeading}</h4>
            </div>
            <ul className="divide-y">
              {app.demand && app.demand.stage === "license" && (
                <li className="px-3 py-2 flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11.5px] font-semibold text-foreground">{copy.applicationDetail.documentsSection.demandNoticeTitle}</p>
                    <p className="text-[10px] text-muted-foreground">Fee bill · {new Date(app.demand.generatedAt).toLocaleDateString("en-ZA")}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 text-[10px] px-2"
                    onClick={() => setScreen({ type: "demand_notice", applicationId: app.id })}
                  >
                    {copy.applicationDetail.documentsSection.viewButton}
                  </Button>
                </li>
              )}
              {app.paymentDetails && (
                <li className="px-3 py-2 flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11.5px] font-semibold text-foreground">{copy.applicationDetail.documentsSection.paymentInvoiceTitle}</p>
                    <p className="text-[10px] text-muted-foreground">Receipt · {new Date(app.paymentDetails.paidAt).toLocaleDateString("en-ZA")}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 text-[10px] px-2"
                    onClick={() => setScreen({ type: "invoice", applicationId: app.id })}
                  >
                    {copy.applicationDetail.documentsSection.viewButton}
                  </Button>
                </li>
              )}
              {app.license && (
                <li className="px-3 py-2 flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-green-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11.5px] font-semibold text-foreground">{copy.applicationDetail.documentsSection.businessLicenseCertificateTitle}</p>
                    <p className="text-[10px] text-muted-foreground break-all">{app.license.number}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 text-[10px] px-2"
                    onClick={() => setScreen({ type: "license", applicationId: app.id })}
                  >
                    {copy.applicationDetail.documentsSection.viewButton}
                  </Button>
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="border rounded-lg p-3 bg-card space-y-3">
          <div>
            <h4 className="text-accent font-semibold text-xs mb-1.5">{copy.applicationDetail.applicationSection.heading}</h4>
            <div className="grid grid-cols-2 gap-y-1 text-[11px]">
              <span className="font-medium text-foreground">{copy.applicationDetail.applicationSection.appNumberLabel}</span>
              <span className="text-muted-foreground break-all">{app.applicationNumber}</span>
              <span className="font-medium text-foreground">{copy.applicationDetail.applicationSection.statusLabel}</span>
              <span className="text-muted-foreground">{app.status}</span>
            </div>
          </div>

          {formSections.map((section) => {
            const sectionFields = section.fields.filter((f) => app.formData[f.id]);
            if (sectionFields.length === 0) return null;
            return (
              <div key={section.id}>
                <h4 className="text-accent font-semibold text-xs mb-1.5">{section.name}</h4>
                <div className="grid grid-cols-2 gap-y-1 text-[11px]">
                  {sectionFields.map((field) => (
                    <React.Fragment key={field.id}>
                      <span className="font-medium text-foreground">{field.label}</span>
                      <span className="text-muted-foreground">{app.formData[field.id]}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}

          {app.documents.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-accent font-semibold text-xs">{copy.applicationDetail.documentsSection.sectionHeading}</h4>
                {allDocsVerified && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                    <ShieldCheck className="h-2.5 w-2.5" /> {copy.applicationDetail.documentsSection.allVerifiedBadge}
                  </span>
                )}
              </div>
              <ul className="space-y-1">
                {app.documents.map((d) => {
                  const statusStyle = d.status === "Verified"
                    ? "bg-emerald-100 text-emerald-700"
                    : d.status === "Rejected"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-amber-100 text-amber-700";
                  const statusLabel = d.status === "Pending" ? copy.applicationDetail.documentStatusLabels.pendingVerificationStatus : d.status;
                  return (
                    <li key={d.id}>
                      <button
                        onClick={() => setPreviewDoc(d)}
                        className="w-full text-left flex items-center gap-1.5 text-[11px] text-muted-foreground rounded p-1 hover:bg-accent/5 hover:ring-1 hover:ring-accent/20 transition-colors cursor-pointer"
                      >
                        <FileText className="h-3 w-3 shrink-0" />
                        <span className="truncate flex-1">{d.type} — {d.name}</span>
                        {d.reused && (
                          <span className="text-[9px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full font-semibold shrink-0">{copy.applicationDetail.documentStatusLabels.reusedBadge}</span>
                        )}
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold shrink-0 ${statusStyle}`}>
                          {statusLabel}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div className="border rounded-lg p-3 bg-card">
          <h4 className="text-accent font-semibold text-xs mb-2">{copy.applicationDetail.timelineSection.sectionHeading}</h4>
          <TimelineList entries={app.timeline} compact />
        </div>
      </div>

      <DocumentPreviewSheet
        open={previewDoc !== null}
        onOpenChange={(o) => !o && setPreviewDoc(null)}
        document={previewDoc}
        applicationId={app.id}
        uploadedBy={uploadedBy}
        allowActions={false}
      />
    </CitizenScreenShell>
  );
};

const Row: React.FC<{ label: string; value: string; bold?: boolean; mono?: boolean; muted?: boolean }> = ({ label, value, bold, mono, muted }) => (
  <div className="flex items-center justify-between gap-2">
    <span className={`${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>{label}</span>
    <span className={`${bold ? "font-bold text-foreground" : muted ? "text-muted-foreground/60 italic" : "text-foreground"} ${mono ? "font-mono text-[10px]" : ""}`}>{value}</span>
  </div>
);

export default ApplicationDetail;
