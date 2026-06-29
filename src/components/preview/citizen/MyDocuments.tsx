import React, { useState, useMemo } from "react";
import { usePreview, getCitizenDocuments, type CitizenDocumentKind } from "../PreviewContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { FolderOpen, FileText, Trash2, Upload, Plus, Download, Eye, FileBadge } from "lucide-react";
import CitizenScreenShell from "./_shell/CitizenScreenShell";
import { downloadDemandNoticePdf } from "@/lib/demandNoticePdf";
import { downloadInvoicePdf } from "@/lib/invoicePdf";
import { downloadLicensePdf } from "@/lib/licensePdf";

const DOC_TYPES = ["Identity Proof", "Address Proof", "Business Proof", "PAN Card", "Bank Statement", "Other"];

const MyDocuments: React.FC = () => {
  const { setScreen, userDocuments, addUserDocument, removeUserDocument, applications, serviceName } = usePreview();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState(DOC_TYPES[0]);

  const handleUpload = () => {
    const finalName = name.trim() || `${type.toLowerCase().replace(/\s+/g, "-")}.pdf`;
    addUserDocument(finalName, type);
    setName("");
    setType(DOC_TYPES[0]);
    setOpen(false);
  };

  return (
    <CitizenScreenShell onBack={() => setScreen({ type: "home" })} backLabel="Home">
      <div className="pb-4">
        {/* Header card */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center gap-3" style={{ border: "1px solid #E0E0E0" }}>
          <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EAF2FB" }}>
            <FolderOpen className="h-5 w-5" style={{ color: "#1D3557" }} />
          </div>
          <div>
            <p className="text-[15px] font-bold leading-tight" style={{ color: "#1D3557" }}>My Documents</p>
            <p className="text-[11px] mt-0.5 leading-snug" style={{ color: "#6B7280" }}>
              Upload once, reuse across applications.
            </p>
          </div>
        </div>

        {/* Issued Documents */}
        <IssuedDocumentsSection
          applications={applications}
          serviceName={serviceName}
          onView={(appId, kind) => {
            const screenType = kind === "demand" ? "demand_notice" : kind === "invoice" ? "invoice" : "license";
            setScreen({ type: screenType as any, applicationId: appId });
          }}
        />

        {/* My Uploads header */}
        <p className="text-[10px] uppercase tracking-wider font-bold mb-2 px-1" style={{ color: "#6B7280" }}>
          My Uploads
        </p>

        {/* Upload button */}
        <button
          onClick={() => setOpen(true)}
          className="w-full rounded-xl py-3 mb-4 flex items-center justify-center gap-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#1D3557" }}
        >
          <Plus className="h-4 w-4" /> Upload New Document
        </button>

        {userDocuments.length === 0 ? (
          <div
            className="rounded-xl py-10 text-center"
            style={{ border: "1.5px dashed #E0E0E0", backgroundColor: "#F9FAFB" }}
          >
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: "#EAF2FB" }}
            >
              <FileText className="h-6 w-6" style={{ color: "#1D3557" }} />
            </div>
            <p className="text-[13px] font-semibold" style={{ color: "#1D3557" }}>No documents yet</p>
            <p className="text-[11px] mt-1" style={{ color: "#6B7280" }}>Upload to start reusing them in applications.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {userDocuments.map((d) => (
              <li
                key={d.id}
                className="bg-white rounded-xl shadow-sm flex items-center gap-3 p-3"
                style={{ border: "1px solid #E0E0E0" }}
              >
                <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EAF2FB" }}>
                  <FileText className="h-5 w-5" style={{ color: "#1D3557" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold truncate" style={{ color: "#1D3557" }}>{d.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "#6B7280" }}>
                    {d.type} · {new Date(d.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => removeUserDocument(d.id)}
                  className="p-1.5 rounded-md transition-colors"
                  style={{ color: "#9CA3AF" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#EF4444")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
                  aria-label="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[15px]" style={{ color: "#1D3557" }}>
              <Upload className="h-4 w-4" style={{ color: "#1D3557" }} /> Upload Document
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs" style={{ color: "#6B7280" }}>Document Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DOC_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs" style={{ color: "#6B7280" }}>File Name (optional)</Label>
              <Input
                placeholder="e.g. passport-scan.pdf"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg text-[13px] font-medium"
              style={{ border: "1px solid #E0E0E0", color: "#363636", backgroundColor: "white" }}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
              style={{ backgroundColor: "#1D3557" }}
            >
              Upload
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CitizenScreenShell>
  );
};

interface IssuedDocsProps {
  applications: ReturnType<typeof usePreview>["applications"];
  serviceName: string;
  onView: (appId: string, kind: CitizenDocumentKind) => void;
}

const IssuedDocumentsSection: React.FC<IssuedDocsProps> = ({ applications, serviceName, onView }) => {
  const rows = useMemo(() => {
    const out: { appId: string; appNumber: string; kind: CitizenDocumentKind; label: string; generatedAt: number }[] = [];
    applications.forEach((app) => {
      getCitizenDocuments(app).forEach((d) =>
        out.push({ appId: app.id, appNumber: app.applicationNumber, kind: d.kind, label: d.label, generatedAt: d.generatedAt })
      );
    });
    return out.sort((a, b) => b.generatedAt - a.generatedAt);
  }, [applications]);

  const handleDownload = (appId: string, kind: CitizenDocumentKind) => {
    const app = applications.find((a) => a.id === appId);
    if (!app) return;
    if (kind === "demand") downloadDemandNoticePdf(app, serviceName);
    else if (kind === "invoice") downloadInvoicePdf(app, serviceName);
    else if (kind === "license") downloadLicensePdf(app, serviceName);
  };

  const iconColor = (kind: CitizenDocumentKind) => {
    if (kind === "demand") return "#F4A261";
    if (kind === "invoice") return "#16A34A";
    return "#1D3557";
  };

  const IconEl = (kind: CitizenDocumentKind) =>
    kind === "license"
      ? <FileBadge className="h-4 w-4" style={{ color: iconColor(kind) }} />
      : <FileText className="h-4 w-4" style={{ color: iconColor(kind) }} />;

  return (
    <div className="mb-4">
      <p className="text-[10px] uppercase tracking-wider font-bold mb-2 px-1" style={{ color: "#6B7280" }}>
        Issued Documents
      </p>
      {rows.length === 0 ? (
        <div
          className="rounded-xl px-4 py-4 text-center mb-2"
          style={{ border: "1.5px dashed #E0E0E0", backgroundColor: "#F9FAFB" }}
        >
          <p className="text-[11px]" style={{ color: "#6B7280" }}>
            Issued documents will appear here once your application progresses.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-2" style={{ border: "1px solid #E0E0E0" }}>
          <ul className="divide-y" style={{ borderColor: "#F0F0F0" }}>
            {rows.map((r) => (
              <li key={`${r.appId}-${r.kind}`} className="px-3 py-2.5 flex items-center gap-2.5">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#EAF2FB" }}
                >
                  {IconEl(r.kind)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold truncate" style={{ color: "#1D3557" }}>{r.label}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "#6B7280" }}>
                    {r.appNumber} · {new Date(r.generatedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => onView(r.appId, r.kind)}
                  className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                  style={{ color: "#1D3557" }}
                  aria-label="View"
                  title="View"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDownload(r.appId, r.kind)}
                  className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                  style={{ color: "#1D3557" }}
                  aria-label="Download"
                  title="Download"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyDocuments;
